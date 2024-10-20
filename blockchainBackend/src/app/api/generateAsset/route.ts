import {
  generateSigner,
  createSignerFromKeypair,
  signerIdentity,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { createCollection } from "@metaplex-foundation/mpl-core";

import { clusterApiUrl } from "@solana/web3.js";
import { getKeypairFromFile } from "@solana-developers/helpers";
import { NextResponse } from "next/server";
import keypairlocal from "@/keys/vik77ZUA4iTiRDTL8Bz5p1oZUzKkdBNbjwE6dYN6QiT.json";
const umi = createUmi(clusterApiUrl("devnet"), "finalized");

const execute = async () => {
  // const localKeypair = await getKeypairFromFile(
  //   "../../../keypair/keypairfile.json"
  // );

  let keypair = umi.eddsa.createKeypairFromSecretKey(
    new Uint8Array(keypairlocal)
  );
  const adminSigner = createSignerFromKeypair(umi, keypair);
  umi.use(signerIdentity(adminSigner));

  try {
    // Generate the Collection KeyPair
    const collection = generateSigner(umi);
    const address = collection.publicKey.toString();
    console.log(
      "This is the address for the event:",
      collection.publicKey.toString()
    );

    let tx = await createCollection(umi, {
      collection,
      name: "Event tickets collection",
      uri: "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-66bdd0b1d78ba_copy_of_unstop__banner__200_x_200_px_.png?d=200x200",
      plugins: [
        {
          type: "PermanentFreezeDelegate",
          frozen: true,
          authority: { type: "None" },
        },
      ],
    }).sendAndConfirm(umi);

    // Log the transaction signature
    const signature = tx.signature;
    console.log("Transaction Signature:", tx.signature);
    return {
      signature,
      address,
    };
  } catch (error) {
    console.error("Error creating collection:", error);
  }
};

export async function GET(req: Request) {
  try {
    const result = await execute();
    return NextResponse.json({
      message: "Collection created successfully",
      result,
    });
  } catch (error) {
    console.log(error);
  }
}
