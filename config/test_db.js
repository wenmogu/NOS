//This file is for testing purpose

var db = require("./db");
var Wenmogu = new db();

//Wenmogu.totalTable();
//Wenmogu.totalNumber();
//var a = Wenmogu.isEmpty("101",function (result) {
//	console.log(result);
//});
// Wenmogu.viewInfoByName("wen", function(results) {
// 	console.log(results);
// });

 // Wenmogu.isEmpty("110",function (result) {
 // 	console.log(result);
 // });

// Wenmogu.nvrBookedBefore("Wen Xin");
//Wenmogu.book("WX", null, "110", function(result) {
//	console.log("test_db callback: " + result);

// Wenmogu.isEmpty("101",function (result) {
// 	//console.log();
// 	console.log(result);
// });
// Wenmogu.cancel("Wen", null, "105", function(result) {
// 	console.log("%%%%%%" + result);

// });

// console.log(Wenmogu.isEmpty("110"));
Wenmogu.emptyRoomNumber(function(result) {
	console.log("$$$$$$$$$$$$$$$$$$$" + JSON.stringify(result));
})
//Wenmogu.totalNumber();

