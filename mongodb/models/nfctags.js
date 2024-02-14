import mongoose from "mongoose";
// import propertyModel from "./property";
const { Schema } = mongoose; // Import Schema from mongoose

const NfctagsSchema = new mongoose.Schema({
    tagId: { type: String, required: true },
    tagType: { type: String, required: true },
    tagCounter:{type: Number},
    tagStatus:{type:String},
    product: { type: Schema.Types.ObjectId, ref: 'Property', required: true },
});

const NfctagsModel = mongoose.model("Nfc", NfctagsSchema);

export default NfctagsModel;