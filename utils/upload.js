const multer = require("multer");
const path = require("path");
const pathToUpload = path.join(__dirname, "../public/uploads")


var storage = multer.diskStorage({ 
  destination: function (req, file, cb) {
    cb(null, pathToUpload)
  },
  filename: function (req, file, cb) {
    
    const allows = ["image/gif","image/jpeg","image/png","image/jpg"]
    if (!allows.includes(file.mimetype)){
      const error = new Error("filetype is not allowed")
      cb(error, undefined)
    }
    
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

module.exports = upload; 