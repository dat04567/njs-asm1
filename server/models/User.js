const fs = require("fs");
const path = require("path");

const p = path.join(path.dirname(require.main.filename),'data', 'userToken.json');

const getUserFromFile = (cb) => {
   fs.readFile(p, (err, fileContent) => {
     if (!err) {
       cb(JSON.parse(fileContent));
     } else {
       cb([]);
     }
   });
 };


 module.exports = class User{
   static fetchAll(cb){
      getUserFromFile(cb);
   }
 }