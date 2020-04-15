var express = require('express');
var router = express.Router();
var upload = require("../utils/upload");
const {loadData, saveData} = require("../utils/data")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/browse", (req, res) => {
  res.render("allImages")
})

router.post("/upload", upload.single("fileUpload"),(req, res) => {
  console.log(req.file)
  if(!req.file){
    res.render("all images", {error:"you need to upload a file"})
  };
const data = loadData()
data.push(req.file)
saveData(data)

  res.render("allImages", {images:data})
})

module.exports = router;
