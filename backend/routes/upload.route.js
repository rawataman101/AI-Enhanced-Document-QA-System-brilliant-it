const router = require("express").Router();
const uploadController = require("../controllers/upload.controller");
const multer = require("multer");

// Configure multer for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.single("document"), uploadController);

module.exports = router;
