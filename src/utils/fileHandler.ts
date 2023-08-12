import { Request } from "express";
import fs from "fs";

export const removeFile = (path: string) => {
  fs.unlink(path, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
};

export const removeFilesOnError = (req: Request) => {
  //Handling single file (Multer.single())
  if (req.file) {
    removeFile(req.file.path);
  } else if (req.files) {
    //Handling multiple files (Multer.array())
    if (Array.isArray(req.files)) {
      (req.files as Express.Multer.File[]).forEach(
        (file: Express.Multer.File) => {
          removeFile(file.path);
        }
      );
    } else {
      //Handling multiple files (Multer.fields())
      for (const key in req.files) {
        const files = req.files[key];
        console.log(files);

        files.forEach((file: Express.Multer.File) => {
          removeFile(file.path);
        });
      }
    }
  }
};
