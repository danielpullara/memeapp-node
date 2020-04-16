var express = require('express');
var router = express.Router();
var upload = require("../utils/upload");
const { loadData, saveData } = require("../utils/data")
const jimp = require("jimp")
const fs = require("fs")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/browse", (req, res) => {
  const data = loadData()
  res.render("allimages", { images: data })
})

router.post("/upload", upload.single("fileUpload"), async (req, res) => {
  const { file } = req
  if (!file) {
    return res.render("index", { error: "you need to upload a file" })
  };
  const data = loadData()
  const found = data.findIndex(el => el.originalname === file.originalname || el.size === file.size)
  if (found !== -1) {
    return res.render("index", { error: "file duplication" })
  }
  
  try {
    let image = await jimp.read(file.path)
    image.resize(300, jimp.AUTO, jimp.RESIZE_NEAREST_NEIGHBOR);
    await image.writeAsync(file.path);
    
    file.id = data.length === 0 ? 1 : [data.length - 1].id + 1;
    data.push(file)
    saveData(data)
    
    res.render("allimages", { images: data })
  } catch (e) {
    fs.unlinkSync(file.path);
    return res.render("index", { error: e.message })
  }




 
})

module.exports = router;
