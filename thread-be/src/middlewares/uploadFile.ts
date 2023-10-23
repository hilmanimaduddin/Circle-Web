import { NextFunction, Request, Response } from "express";
import multer = require("multer");
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

interface Params {
  allowedFormats: string[];
  transformation: { width: number; height: number; crop: string }[];
  folder: string; // Menambahkan properti folder
}

export const upload = (image: string) => {
  cloudinary.config({
    cloud_name: "dxui6zmzx",
    api_key: "765868518452176",
    api_secret: "mWrDFVi_GTT_opAD57Udb1qqfu4",
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "circle", // Nama folder di Cloudinary
      allowedFormats: ["jpg", "png"], // Format file yang diizinkan untuk diupload
      transformation: [{ width: 500, height: 500, crop: "limit" }], // Opsi transformasi gambar (opsional)
    } as Params,
  });

  const uploadFile = multer({ storage: storage });

  return (req: Request, res: Response, next: NextFunction) => {
    uploadFile.single(image)(req, res, function (err: any) {
      if (err) {
        console.log(err);
        return res.status(400).json({ error: "file upload failed.", err });
      }
      const locals = Object.assign({}, res.locals, req.body);
      res.locals = locals;
      if (req.file) {
        res.locals.filename = req.file.filename;
        res.locals.cloudinaryUrl = req.file.path; // URL Cloudinary untuk file yang diupload
      }
      next();
    });
  };
};
