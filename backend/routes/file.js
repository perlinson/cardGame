const router = require('express').Router()
const fileController = require('../contorllers/fileController')
const multer = require('multer')
const path = require('path')
const fs = require('fs')


const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb){
      const userId = req.params.employeeId
      const dir = path.resolve(__dirname, "../uploads/", userId)
      if(fs.existsSync(dir))
      {
        console.log('fs.existsSync(dir)')
        cb(null, dir)
      }
      else{
        var res = fs.mkdir(dir, {recursive:true}, error => {
          console.log('fs.mkdir(dir result:', error)
          cb(error, dir)
        })
      }
    },
    filename(req, file, cb){
      cb(null, file.originalname);
    }
  }),
  limits: {
    fileSzie: 1024 * 1024 * 4 //limit to 4m
  },
  fileFilter(req, file, cb){
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(new Error('only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'))
    }
    cb(undefined, true)
  },
})


router.get('/list', fileController.listFiles)
router.post('/upload/:employeeId', upload.single('file'), fileController.upload)
module.exports = router