import createFolder from "../utils/folderHandler";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let fileType = file.mimetype.split("/")[1];
    let reqPath = req.originalUrl.split("/")[2];
    let path = `./uploads/${reqPath}/${fileType}`;
    createFolder(path)
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const uploadToDiskStorage = multer({ storage });

export default uploadToDiskStorage;
