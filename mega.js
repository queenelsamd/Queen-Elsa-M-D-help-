const mega = require("megajs");
const auth = {
  email: "tsu72220@gmail.com",
  password: "#Radip12345678",
  userAgent:
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.246",
};

const upload = (data, name) => {
  return new Promise((resolve, reject) => {
    const storage = new mega.Storage(auth);

    // Wait for storage to be ready
    storage.on("ready", () => {
      console.log("Storage is ready. Proceeding with upload.");

      const uploadStream = storage.upload({ name, allowUploadBuffering: true });

      uploadStream.on("complete", (file) => {
        file.downloadLink((err, url) => {
          if (err) {
            reject(err);
          } else {
            storage.close();
            resolve(url);
          }
        });
      });

      uploadStream.on("error", (err) => {
        reject(err);
      });

      if (data.pipe) {
        data.pipe(uploadStream);
      } else {
        reject(new Error("Data is not a readable stream."));
      }
    });

    storage.on("error", (err) => {
      reject(err);
    });
  });
};

module.exports = { upload };
