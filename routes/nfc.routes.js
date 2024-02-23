import express from "express";


import {
 nfcScan,
 nfcSession,
 createNFC,
 nfcList
} from "../controllers/nfc.controller.js";

const router = express.Router();

// router.route("/").get(getAllProperties);
router.route("/").post(nfcScan);
router.route('/createnfcs').post(createNFC)
router.route("/nfcsession").get(nfcSession)
router.route("/nfcList").post(nfcList)
// router.route("/").post(createProperty);
// router.route("/:id").patch(updateProperty);
// router.route("/:id").delete(deleteProperty);

export default router;


