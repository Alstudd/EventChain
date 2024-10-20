import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
  walletAddress: {
    type: String,
    required: true,
  },
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
});

export const Register =
  mongoose.models.Register || mongoose.model("Register", registerSchema);
