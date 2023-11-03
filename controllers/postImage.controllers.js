const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const imagekit = require("../libs/imagekit");
const path = require("path");

module.exports = {
  uploadImage: async (req, res, next) => {
    try {
      let { title, description } = req.body;

      if (!req.file)
        return res
          .status(400)
          .json({ success: false, message: "image not required", data: null });

      let strFile = req.file.buffer.toString("base64");
      let { url, fileId } = await imagekit.upload({
        fileName: Date.now() + path.extname(req.file.originalname),
        file: strFile,
      });

      let post = await prisma.posts.create({
        data: {
          title,
          description,
          image: {
            create: {
              image_id: fileId,
              url,
            },
          },
        },
        include: { image: true },
      });

      if (!post) {
        return res.status(400).json({
          status: true,
          message: "upload failed",
          data: null,
        });
      }
      return res.status(200).json({
        status: true,
        message: "upload succes",
        err: null,
        data: post,
      });
    } catch (err) {
      next(err);
    }
  },

  getImages: async (req, res, next) => {
    try {
      let post = await prisma.posts.findMany({
        include: { image: true },
      });

      return res.status(200).json({
        success: true,
        message: "succes get all posts",
        data: post,
      });
    } catch (error) {
      next(error);
    }
  },

  getImage: async (req, res, next) => {
    try {
      let { id } = req.params;

      let post = await prisma.posts.findUnique({
        where: { id: Number(id) },
        include: { image: true },
      });

      if (!post) {
        return res.status(400).json({
          success: true,
          message: "get by id failed",
          data: null,
        });
      }
      return res
        .status(200)
        .json({ status: true, message: "get by id succces", data: post });
    } catch (err) {
      next(err);
    }
  },

  editImage: async (req, res, next) => {
    try {
      let { id } = req.params;
      let { title, description } = req.body;

      let updatedImage = await prisma.posts.update({
        where: { id: Number(id) },
        data: { title, description },
      });

      if (!updatedImage) {
        return res.status(400).json({
          success: true,
          message: "update failed",
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "update succes",
        data: updatedImage,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteImage: async (req, res, next) => {
    try {
      let { id } = req.params;
      await prisma.images.delete({
        where: { post_id: Number(id) },
      });

      let deletedPosts = await prisma.posts.delete({
        where: { id: Number(id) },
      });

      if (!deletedPosts) {
        return res.status(400).json({
          success: true,
          message: "deleted failed",
          data: null,
        });
      }

      return res
        .status(200)
        .json({ success: true, message: "deleted succes", data: deletedPosts });
    } catch (err) {
      next(err);
    }
  },
};
