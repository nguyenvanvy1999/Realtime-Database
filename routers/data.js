const express = require("express");
const dataController = require("../controllers/data");
const router = express.Router();
const upload = require("../helpers/multer/index").upload;
const { handleError } = require("../middleware/error");
const authMiddleware = require("../middleware/authMiddleware");
module.exports = () => {
    router
        .route("/get-data")
        .get(
            upload.single(),
            authMiddleware.isAuth,
            dataController.getData,
            handleError
        );
    router
        .route("/get-all-data")
        .get(upload.single(), dataController.getAllData, handleError);
    return router;
};