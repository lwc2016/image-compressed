const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "./static")));

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, "/static/img"));
    },
    filename: function(req, file, cb){
        let ext = file.originalname.split(".").reverse()[0];
        cb(null, Date.now() + "." + ext);
    }
});
const upload = multer({storage});
app.post("/upload", upload.single("file"), (req, res, next)=>{
    res.send({"code": 0, result: "/img/" + req.file.filename});
});

app.listen(3030, ()=>{
    console.log("server is running at port: 3030");
});