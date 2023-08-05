import fs from "fs";

export default (path: string) => {
  // const pathArray = path.split('/');
  // let currentPath = '';
  // pathArray.forEach((folder) => {
  //     currentPath += folder + '/';
  //     if (!checkIfFolderExists(currentPath)) {
  //         fs.mkdirSync(currentPath);
  //     }
  // });
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
};

const checkIfFolderExists = (path: string) => {
  return fs.existsSync(path);
};
