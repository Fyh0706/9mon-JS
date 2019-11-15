 let fs = require('fs');
 let obj = {

 };
 ['readFile', 'readdir'].forEach(item => {
     obj[item] = function (url, encoding = null) {
         if (/\.(js|txt|html|md|css)/.test(url)) {
             encoding = 'utf-8'
         }
         return new Promise((res, rej) => {
             fs[item](url, encoding, (err, data) => {
                 err ? rej(err) : res(data)
             })
         })
     }
 });
 ['mkdir', 'rmdir', 'unlink'].forEach(item => {
     obj[item] = function (url) {
         return new Promise((res, rej) => {
             fs[item](url, (err) => {
                 err ? rej(err) : res()
             })
         })
     }
 });
 ['writeFile', 'appendFile'].forEach(item => {
     obj[item] = function (url, text, encoding = null) {
         return new Promise((res, rej) => {
             fs[item](url, text, encoding, (err) => {
                 err ? rej(err) : res()
             })
         })
     }
 });

 obj.copyFile = function (oldurl, newurl) {
     return new Promise((res, rej) => {
         fs.copyFile(oldurl, newurl, (err) => {
             err ? rej(err) : res()
         })
     })
 }
 module.exports = obj;