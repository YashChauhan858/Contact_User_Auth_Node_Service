import mongoose from "mongoose";

// Schema
const contactSchema = mongoose.Schema(
  {
    use_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Reference of the model
    },
    name: {
      type: String,
      require: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      require: [true, "Please add the email address"],
    },
    contact: {
      type: String,
      require: [true, "Please the contact number"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Contact", contactSchema);
