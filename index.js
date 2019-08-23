(function(window){
    function imageCompressed(file, options, cb){
        // 读取文件
        const reader = new FileReader();
        const fileName = file.name;
        const fileType = file.Type;
        const limitSize = options.limitSize;  // 压缩后限制大小
        if(!limitSize){
            return cb(file);        // 如果没有压缩后限制的大小，则直接返回，不进行压缩
        }
        if(isNaN(limitSize)){
            throw new Error("limitSize must be a number");
        }
        if(limitSize < 0){
            throw new Error("limitSize must not small then 0");
        }
        if(file.size <= limitSize){
            return cb(file);       // 如果限制的尺寸比文件尺寸小，则直接返回
        }
        reader.onload = function(){
            // 获取文件的base64
            let image = new Image();
            image.onload = function(){
                let width = this.naturalWidth;
                let height = this.naturalHeight;
                // 创建canvas
                const canvas = createCanvas(width, height, image);    
                let quantity = 0.95;
                let base64 = canvas.toDataURL('image/jpeg', quantity);
                let blob = createBlob(base64, fileName, fileType);
                while(blob.size >= limitSize){
                    quantity -= 0.05;
                    base64 = canvas.toDataURL('image/jpeg', quantity);
                    blob = createBlob(base64, fileName, fileType);
                }
                cb(blob);
            }
            image.src = reader.result;
        }
        reader.readAsDataURL(file);
    };

    function createCanvas(width, height, image){
        // 创建canvas
        const canvas = document.createElement("canvas");
        const attrW = document.createAttribute("width");
        attrW.nodeValue = width;
        const attrH = document.createAttribute("height");
        attrH.nodeValue = height;
        canvas.setAttributeNode(attrW);
        canvas.setAttributeNode(attrH);

        const context = canvas.getContext("2d");
        // 填充图片
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        return canvas;
    };

    function createBlob(base64, fileName, fileType){
        let bytes = window.atob(base64.split(',')[1]);
        let ab = new ArrayBuffer(bytes.length);
        let ia = new Uint8Array(ab);
        for (let i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        let file = new File([ia], fileName, {type: fileType, lastModified: Date.now()});
        return file;
    }
    if(typeof module !== "undefined"){
        module.exports = imageCompressed;
    }else{
        window.imageCompressed = imageCompressed;
    }
})(window);
