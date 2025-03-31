import mongoose  from "mongoose";
const notificationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to User model
      required: true,
    }, 
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Receiver of the notification
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat", // Optional: If notification is related to a chat
    },
    isRead: {
      type: Boolean,
      default: false, // Track if user has seen the notification
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
