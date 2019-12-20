var express = require('express');
fs = require('fs');
var router = express.Router();
const formidable = require('formidable')

// 文件接收处理
router.post('/upload', function (req, res) {

  new formidable.IncomingForm().parse(req, (err, fields, files) => {

    if (err) {
      console.error('发生错误！', err)
      throw err
    }

    var file = files.file;
    var algorithm = fields.algorithm;

    console.log('\n接收到上传的文件！\n');

    console.log("文件名 " + file.name);
    console.log("文件类型 " + file.type);
    console.log("文件大小 " + file.size);
    console.log("文件路径 " + file.path);

    console.log("\n开始使用指定算法 " + algorithm + " 进行计算 ...\n");
    /* 在这里使用指定的算法 algorithm 处理接收到的文件 file */

    if (file.type.split('/')[0] == "image") {
      console.log("\n计算完成！储存至 " + 'public/temp.' + file.type.split('/')[1] + "\n");

      fs.readFile(file.path, function (_err, data) {
        fs.writeFile("public/temp." + file.type.split('/')[1], data, function () {
        });
      });
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ "filename": "temp." + file.type.split('/')[1] }));
    } else if (file.type.split('/')[0] == "text") {
      res.setHeader('Content-Type', 'application/json');
      fs.readFile(file.path, 'utf-8',(err, data) => { 
        if (err) throw err; 
      
        
      res.end(JSON.stringify({ "text": data }));
    }) 
    }
  })
})

module.exports = router;
