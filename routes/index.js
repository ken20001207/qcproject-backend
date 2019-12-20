var express = require('express');
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

    console.log("\n计算完成！发送回应至前端。\n");
    res.sendFile(file.path);

  })
})

module.exports = router;
