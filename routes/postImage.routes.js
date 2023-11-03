const router = require("express").Router();
const { image } = require("../libs/multer");
const {
  uploadImage,
  getImages,
  getImage,
  editImage,
  deleteImage,
} = require("../controllers/postImage.controllers");

router.post("/images/upload", image.single("image"), uploadImage);
router.get("/images", getImages);
router.get("/images/:id", getImage);
router.put("/images/:id", editImage);
router.delete("/images/:id", deleteImage);

module.exports = router;
