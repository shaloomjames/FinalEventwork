const multer = require("multer");
const path = require("path");
// require("../../")
// ============== using memory storage ==============
// const storage = multer.memoryStorage();



// ============== using Disk storage ==============
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,''));
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.orignalname));
    }
})

const upload = multer({storage});
module.exports = upload;

// req.file contains {
//     fieldname: 'userimage',
//     originalname: 'task done at home.PNG',
//     encoding: '7bit',
//     mimetype: 'image/png',
//     destination: 'C:\\Users\\RC\\OneDrive\\Videos\\EventSphereManagement\\backend\\uploads\\userProfiles',
//     filename: '1725000239570.PNG',
//     path: 'C:\\Users\\RC\\OneDrive\\Videos\\EventSphereManagement\\backend\\uploads\\userProfiles\\1725000239570.PNG',
//     size: 28808
//   }