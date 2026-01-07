import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true
    },

    userEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    role: {
      type: String,
      enum: ["SUPER_ADMIN", "ORG_ADMIN", "HR", "EMPLOYEE"],
      required: true
    },

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    },

    mustChangePassword: {
      type: Boolean,
      default: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

userSchema.index({ email: 1 });
userSchema.index({ organization: 1, role: 1 });

const User = mongoose.model("User", userSchema);
export default User;
