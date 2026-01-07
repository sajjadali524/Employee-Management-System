import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    orgName: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true
    },

    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true
    },

    orgEmail: {
      type: String,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String
    },

    address: {
      type: String
    },

    isActiveOrg: {
      type: Boolean,
      default: true,
      index: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    deletedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Compound indexes for performance
organizationSchema.index({ name: 1, isActive: 1 });
organizationSchema.index({ code: 1 });

const Organization = mongoose.model("Organization", organizationSchema);
export default Organization;