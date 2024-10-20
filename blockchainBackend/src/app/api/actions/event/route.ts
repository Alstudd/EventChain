import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { getKeypairFromFile } from "@solana-developers/helpers";
import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  MEMO_PROGRAM_ID,
} from "@solana/actions";
import {
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import localkeypair from "@/keys/vik77ZUA4iTiRDTL8Bz5p1oZUzKkdBNbjwE6dYN6QiT.json";
import axios from "axios";
import { BlinksightsClient } from "blinksights-sdk";
import { NextRequest } from "next/server";
import {
  createNoopSigner,
  createSignerFromKeypair,
  generateSigner,
  publicKey,
  signerIdentity,
} from "@metaplex-foundation/umi";
import {
  create,
  fetchCollection,
  fetchCollectionV1,
} from "@metaplex-foundation/mpl-core";
import { headers } from "next/headers";

const ToAccountAddress = new PublicKey(
  "CiezuZZjLguLRaeP3FQoozSu7BPSM6ZAj82sQjEZwcLT"
);
const actionURL = "/api/actions/event";
// exampl

// async function prepareTransaction(user: PublicKey) {
//   const umi = createUmi(clusterApiUrl("devnet"));
//   //   const localKeypair = await getKeypairFromFile(
//   //     "../../../../keypair/keypairfile.json"
//   //   );

//   let keypair = umi.eddsa.createKeypairFromSecretKey(
//     new Uint8Array(localkeypair)
//   );
//   const adminSigner = createSignerFromKeypair(umi, keypair);
//   umi.use(signerIdentity(createNoopSigner(publicKey(user))));
//   const asset = generateSigner(umi);
//   console.log("This is yoour asset adderess", asset.publicKey.toString());
//   const collection = await fetchCollection(
//     umi,
//     new PublicKey("2GtCTZ1UVUVRESXwwcSMqRvqWnznPMLsatnQMXQPZZdS")
//   );
//   console.log(collection);
//   const transaction = await create(umi, {
//     asset,
//     collection,
//     name: "Event-Asset",
//     uri: "https://itsvikrant.me",
//     authority: adminSigner,
//   }).buildAndSign(umi);
//   return umi.transactions.serialize(transaction);
// }

//-- old end her

async function prepareTransaction(user: PublicKey) {
  const umi = createUmi("https://api.devnet.solana.com", "finalized");

  let keypair = umi.eddsa.createKeypairFromSecretKey(
    new Uint8Array(localkeypair)
  );
  const adminSigner = createSignerFromKeypair(umi, keypair);
  // we create noop signer since we want let user sign the transaction later
  umi.use(signerIdentity(createNoopSigner(publicKey(user))));

  // Generate the Asset KeyPair
  const asset = generateSigner(umi);
  console.log("This is your asset address", asset.publicKey.toString());

  // Pass and Fetch the Collection
  const collection = await fetchCollectionV1(
    umi,
    publicKey("BpE8k41xUvQd6FNWmgYfVDLfD6fSmWqeNcHFrYfiWZ1B")
  );

  // Generate the Asset
  const tx = await create(umi, {
    asset,
    collection,
    name: "My Asset",
    uri: "https://example.com",
    authority: adminSigner,
  }).buildAndSign(umi);

  return umi.transactions.serialize(tx);
}
export async function GET(req: Request) {
  const requesturl = new URL(req.url);

  const eventID = requesturl.searchParams.get("eventID");
  console.log("Request URL", eventID);
  console.log("Event ID", eventID);
  const auctionDetailssample = await axios.post(
    "http://localhost:3000/api/event/get/",
    {
      eventID: eventID,
    }
  );
  console.log(auctionDetailssample.data);

  const auctionTitle = auctionDetailssample.data.LatestAuction.title;
  const auctionImgUrl = auctionDetailssample.data.LatestAuction.image;
  const description = auctionDetailssample.data.LatestAuction.description;
  const disableStatus = auctionDetailssample.data.disableStatus;

  const payload: ActionGetResponse = {
    type: "action",
    icon: auctionImgUrl,
    label: "Auction",
    title: auctionTitle,
    description: description,
    disabled: disableStatus,
    links: {
      actions: [
        {
          type: "transaction",
          href: `${actionURL}?name={name}&eventID=${eventID}`,
          label: "Enter the amount you want to bid",
          parameters: [
            {
              name: "name",
              label: "Enter your name",
              required: true,
              type: "text",
            },
          ],
        },
      ],
    },
  };
  return Response.json(payload, {
    headers: {
      ...ACTIONS_CORS_HEADERS,
    },
  });
}

export const OPTIONS = GET;

export async function POST(req: Request) {
  const requesturl = new URL(req.url);
  try {
    console.log("Entered the field");
    const body: ActionPostRequest = await req.json();
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
      console.log("Account", account.toBase58());
      const name = requesturl.searchParams.get("name");
      const eventID = requesturl.searchParams.get("eventID");

      try {
        const updateRegisterationTable = await axios.post(
          "http://localhost:3000/api/registeration/create",
          {
            walletAddress: account.toBase58(),
            eventID: eventID,
          }
        );
        console.log(updateRegisterationTable.data);
      } catch (error) {
        console.log("Error", error);
      }
      const transaction = await prepareTransaction(account);
      const payload: ActionPostResponse = {
        transaction: Buffer.from(transaction).toString("base64"),
        message: "Transaction created successfully",
      };
      return Response.json(payload, {
        headers: {
          ...ACTIONS_CORS_HEADERS,
        },
      });
    } catch (error) {
      console.log("Error", error);
      return new Response("Invalid Account", {
        status: 400,
        headers: {
          ...ACTIONS_CORS_HEADERS,
          "X-Action-Version": "2.1.3",
          "X-Blockchain-Ids": "solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",
        },
      });
    }

    console.log("Account", account.toBase58());
  } catch (error) {
    console.log("Error", error);
  }
}
