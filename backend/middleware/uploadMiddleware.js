import multer from "multer"

// to find extension of image
// For Example: 
// path.extname("flower.avif") will give ".avif"

import path from "path"

// Configure where uploaded files will be stored
// and what their filenames will be.
const storage = multer.diskStorage({

    // Folder where images will be saved
    destination: function (req, file, cb) {
        // cb(null, "public/images") shows where to save image
        cb(null, "public/images")
    },

    // Generate a unique filename to prevent duplicate names
    filename: function (req, file, cb) {
        const uniquename =
            Date.now() + "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniquename)
    }
})

// Create multer middleware using the storage configuration
const upload = multer({ storage });

// Export middleware to handle image uploads in routes
export default upload;