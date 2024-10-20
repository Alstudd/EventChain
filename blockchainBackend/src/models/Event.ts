import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  image: {
    type: String,
    default:
      "https://d8it4huxumps7.cloudfront.net/uploads/images/150x150/uploadedManual-66bdd0b1d78ba_copy_of_unstop__banner__200_x_200_px_.png?d=200x200",
    required: false,
  },
});

// Ensure that you're checking for the correct model name
export default mongoose.models.Event || mongoose.model("Event", eventSchema);
