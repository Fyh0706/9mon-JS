var reg = /d/;
console.log(reg.test("qwert123456"));
console.log(reg.test('adcddddd123456'));
var reg = /\d/;
console.log(reg.test("qwert123456"));
console.log(reg.test('adcddddd123456'));
var reg = /\\d/;
console.log(reg.test("qwert123456"));
console.log(reg.test('adcd\\dddd123456'));

var reg = /\w/;
console.log(reg.test("_"));

var reg = /\d?/;
console.log(reg.test("qqjiehd111ddwkrhadionl"));
var reg = /\d{2,3}/;
console.log(reg.test("qqjiehd1ddwkrhadionl"));//false
console.log(reg.test("qqjiehd11ddwkrhadionl"));//true
console.log(reg.test("qqjiehd111ddwkrhadionl"));//true
var reg = /^d/
console.log(reg.test("qqjiehd1ddwkrhadionl"));//false
console.log(reg.test("dqjiehd1ddwkrhadionl"));//true
var reg = /^\d/
console.log(reg.test("qqjiehd1ddwkrhadionl"));//false
console.log(reg.test("1dqjiehd1ddwkrhadionl"));//true
var reg = /d$/
console.log(reg.test("qqjiehd1ddwkrhadionl"));//false
console.log(reg.test("1dqjiehd1ddwkrhadionl"));//false




