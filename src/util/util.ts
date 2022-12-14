import fs from "fs";
import Jimp = require("jimp");

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const photo = await Jimp.read(inputURL);
      const outpath =
        "/tmp/filtered." + Math.floor(Math.random() * 2000) + ".jpg";
      await photo
        .resize(256, 256) // resize
        .quality(60) // set JPEG quality
        .greyscale() // set greyscale
        .write(__dirname + outpath, (img) => {
          resolve(__dirname + outpath);
        });
    } catch (error) {
      reject(false);
    }
  });
}

async function fetchListofFiles (recentFile: string) {
  return new Promise(async (resolve, reject) => {
    try{
      const imagePath = __dirname + "/tmp";
      const res = await fs.readdirSync(imagePath);
      if (res.length === 0) {
        resolve(true);
      }
      for(const filename of res){
        const filePath = imagePath + "/" + filename;
        if(filePath !== recentFile){
          fs.unlinkSync(imagePath + "/" + filename);
        }
      }
      resolve(true);
    } catch (error) {
      // console.log(error)
      reject(false);
    }
  });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(recentFilePath: string) {
  await fetchListofFiles(recentFilePath);
  // for (let file of files) {
  //   fs.unlinkSync(file);
  // }
}
