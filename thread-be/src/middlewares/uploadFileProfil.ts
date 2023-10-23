import { NextFunction, Request, Response } from "express";
import multer = require("multer");
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

interface Params {
  allowedFormats: string[];
  transformation: { width: number; height: number; crop: string }[];
  folder: string; // Menambahkan properti folder
}

export const update = (profileImage: string, backgroundImage: string) => {
  cloudinary.config({
    cloud_name: "dlcgwbdtv",
    api_key: "361789865221418",
    api_secret: "SSAfZgIMCIMpo1E6GX96tbgUn-g",
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads",
      allowedFormats: ["jpg", "png"],
      transformation: [{ width: 500, height: 500, crop: "limit" }],
    } as Params,
  });

  const uploadFiles = multer({ storage: storage }).fields([
    { name: `${profileImage}`, maxCount: 1 },
    { name: `${backgroundImage}`, maxCount: 1 },
  ]);

  return (req: Request, res: Response, next: NextFunction) => {
    uploadFiles(req, res, function (err: any) {
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(400).json({ error: "file upload failed.", err });
      } else if (err) {
        console.log(err);
        return res.status(500).json({ error: "server error." });
      }
      const locals = Object.assign({}, res.locals, req.body);
      res.locals = locals;
      if (req.files) {
        res.locals.profileImageFilename = req.files[profileImage][0].filename;
        res.locals.backgroundImageFilename =
          req.files[backgroundImage][0].filename;
        res.locals.profileImageCloudinaryUrl = req.files[profileImage][0].path;
        res.locals.backgroundImageCloudinaryUrl =
          req.files[backgroundImage][0].path;
      }
      next();
    });
  };
};
