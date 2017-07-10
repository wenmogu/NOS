//This file is for testing purpose

var db = require("./db");
var Groupdb = require('./db_user');
var Wenmogu = new db();
var moguzu = new Groupdb();

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
// Wenmogu.book("Wen", "e23423143214@gmail.com", "105", function(result) {
// 	console.log("%%%%%%" + result);

// });

//moguzu.registerGroup("moguempireeee", "a", "s", "d", "f", "g", function(a, d, f, g) {console.log("i m here!");});
// moguzu.lol(function(sd) { console.log(JSON.stringify(sd));});
// moguzu.registerID("moguempireeeeeeeeeeeeee", "e0052755", function(name, id, boo) {
// 	if(boo == false) {
// 		console.log(name + " (" + id + ") " + "cannot be added!");
// 	} else if (boo == true){
// 		console.log(name + " (" + id + ") " + "is added!");		
// 	} else if (boo == null) {
// 		;
// 	}
// });
moguzu.UserSendEmail("e0032334", function(b) {
    if(b == true) {
      console.log("woohoo");
    } else {
      console.log(":(((((((((((");
    }
  });

// moguzu.UserRegistered("e0052753", function(id, results, boo){console.log(boo);});
for(var i = 0; i < 9; i++) {
  setTimeout(function() {
  moguzu.UserSendEmail("e0032334", function(b) {
  	if(b == true) {
  		console.log("woohoo");
  	} else {
  		console.log(":(((((((((((");
  	}
  })
}, 10000);
}
// console.log(Wenmogu.isEmpty("110"));
// Wenmogu.emptyRoomNumber(function(result) {
// 	console.log("$$$$$$$$$$$$$$$$$$$" + JSON.stringify(result));
// })
//Wenmogu.totalNumber();

/* error message:
D:\NOS>node config/test_db
User registered!
undefined
User email obtained
add user to mailOptions
{ Error: Invalid login: 534-5.7.14 <https://accounts.google.com/signin/continue?sarp=1&scc=1&plt=AKgnsbv0
534-5.7.14 63j11G9o_Ww0DLVfm0JHiNhZcAexHPVXOYTNYDfyM2LF8t-VuQtVYxyGmoeJId047MusPu
534-5.7.14 7YG7J1ZJABDthItyWM7xeqjKs0tqvScCJllLU27jV_fTs6nb7Xie4OLInFGtodWDLZqdY_
534-5.7.14 hO4XmnVdeyOhxenYVxdiQAC7bsmqT7bmx-GgUs5MJSSsNOeAfXdGFpFQM4_HFMDajo9hYJ
534-5.7.14 GUKBv_-H2sGFxMsLvz5nVHbKUHDCw> Please log in via your web browser and
534-5.7.14 then try again.
534-5.7.14  Learn more at
534 5.7.14  https://support.google.com/mail/answer/78754 v205sm8925170pgb.51 - gsmtp
    at SMTPConnection._formatError (D:\NOS\node_modules\nodemailer\lib\smtp-connection\index.js:557:19)
    at SMTPConnection._actionAUTHComplete (D:\NOS\node_modules\nodemailer\lib\smtp-connection\index.js:1253:34)
    at SMTPConnection._responseActions.push.str (D:\NOS\node_modules\nodemailer\lib\smtp-connection\index.js:340:26)
    at SMTPConnection._processResponse (D:\NOS\node_modules\nodemailer\lib\smtp-connection\index.js:706:20)
    at SMTPConnection._onData (D:\NOS\node_modules\nodemailer\lib\smtp-connection\index.js:509:14)
    at TLSSocket._socket.on.chunk (D:\NOS\node_modules\nodemailer\lib\smtp-connection\index.js:461:47)
    at emitOne (events.js:96:13)
    at TLSSocket.emit (events.js:188:7)
    at readableAddChunk (_stream_readable.js:176:18)
    at TLSSocket.Readable.push (_stream_readable.js:134:10)
  code: 'EAUTH',
  response: '534-5.7.14 <https://accounts.google.com/signin/continue?sarp=1&scc=1&plt=AKgnsbv0\n534-5.7.14 63j11G9o_Ww0DLVfm0JHiNhZcAexHPVXOYTNYDfyM2LF8t-VuQtVYxyGmoeJId047MusPu\n534-5.7.14 7YG7J1ZJABDthItyWM7xeqjKs0tqvScCJllLU27jV_fTs6nb7Xie4OLInFGtodWDLZqdY_\n534-5.7.14 hO4XmnVdeyOhxenYVxdiQAC7bsmqT7bmx-GgUs5MJSSsNOeAfXdGFpFQM4_HFMDajo9hYJ\n534-5.7.14 GUKBv_-H2sGFxMsLvz5nVHbKUHDCw> Please log in via your web browser and\n534-5.7.14 then try again.\n534-5.7.14  Learn more at\n534 5.7.14  https://support.google.com/mail/answer/78754 v205sm8925170pgb.51 - gsmtp',
  responseCode: 534,
  command: 'AUTH PLAIN' }
:(((((((((((
 */


// const nodemailer = require ('nodemailer');
// var mailTransport=nodemailer.createTransport({
//     service:'Gmail',
//     auth: {
//         user : 'jlinswenmogu@gmail.com',
//         pass : 'Fattypiggy123',
//     }
// });

// mailTransport.sendMail({
//   from: ' "whoisthats" <kris@krisd3v.com>',
//         to : "mcshuo@vip.qq.com",   //user@gmail.com
//         subject : 'Hello',
//         text: "Hello How do u do ?",
//     },function(err,info){
//       if(err){
//         console.log('Unable to send the mail :'+err.message);
//       }
//       else{
//         console.log('Message response : '+info.response);
//       }
//     });