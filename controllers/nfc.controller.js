
// const ProductModel = require('./productModel');
// const NfcTagModel = require('./nfcTagModel');
import Nfc from "../mongodb/models/nfctags.js"
import NfcSession from "../mongodb/models/nfcsessions.js";
import Property from "../mongodb/models/property.js";
import User from "../mongodb/models/user.js";
import { parse } from 'url';
import { createServer } from 'http';




    const nfcScan = async (req, res) => {
        const { uid, geodata } = req.body;

          const inputString = "043FB29A335780x00006AxFFFFFFFF00x00000000";

          console.log(uid , geodata,req.params)
  
  // Define a regular expression pattern to match the desired substrings
  //const pattern = /([A-F0-9]+)x([A-F0-9]+)x([A-F0-9]+)/i;
  // Define a regular expression to match the UID components
const uidRegex = /([0-9A-Fa-f]+)(?:x([0-9A-Fa-f]+))?(?:x([0-9A-Fa-f]+))?/;

  
   const match = uid.match(uidRegex);

       var Tagid = match[1];
       var counter = match[2] || null;
       var loop = match[3] || null;
       var openclose= loop?loop.startsWith('FF')?'break':'unbreak': 'not a TT tag';
    
    const decimalValue = parseInt(counter, 16);
    console.log(Tagid, counter, openclose, decimalValue);
  
  

    
        try {
            // Step 1: Find the NFC document based on the tag ID
            const nfcDocument = await Nfc.findOne({ tagId: Tagid });
    
            if (!nfcDocument) {
                return res.status(404).json({ error: 'NFC document not found for the given tag ID' });
            }
    
            // Step 2: Use the ObjectId from the NFC document to find the associated Product
            const product = await Property.findById(nfcDocument.product);
    
            if (product) {
               // console.log('Product found:', product);
                const newNfcSession = new NfcSession({
                 
                    tagId: nfcDocument.tagId,
                    tagType:nfcDocument.tagType,
                    tagCounter:decimalValue,
                    openclose:openclose,
                
                    geodata: geodata, // Assuming geodata is a JSON string
                    productData: {
                        productName: product.title,
                        productimage:product.photo
                        // Add other relevant product data
                    },
                });
                
                   // Save the new NfcSession document
            await newNfcSession.save();

            // Update the nfc table field (Assuming you have a field named 'geodata' in the nfc model)
            await Nfc.updateOne({ nfcIds: uid }, { tagCounter: decimalValue });


                const responseData = {
                    nfc: {
                        tagId: nfcDocument.tagId,
                        tagType:nfcDocument.tagType,
                        tagCounter:decimalValue,
                        openclose:openclose

                        // Add other properties from NFC document as needed
                    },
                    product: {
                        // Include properties from the Product document
                        _id: product._id,
                        title: product.title,
                        description: product.description,
                        category: product.category,
                        brandDetail: product.brandDetail,
                        
                        price: product.price,
                        photo:product.photo,
                        // Add other properties from Product document as needed
                    },
                   
                };
        
                res.status(200).json(responseData);
                
            } else {
                console.log('Product not found');
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error) {
            console.error('Error finding product:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    };
    

    const nfcSession =async(req, res)=>{
       
            try {
                const nfcsessions = await NfcSession.find({}).limit(req.query._end);
                res.status(200).json({ nfcsessions });
            } catch (error) {
                console.error('Error fetching NfcSessions:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }
     
    }
    const nfcList =async(req, res)=>{
       const {productName}= req.body
       
        try {
            const list = await NfcSession.find({ 'productData.productName': productName })
            res.status(200).json({ list });
        } catch (error) {
            console.error('Error fetching NfcSessions:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
 
}


// const createNFC = async () => {
//   try {
//     const newProduct = new ProductModel({
//       title: 'Sample Product',
//       description: 'This is a sample product.',
//       price: 29.99,
//     });

//     const savedProduct = await newProduct.save();
//     console.log('Product saved:', savedProduct);

//     // Example of creating an NfcTag with the reference to the product
//     const newNfcTag = new NfcTagModel({
//       tagId: 'yourTagId',
//       product: savedProduct._id,
//     });

//     const savedNfcTag = await newNfcTag.save();
//     console.log('NfcTag saved:', savedNfcTag);
//   } catch (error) {
//     console.error('Error creating Product or NfcTag:', error);
//   }
// };

export {nfcScan,nfcSession, nfcList}
