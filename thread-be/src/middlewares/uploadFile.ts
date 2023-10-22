import { NextFunction, Request, Response } from "express";
import multer = require("multer");
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// export const upload = (image: string) => {
//   const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./uploads/");
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now();
//       cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
//     },
//   });

//   const uploadFile = multer({ storage: storage });

//   return (req: Request, res: Response, next: NextFunction) => {
//     uploadFile.single(image)(req, res, function (err: any) {
//       if (err) {
//         console.log(err);
//         return res.status(400).json({ error: "file upload failed.", err });
//       }
//       const locals = Object.assign({}, res.locals, req.body);
//       res.locals = locals;
//       if (req.file) {
//         res.locals.filename = req.file.filename;
//       }
//       next();
//     });
//   };
// };

interface Params {
  allowedFormats: string[];
  transformation: { width: number; height: number; crop: string }[];
  folder: string; // Menambahkan properti folder
}

export const upload = (image: string) => {
  cloudinary.config({
    cloud_name: "dlcgwbdtv",
    api_key: "361789865221418",
    api_secret: "SSAfZgIMCIMpo1E6GX96tbgUn-g",
  });
  // cloudinary.config({
  //   cloud_name: process.env.CLOUD_NAME,
  //   api_key: process.env.API_KEY,
  //   api_secret: process.env.API_SECRET,
  // });
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: "uploads", // Nama folder di Cloudinary
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
