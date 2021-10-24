const fs = require('fs')
var uploadPath =''
module.exports = (req, res, next) => {
      console.log(req)
     fs.existsSync(uploadPath, function(exists) {
        if(exists) {
          next();
        }
        else {
          fs.mkdir(uploadPath, function(err) {
            if(err) {
              console.log('Error in folder creation');
              next(); 
            }  
            next();
          })
        }
     })
}