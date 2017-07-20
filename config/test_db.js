//This file is for testing purpose


var Groupdb = require('./db_user');
var gb = require('./db_groupBooking');
var user = new Groupdb();
var groupBooking = new gb();

// groupBooking.groupBook('woohoo', '23 07 2017', '104', '10TO12', function(boo) {
//   console.log(boo);
// })


// groupBooking.bookedTimeslot("23 07 2017", function(lol) {
//   console.log(lol);
//   console.log("-------------------------------");
//   console.log(JSON.stringify(lol));
//   console.log("-------------------------------");
// });

// groupBooking.allTimeslotsFor5Days(function(ar) {
//   console.log(JSON.stringify(ar));
// })

// groupBooking.emptyTimeslot("23 07 2017", function(lol) {
//     console.log(lol);
//     console.log("-------------------------------");
//     console.log(JSON.stringify(lol));
//     console.log("-------------------------------");
// })

groupBooking.groupBookingState("moguempire", function(arr) {
  console.log(JSON.stringify(arr));
})

/*
groupBooking.allTimeslotsFor5Days(function(ar) {
  console.log(JSON.stringify(ar));
})

[
[{"ROOMNUMBER":"100","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:22:15.000Z"},
{"ROOMNUMBER":"101","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:22:15.000Z"},
{"ROOMNUMBER":"102","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:22:15.000Z"},
{"ROOMNUMBER":"103","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:22:15.000Z"},
{"ROOMNUMBER":"104","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:22:15.000Z"},
{"ROOMNUMBER":"105","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:22:15.000Z"},
{"ROOMNUMBER":"106","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:22:15.000Z"}],

[{"ROOMNUMBER":"100","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T06:18:40.000Z"},
{"ROOMNUMBER":"101","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T06:18:40.000Z"},
{"ROOMNUMBER":"102","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T06:18:40.000Z"},
{"ROOMNUMBER":"103","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T06:18:40.000Z"},
{"ROOMNUMBER":"104","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T06:18:40.000Z"},
{"ROOMNUMBER":"105","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T06:18:40.000Z"},
{"ROOMNUMBER":"106","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T06:18:40.000Z"}],

[{"ROOMNUMBER":"100","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T17:03:48.000Z"},
{"ROOMNUMBER":"101","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T17:03:48.000Z"},
{"ROOMNUMBER":"102","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T17:03:48.000Z"},
{"ROOMNUMBER":"103","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T17:03:48.000Z"},
{"ROOMNUMBER":"104","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T17:03:48.000Z"},
{"ROOMNUMBER":"105","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T17:03:48.000Z"},
{"ROOMNUMBER":"106","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-21T17:03:48.000Z"}],

[{"ROOMNUMBER":"100","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:09.000Z"},
{"ROOMNUMBER":"101","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:09.000Z"},
{"ROOMNUMBER":"102","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:09.000Z"},
{"ROOMNUMBER":"103","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:09.000Z"},
{"ROOMNUMBER":"104","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:09.000Z"},
{"ROOMNUMBER":"105","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:09.000Z"},
{"ROOMNUMBER":"106","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:09.000Z"}],

[{"ROOMNUMBER":"100","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:24.000Z"},
{"ROOMNUMBER":"101","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:24.000Z"},
{"ROOMNUMBER":"102","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:24.000Z"},
{"ROOMNUMBER":"103","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:24.000Z"},
{"ROOMNUMBER":"104","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:24.000Z"},
{"ROOMNUMBER":"105","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:24.000Z"},
{"ROOMNUMBER":"106","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE","DATEOFTABLE":"2017-07-23T16:23:24.000Z"}]
]

*/

// groupBooking.TimeslotForTheDay("20 7 2017", function(resul) {
//   console.log(resul);
// })
// groupBooking.processDateWithUnderscore("12 7 2017", function(str) {
//   console.log(str);
// })
// groupBooking.all5Days(function(arr) {
//   console.log(arr);
// });

// wenxiaoxin.groupCancel("moguempire", "22 6 2017", "103", "18TO20", function(bo) {
//   console.log(bo);
// });


// gb.isTimeslotEmpty("101", "8TO10", function(boo) {
//   console.log(boo);
// });

// wenxiaoxin.hasGroupBooked("wenxinnnn", function(boo) {
//   console.log(boo);
// });

// wenxiaoxin.groupBook("wenxinnnnnnnnnnnnn", "101", "18TO20", function(bo) {
//   console.log(bo);
// })

// moguzu.isUserFromRVRC("e0052753", "wenxin", function(id, name, boo) {
//   console.log(boo);
// })

// moguzu.getUserGroup("Wen Xin", "e0052723", function(id, name, boo) {
//   console.log(name);
//   console.log(boo);
// })
var ct = require('./tableRenewal');
var tableRenewal = new ct();

// tableRenewal.dateStringForSomeDay(0, function(str) {
//   tableRenewal.createTable(str);
// });

// tableRenewal.dateStringForSomeDay(7, function(str) {
//   tableRenewal.createTable(str);
// });

// tableRenewal.dateStringForSomeDay(8, function(str) {
//   tableRenewal.createTable(str);
// });
// setTimeout(function() {tableRenewal.dateStringForSomeDay(7, function(str) {
//   tableRenewal.createTable(str);
// });}, 1000);



// tableRenewal.dateStringForCreateTable(function(str) {
//   console.log(str);
//   tableRenewal.createTable(str);
// }); //_Sat_Jul_22_2017

// tableRenewal.dateStringForDropTable(function(str) {
//   tableRenewal.dropTable(str);
// })
// tableRenewal.processDateWithUnderscore("11 0 2017", function(str) {
//   console.log(str);
// })


// tableRenewal.createTable();
// setTimeout(function() {tableRenewal.getTableDate('Room_record2', function(){;});}, 800);

// wenxiaoxin.allTimeslot(function(resul) {
//   console.log(JSON.stringify(resul));
//   console.log(resul[1].ROOMNUMBER);
// })
// wenxiaoxin.groupBookingState("moguempireee", function(resul, boo) {
//   console.log(JSON.stringify(resul));
//   console.log(boo);
// })
// wenxiaoxin.emptyTimeslotOfRoomPart1("101", [], function(arr){console.log(arr);});
// [{"ROOMNUMBER":"100","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE"},
// {"ROOMNUMBER":"101","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"wenxinnnn","16TO18":"NONE","18TO20":"wenxinnnnnnnnnnnnn","20TO22":"NONE"},
// {"ROOMNUMBER":"102","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE"},
// {"ROOMNUMBER":"103","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE"},
// {"ROOMNUMBER":"104","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE"},
// {"ROOMNUMBER":"105","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE"},
// {"ROOMNUMBER":"106","8TO10":"NONE","10TO12":"NONE","12TO14":"NONE","14TO16":"NONE","16TO18":"NONE","18TO20":"NONE","20TO22":"NONE"}]
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
// // });
// for (var i = 0; i < 17; i++) {
// var schedule = require('node-schedule');

// schedule.scheduleJob("0 * * * * *", function() {
//   moguzu.sendUserEmail('e0032334', function(boo) {
//     console.log(boo);
//   })
// });


// wenxiaoxin.allGroup(function(resul) {
//   console.log(JSON.stringify(resul));
// })
// // moguzu.UserRegistered("e0052753", function(id, results, boo){console.log(boo);});
// for(var i = 0; i < 9; i++) {
//   setTimeout(function() {
//   moguzu.UserSendEmail("e0032334", function(b) {
//   	if(b == true) {
//   		console.log("woohoo");
//   	} else {
//   		console.log(":(((((((((((");
//   	}
//   })
// }, 10000);
// }
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