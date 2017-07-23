//This file is for testing purpose


var Groupdb = require('./db_user');
var gb = require('./db_groupBooking');
var user = new Groupdb();
var groupBooking = new gb();

var de = require('./dumpEmail');
var dumpEmail = new de();

var t = require('./token');
var token = new t();
// token.createTokenForSomePpl(['e0052753', 'e0032334'], ['mcshuo@vip.qq.com', 'krisd3v@gmail.com'], 1234, function(boo) {
// 	console.log("sent");
// })
// dumpEmail.scheduleExportRoomRecordOfYersterday("C:\\ABC", "nus_db", "root", "LordMushroom2015", "25 15 * * *");
// dumpEmail.sendAttachment('e0052753@u.nus.edu', "c:\\ABC\\group_info.txt",'3 15 * * *');
groupBooking.groupBookNotify(1701, "101", "8TO10", "Sun Jul 23 2017");
//user.getGroupLeader('1701', function(id, name, email){console.log(id + " " + name + " " + email);});
// user.IfGroupAlrExist("1701", function(name, boo, result) {
//   console.log(boo);
//   console.log(result);
// })
// user.whichMemberSlotEmpty('1701', function(ab) {
// 	console.log(ab);
// })

// groupBooking.allBookedTimeslotsFor5Days(function(arr) {
//   console.log(JSON.stringify(arr));
// }) //first layer: data for 5 days; 
//second layer: in each data for each day array, there's two elements: first one is date string.
      //second one is an array of all booked timeslot of the day
// third layer: in the array of all booked timeslot of the day, there are element arrays inside, 
//fourth layer: each element array of the third layer has elements in term of: timeslot string, roomnumber object, roomnumber object...
// [["21 7 2017",[]],
// ["22 7 2017",[["10TO12",{"ROOMNUMBER":"104"}]]],
// ["23 7 2017",[["8TO10",{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"}],["10TO12",{"ROOMNUMBER":"104"}],["14TO16",{"ROOMNUMBER":"105"}],["16TO18",{"ROOMNUMBER":"103"}]]],
// ["24 7 2017",[]],
// ["25 7 2017",[]]]


// user.IfGroupComplete('1701', function(name, boo) {
//   console.log(boo);
//   console.log(name);
// })

// user.IfIdAlrAdded('e0032334', function(id, arr, boo) {
//   console.log(id);
//   console.log(arr);
//   console.log(boo);
// })

// user.registerID('1701', 'e0052755', function(name, id, boo) {
//   console.log(name);
//   console.log(id);
//   console.log(boo);
// })

// groupBooking.bookedTimeslotForTheDay("23 07 2017", function(arr) {
//   console.log(JSON.stringify(arr));
// })

// groupBooking.allEmptyTimeslotsFor5Days(function(arr) {
//   console.log(JSON.stringify(arr));
// })

// groupBooking.groupCancel('woohoo', '22 07 2017', '104', '10TO12', function(boo) {
//   console.log(boo);
// })


// groupBooking.bookedTimeslotForTheDay("23 07 2017", function(lol) {
//   console.log(lol);
//   console.log("-------------------------------");
//   console.log(JSON.stringify(lol)); //[] //the third layer of the function below
//   console.log("-------------------------------");
// });

// groupBooking.allBookedTimeslotsFor5Days(function(ar) {
//   console.log(JSON.stringify(ar));
// })

// groupBooking.hasGroupBookedAnyFor5Days('moguempire', function(ar) {
//   console.log(ar);
// })

// groupBooking.emptyTimeslot("23 07 2017", function(lol) {
//     console.log(lol);
//     console.log("-------------------------------");
//     console.log(JSON.stringify(lol));
//     console.log("-------------------------------");
// })
// [["8TO10",{"ROOMNUMBER":"100"},{"ROOMNUMBER":"101"},{"ROOMNUMBER":"102"},{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"},{"ROOMNUMBER":"105"},{"ROOMNUMBER":"106"}],
// ["10TO12",{"ROOMNUMBER":"100"},{"ROOMNUMBER":"101"},{"ROOMNUMBER":"102"},{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"},{"ROOMNUMBER":"105"},{"ROOMNUMBER":"106"}],
// ["12TO14",{"ROOMNUMBER":"100"},{"ROOMNUMBER":"101"},{"ROOMNUMBER":"102"},{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"},{"ROOMNUMBER":"105"},{"ROOMNUMBER":"106"}],
// ["14TO16",{"ROOMNUMBER":"100"},{"ROOMNUMBER":"101"},{"ROOMNUMBER":"102"},{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"},{"ROOMNUMBER":"105"},{"ROOMNUMBER":"106"}],
// ["16TO18",{"ROOMNUMBER":"100"},{"ROOMNUMBER":"101"},{"ROOMNUMBER":"102"},{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"},{"ROOMNUMBER":"105"},{"ROOMNUMBER":"106"}],
// ["18TO20",{"ROOMNUMBER":"100"},{"ROOMNUMBER":"101"},{"ROOMNUMBER":"102"},{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"},{"ROOMNUMBER":"105"},{"ROOMNUMBER":"106"}],
// ["20TO22",{"ROOMNUMBER":"100"},{"ROOMNUMBER":"101"},{"ROOMNUMBER":"102"},{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"},{"ROOMNUMBER":"105"},{"ROOMNUMBER":"106"}]]

// groupBooking.groupBookingState("moguempire", function(arr) {
//   console.log(JSON.stringify(arr));
// })

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

// groupBooking.TimeslotForTheDay("21 7 2017", function(resul) {
//   console.log(resul);
// })
// groupBooking.processDateWithUnderscore("12 7 2017", function(str) {
//   console.log(str);
// })
// groupBooking.all5Days(function(arr) {
//   console.log(arr);
// });



// gb.isTimeslotEmpty("101", "8TO10", function(boo) {
//   console.log(boo);
// });



// user.getUserGroup("Wen Xin", "e0052753", function(id, name, boo) {
//   console.log(name);
//   console.log(boo);
// })
var ct = require('./tableRenewal');
var tableRenewal = new ct();
// tableRenewal.dateStringForSomeDay(0, function(str) {
//   tableRenewal.dateStringForSomeDATE(0, function(strr) {
//     tableRenewal.createTable(str, strr);
//   })
// })



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