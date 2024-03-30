import multer from "multer";

// Define storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads/'); // Set the destination folder for uploaded files
    },
    filename: (req, file, cb) => {
      // Customize the file name here
      const fileName = Date.now() + '-' +req.user.username+ ".png";
      cb(null, fileName);
    },
});
  
// Initialize Multer with the storage configuration
const upload = multer({ storage: storage });

// Define storage for Multer(posts)
const postStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/posts/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    // Customize the file name here
    const fileName = Date.now() + '-' +req.user.username+ ".png";
    cb(null, fileName);
  },
});

//Initialize Multer with the storage configuration(posts)
const uploadPosts = multer({ storage: postStorage });

export {upload, uploadPosts};