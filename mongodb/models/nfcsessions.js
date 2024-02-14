import mongoose from "mongoose";
// import propertyModel from "./property";
const { Schema } = mongoose; // Import Schema from mongoose

const nfcsessionSchema = new mongoose.Schema({
    tagId: { type: String, required: true },
    tagType: { type: String, required: true },
    tagCounter:{type: Number},
    tagStatus:{type:String},
  geodata: {
    type: {
      ip: String,
      hostname: String,
      city: String,
      region: String,
      country: String,
      loc: String,
      org: String,
      postal: String,
      timezone: String,
      // Add more fields as needed
    },
    required: true,
  },
  productData: {
    // Define the structure of productData as per your requirements
    // For example:
    productName: String,
    productimage: String,
    // Add more fields as needed
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const NfcSession = mongoose.model('NfcSession', nfcsessionSchema);

export default NfcSession;
