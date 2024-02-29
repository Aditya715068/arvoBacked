import express from "express";

import {
    createProperty,
    deleteProperty,
    getAllProperties,
    getPropertyDetail,
    updateProperty,
    uploardImage
} from "../controllers/property.controller.js";

const router = express.Router();

router.route("/").get(getAllProperties);
router.route("/:id").get(getPropertyDetail);
router.route("/").post(createProperty);
router.route("/:id").patch(updateProperty);
router.route("/:id").delete(deleteProperty);
router.route("/upload").post(uploardImage);

export default router;
