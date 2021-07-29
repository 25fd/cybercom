const catchAsync = require("../Utilis/catchAsync");
const csv = require("csvtojson");
const path = require('path')

exports.postFile = catchAsync(async (req, res, next) => {
    try {
        let image;
        let uploadPath;
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
            image = req.files.image;

            uploadPath = path.join(__dirname , '../public/' + image.name);
            await image.mv(uploadPath)
                  res.send('File uploaded!');
    } catch(e) {
        console.log(e);
         throw e;
    }
});
