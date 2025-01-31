const multer = require('multer');


let upload = (folder) =>{

    const storage = multer.diskStorage({
        destination: `public/images/${folder}`,
        filename: function (req, file, cb){
            
            let originalName = file.originalname;
            const finalName = Date.now() + "-" + Math.round(Math.random() * 1E9) + "-" + originalName;
            cb(null, finalName)
        }
    });

    const executeUpload = multer({storage: storage}).single("imagen");
    return executeUpload;
};

module.exports = upload;