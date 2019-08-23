#### 模块介绍
图片在上传时，经常会遇到用户上传一些存储空间占用比较大的图片，导致打开图片时加载很忙的现象。为了解决这个问题，上传图片时需要对图片进行压缩。

#### 模块安装
首先需要将模块安装到项目中，安装命令：
```
npm install image-compressed
```
可以scrip标签引入资源：
```html
<script src="image-compressed/dist/index.min.js"></script>
```

也可以通过模块加载方式：
```
const imageCompressed = require("image-compressed");
```
#### 模块使用
imageCompressed接收3个参数，第一个参数：需要上传图片的file对象，第二个参数：配置， 第三个参数：压缩后的回调函数，返回压缩后的图片file对象。

使用图片压缩之前的图片上传代码：
```javascript
$("#button").click(function(event){
    event.preventDefault();
    let file = document.getElementById("file").files[0];
    let form = new FormData();
    form.append("file", res);
    $.ajax({
        url: "/upload",
        data: form,
        type: "post",
        processData: false,
        contentType: false,
        success: function(res){
            console.log(res);
            $("#image").attr("src", res.result);
        }
    });
});
```
使用图压缩上传之后的文件代码：
```javascript
$("#button").click(function(event){
    event.preventDefault();
    let file = document.getElementById("file").files[0];
    imageCompressed(file, {limitSize: 2 * 1024 * 1024}, function(res){
        console.log(res);
        let form = new FormData();
        form.append("file", res);
        $.ajax({
            url: "/upload",
            data: form,
            type: "post",
            processData: false,
            contentType: false,
            success: function(res){
                console.log(res);

                $("#image").attr("src", res.result);
            }
        });
    });
});
```

#### 参数说明：
config参数：

limitSize: 压缩后限制的大小
