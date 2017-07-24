var mysql = require("mysql");
var info = {
  host     : 'localhost',
  user     : 'root',
  password : 'LordMushroom2015',
  database : 'nus_db',
  table    : 'Room_record'

}; 
 
var infoGroup = {
  host     : 'localhost',
  user     : 'root',
  password : 'LordMushroom2015',
  database : 'nus_db',
  table    : 'Group_record'

};

var infoUser = {
  host     : 'localhost',
  user     : 'root',
  password : 'LordMushroom2015',
  database : 'nus_db',
  table    : 'User_info'

};

var infoBook = {
  host     : 'localhost',
  user     : 'root',
  password : 'LordMushroom2015',
  database : 'nus_db',
  table    : 'Book_state'

};

var infoGroupInfo = {
  host     : 'localhost',
  user     : 'root',
  password : 'LordMushroom2015',
  database : 'nus_db',
  table    : 'Group_info'

};

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jlinswenmogu@gmail.com',
    pass: 'Fattypiggy123'
  }
});

var mailOptions = {
  from: 'jlinswenmogu@gmail.com',
  to: "to be updated",
  subject: "To be updated",
  text: 'TO be updated'
};


var connection = mysql.createConnection(info);
var connectionGroup = mysql.createConnection(infoGroup);
var connectionBook = mysql.createConnection(infoBook);
var connectionGroupInfo = mysql.createConnection(infoGroupInfo);
var connectionUser = mysql.createConnection(infoUser);


function db(){
/*----Supporting functions-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	this.allGroup = function(callback) {
		connectionGroup.query("select ?? from ??", ['GROUPID', infoGroupInfo.table], function(err, resul) {
			callback(resul);
		});
	}
	// [{"GROUPNAME":"moguempire"},
	// {"GROUPNAME":"moguempireee"},
	// {"GROUPNAME":"wenxinnnn"},
	// {"GROUPNAME":"wenxinnnnnnnnnnnnn"},
	// {"GROUPNAME":"wenxinnnnnnnnnnnnn"},
	// {"GROUPNAME":"wenxinnnnnnnnnnnnn"}]

	processDateWithHyphenPart1 = function(str, callback) {//str: dd mm year; output: "2018-4-21"
		var d = new Date();
		d.setDate(str.split(" ")[0]);
		d.setMonth(str.split(" ")[1] - 1);
		d.setYear(str.split(" ")[2]);
		var arr = d.toLocaleDateString().split('/');
		callback([arr[2], arr[0], arr[1]]);
	}
	processDateWithHyphen = function(str, callback) {
		processDateWithHyphenPart1(str, function(arr) {
			callback(arr.toString().replace(/,/g, "-"));
		})
	}


	hasGroupBookedRoom = function(name, date, room, timeslot, callback) {//"moguempire", "101", "dd mm year"
		processDateWithHyphen(date, function(str) {
			connectionGroup.query("select * from ?? where GROUPID=? AND DATE=? AND ROOMNUMBER=?", [infoBook.table, name, str,room], function(err, results) {
				console.log(JSON.stringify(results));
				if (err) throw err;
				if(results.length == 0){
					console.log("this group did not book this room or has alr cancelled");
					callback(false);
				} else if (results.length == 1) {
					console.log("this group has booked the room " + room + " on " + date);
					callback(true);
				} else {
					console.log("multiple bookings on " + date + "????????");
					callback(false);
				} 
			});	
		});
	}

	hasGroupBooked = function(name, date, callback) {//"moguempire", "101", "dd mm year"
		processDateWithHyphen(date, function(str) {
			connectionGroup.query("select * from ?? where GROUPID=? AND DATE=?", [infoBook.table, name, str], function(err, results) {
				console.log(JSON.stringify(results));
				if (err) throw err;
				if(results.length == 0){
					console.log("this group hasnt made any bookings on " + date);
					callback(false);
				} else if (results.length == 1) {
					console.log("this group has alr booked on " + date);
					callback(true);
				} else {
					console.log("multiple booking???");
					callback(false);
				} 
			});	
		});
	}

	groupBookPart1 = function(name, date, room, timeslot, callback) { 
//insert into Group_record (GROUPID, DECISION, DATE, ROOMNUMBER, SLOTSTART, SLOTEND) values ("moguempireee", "BOOK", "101", '2017-3-23', 100000', '120000');
		processDateWithHyphen(date, function(str) {
			connectionGroup.query("insert into ?? (GROUPID, BOOK_DECISION, DATE, ROOMNUMBER, SLOTSTART, SLOTEND) values (?, 'BOOK', ?, ?, ?, ?)", 
								  [infoGroup.table, name, str, room, timeslot.split("TO")[0]+"0000", timeslot.split("TO")[1]+"0000"],
								  function(err, resul) {
								  	if (err) throw err;
								  	console.log("%%%%%% " + JSON.stringify(resul));
								  	connectionBook.query("insert into ?? (GROUPID, ROOMNUMBER, DATE, SLOTSTART, SLOTEND) values (?, ?, ?, ?, ?)", 
									  [infoBook.table, name, room, str, timeslot.split("TO")[0]+"0000", timeslot.split("TO")[1]+"0000"],
									  function(err, result){
									  	if (err) throw err;
									  	callback(true);
									});
			});
		});	
	}

	processDateWithUnderscorePart1 = function(str, callback) {//dd mm year
		var d = new Date();
		d.setDate(str.split(" ")[0]);
		d.setMonth(str.split(" ")[1] - 1);
		d.setYear(str.split(" ")[2]);
		console.log("342 " + d.toString());
		callback(d);
	}
	processDateWithUnderscore = function(str, callback) {
		processDateWithUnderscorePart1(str, function(d) {
			console.log("d: " + d.toString());
			callback(("_" + d.toDateString()).replace(/ /g, "_"));
		});
	}

	groupBookPart2 = function(name, date, room, timeslot, callback) {
		processDateWithUnderscore(date, function(str) {
			connection.query("update ?? set ??=? where ROOMNUMBER=?", ["Room_record"+str, timeslot, name, room], function(err, resul) {
				if (err) throw err;
				console.log("$$$$$$$$$$" + JSON.stringify(resul));
				callback(true);
			});
		});
	}

	groupCancelPart1 = function(name, date, room, timeslot, callback) { 
//insert into Group_record (GROUPNAME, DECISION, DATE, ROOMNUMBER, SLOTSTART, SLOTEND) values ("moguempireee", "BOOK", "101", '2017-3-23', 100000', '120000');
		processDateWithHyphen(date, function(str) {
			connectionGroup.query("update ?? set CANCEL_DECISION=?, CANCEL_DECISIONTIME=NOW() where GROUPID=? AND DATE=?", 
								  [infoGroup.table, "CANCEL", name, str],
								  function(err, resul) {
								  	if (err) throw err;
								  	console.log("%%%%%% " + JSON.stringify(resul));
									connectionBook.query("delete from ?? where GROUPID=? AND DATE=?", 
										[infoBook.table, name, str], 
									  function(err, result){
									  	if (err) throw err;
									  	callback(true);
									});
			});
		});	
	}

	groupCancelPart2 = function(name, date, room, timeslot, callback) {

			processDateWithUnderscore(date, function(str) {
		
				connection.query("update ?? set ??=? where ROOMNUMBER=?", ["Room_record"+str, timeslot, "NONE", room], function(err, resul) {
					if (err) throw err;
					console.log("$$$$$$$$$$" + JSON.stringify(resul));
					callback(true);
				});
			});

	}

	//precondition: the date must be in the database
	//precondition: room and timeslot exist
	//postcondition: callback(true) or callback(false)
	isTimeslotEmpty = function(date, timeslot, room, callback) {//"101", "8TO10", "dd mm year"
		processDateWithUnderscore(date, function(str) {
			console.log(str);
			connection.query("select ?? from ?? where ROOMNUMBER=?", [timeslot, "Room_record" + str, room], function(err, results) {
				console.log(JSON.stringify(results));
				if (err) throw err; 
				if (results[0][timeslot] == "NONE") {
					console.log("the room is available");
					callback(true);
				} else {
					console.log("room is unavailbale!");
					callback(false);
				}
			});
		});
	}
	
/*----------------------------------------------------------------------------------------------------------------------------*/
	dateFormat = function(str, callback) {//str: Tue Jul 10 2017; output: dd mm year
		var d = new Date();
		var time = Date.parse(str);
		d.setTime(time);
		var arr = d.toLocaleDateString().split('/');
		var ar = [];
		ar[0] = arr[1];
		ar[1] = arr[0];
		ar[2] = arr[2];
		var result = ar.toString().replace(/,/g, " ");
		console.log("result: " + result);
		callback(result);
	}


	//output: [ '19 7 2017', '20 7 2017', '21 7 2017', '22 7 2017', '23 7 2017' ]
	all5Days = function(callback) {
		var d0 = new Date();
		var d1 = new Date();
		var d2 = new Date();
		var d3 = new Date();
		var d4 = new Date();
		var time = d0.getTime();

		d1.setTime(time + 86400000);
		d2.setTime(time + 86400000 * 2);
		d3.setTime(time + 86400000 * 3);
		d4.setTime(time + 86400000 * 4);
		var arr = [];
		
		setTimeout(function() {
			dateFormat(d0.toDateString(), function(str) {
				arr.push(str);
			})
		}, 5);
		setTimeout(function() {
			dateFormat(d1.toDateString(), function(str) {
				arr.push(str);
			})
		}, 10);
		setTimeout(function() {
			dateFormat(d2.toDateString(), function(str) {
				arr.push(str);
			})
		}, 15);
		setTimeout(function() {
			dateFormat(d3.toDateString(), function(str) {
				arr.push(str);
			})
		}, 20);
		setTimeout(function() {
			dateFormat(d4.toDateString(), function(str) {
				arr.push(str);
			})
		}, 25);

		setTimeout(function() {
			callback(arr);
		}, 30);
	}

	TimeslotForTheDay = function(date, callback) { //this gives the data of all timeslots for all rooms of that day
		processDateWithUnderscore(date, function(str) {
			console.log(date);
			console.log("%%%" + str);
			connection.query("select * from ??", ["Room_record" + str], function(err, results) {
				if (err) throw err;
				callback(results);
			})
		});
	}

	allTimeslotsFor5DaysIter = function(emptyarr, all5DaysArray, i, callback) {//[], [], 5, callback

		if (all5DaysArray.length == 0) {
			all5Days(function(arr) {
				allTimeslotsFor5DaysIter(emptyarr, arr, i, callback);
			});
		} else if (i > 0) {
			console.log("all5DaysArray: " + all5DaysArray);
			TimeslotForTheDay(all5DaysArray[5 - i], function(resul) {
				console.log("emptyarr: " + emptyarr);
				emptyarr.push(resul);
				allTimeslotsFor5DaysIter(emptyarr, all5DaysArray, i-1, callback);
			})
		} else if (i == 0) {
			callback(emptyarr);
		}
	}

	



	
 
 	bookedTimeslotPart1 = function(date, x, emptyarr, callback) {//2x + 8, x starts from 0 and ends at 7 (no x = 8)
 		if (x < 7) {
 			var a = (x*2+8)+"TO"+(x*2+10);
			processDateWithUnderscore(date, function(str) {
	 			connection.query('select ?? from ?? where ?? != "NONE"', ['ROOMNUMBER', 'Room_record'+str, a], function(err, resul) {
	 				if (err) throw err;
	 				//resul: [{ROOMNUMBER:'103'}, {ROOMNUMBER:'104'}, {ROOMNUMBER:'105'}]
	 				if(resul.length == 0) {
	 					bookedTimeslotPart1(date, x+1, emptyarr, callback);
	 				} else {
	 					emptyarr.push([a].concat(resul));
	 					bookedTimeslotPart1(date, x+1, emptyarr, callback); 
	 				}
	 			});
	 		});
 		} else {
 			callback(emptyarr);
 		}
 	}

 	bookedTimeslot = function(date, callback) {
 		bookedTimeslotPart1(date, 0, [], function(emptyarr) {
 			callback(emptyarr);
 		})
 	} //[["8TO10",{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"}],["10TO12",{"ROOMNUMBER":"104"}],["14TO16",{"ROOMNUMBER":"105"}],["16TO18",{"ROOMNUMBER":"103"}]]

	emptyTimeslotPart1 = function(date, x, emptyarr, callback) {//2x + 8, x starts from 0 and ends at 7 (no x = 8)
 		if (x < 7) {
 			var a = (x*2+8)+"TO"+(x*2+10);
			processDateWithUnderscore(date, function(str) {
	 			connection.query('select ?? from ?? where ??="NONE"', ['ROOMNUMBER', 'Room_record'+str, a], function(err, resul) {
	 				if (err) throw err;
	 				console.log("$$$" + x + JSON.stringify(resul));
	 				//resul: [{ROOMNUMBER:'103'}, {ROOMNUMBER:'104'}, {ROOMNUMBER:'105'}]
	 				if(resul.length == 0) {
	 					emptyTimeslotPart1(date, x+1, emptyarr, callback);
	 				} else {
	 					emptyarr.push([a].concat(resul));
	 					emptyTimeslotPart1(date, x+1, emptyarr, callback); 
	 				}
	 			});
	 		});
 		} else {
 			callback(emptyarr);
 		}
 	}

 	emptyTimeslot = function(date, callback) {
 		emptyTimeslotPart1(date, 0, [], function(emptyarr) {
 			callback(emptyarr);
 		})
 	}

	allEmptyTimeslotsFor5DaysPart1 = function(emptyarr, the5DaysString, i, callback) {
		console.log(i);
		if (i > 0) {
			emptyTimeslot(the5DaysString[5 - i], function(arr) {
				emptyarr.push([the5DaysString[5 - i]].concat([arr]));
				allEmptyTimeslotsFor5DaysPart1(emptyarr, the5DaysString, i-1, callback);
			})
		} else {
			callback(emptyarr);
		}
	}

 	allBookedTimeslotsFor5DaysPart1 = function(emptyarr, the5DaysString, i, callback) {
		console.log(i);
		if (i > 0) {
			bookedTimeslot(the5DaysString[5 - i], function(arr) {
				emptyarr.push([the5DaysString[5 - i]].concat([arr]));
				allBookedTimeslotsFor5DaysPart1(emptyarr, the5DaysString, i-1, callback);
			})
		} else {
			callback(emptyarr);
		}
	}

	allTimeslotsFor5DaysIter = function(emptyarr, all5DaysArray, i, callback) {//[], [], 5, callback
		if (all5DaysArray.length == 0) {
			all5Days(function(arr) {
				allTimeslotsFor5DaysIter(emptyarr, arr, i, callback);
			});
		} else if (i > 0) {
			console.log("all5DaysArray: " + all5DaysArray);
			TimeslotForTheDay(all5DaysArray[5 - i], function(resul) {
				console.log("emptyarr: " + emptyarr);
				emptyarr.push(resul);
				allTimeslotsFor5DaysIter(emptyarr, all5DaysArray, i-1, callback);
			})
		} else if (i == 0) {
			callback(emptyarr);
		}
	}
 	groupBookingStateIter = function(grp, emptyarr, the5DaysString, i, callback) {//grpname, [], [], 5, callback
 		if (the5DaysString.length == 0) {
 			all5Days(function(arr) {
 				groupBookingStateIter(grp, emptyarr, arr, i, callback);
 			});
 		} else if (i > 0) {
 			console.log(5 - i);
 			processDateWithHyphen(the5DaysString[5 - i], function(str) {
 				connectionBook.query("select * from ?? where GROUPID=? and DATE=?", [infoBook.table, grp, str], function(err, resul) {
 					emptyarr.push([str].concat(resul));
 					groupBookingStateIter(grp, emptyarr, the5DaysString, i - 1, callback);
 				})
 			});	
 		} else if (i == 0) {
 			callback(emptyarr);
 		}
 	}

 	groupBookingState = function(grp, callback) {
 		groupBookingStateIter(grp, [], [], 5, function(arr) {
 			callback(arr); //[["2017-7-21"],["2017-7-22"],["2017-7-23"],["2017-7-24"],["2017-7-25"]]
 		})
 	}
 	//output:
 	// [["2017-7-20"],
 	// ["2017-7-21"],
 	// ["2017-7-22"],
 	// ["2017-7-23",{"GROUPNAME":"moguempire","ROOMNUMBER":"103","DATE":"2017-07-22T16:00:00.000Z","SLOTSTART":"08:00:00","SLOTEND":"10:00:00","DECISIONTIME":"2017-07-20T01:53:54.000Z"}],
 	// ["2017-7-24"]]

	hasGroupBookedAnyFor5DaysPart1 = function(name, emptyarr, statearr, i, callback) {
		if(statearr.length == 0) {
			groupBookingState(name, function(arr) {
				hasGroupBookedAnyFor5DaysPart1(name, emptyarr, arr, i, callback);
			})
		} else if (i < 5) {
			if(statearr[i].length > 1) {
				emptyarr.push(true);
				hasGroupBookedAnyFor5DaysPart1(name, emptyarr, statearr, i + 1, callback);
			} else {
				emptyarr.push(false);
				hasGroupBookedAnyFor5DaysPart1(name, emptyarr, statearr, i + 1, callback);
			}		
		} else if (i >= 5) {
			callback(emptyarr);
		}
	}

	obtainAllMemberEmailIter = function(grpid, i, emptyarr, groupArr, callback) {
    	//1701, 1, [], [], callback
    	if (i == 1 && groupArr.length == 0) {
    		connectionGroupInfo.query("select * from ?? where GROUPID=?", [infoGroupInfo.table, grpid], function(err, resul) {
    			obtainAllMemberEmailIter(grpid, i, emptyarr, resul, callback);
    		})
    	} else if (i >= 5) {
    		callback(emptyarr);
    	} else if ( 1 < i < 5 && groupArr.length != 0) {
    		if (groupArr[0]["NUSNETSID"+i] != "none" || groupArr[0]["NUSNETSID"+i] != null) {
    			console.log(groupArr[0]["NUSNETSID"+i]);
    			connectionUser.query('select EMAIL from ?? where ??=?', [infoUser.table, "NUSNETSID", groupArr[0]["NUSNETSID"+i]], function(errr, resull) {
    				emptyarr.push(resull[0]["EMAIL"]);
    				obtainAllMemberEmailIter(grpid, i + 1, emptyarr, groupArr, callback);
    			})
    		} else {
    			console.log("lalalal" + groupArr[0]["NUSNETSID"+i]);
    			obtainAllMemberEmailIter(grpid, i + 1, emptyarr, groupArr, callback);
    		}
    	}
    }



 /*----group book and group booking state API-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
 	this.dateFormatFromHyphen = function(str, callback) {//str: 2017-7-27; output: dd mm year
		var arr = str.split("-");
		var ar = [];
		ar[0] = arr[2];
		ar[1] = arr[1];
		ar[2] = arr[0];
		var result = ar.join(" ");
		callback(result);
	}

 	this.dateFormatFromReq = function(str, callback) {//str: Tue Jul 10 2017; output: dd mm year //exact same function as dateFormat
		var d = new Date();
		var time = Date.parse(str);
		d.setTime(time);
		var arr = d.toLocaleDateString().split('/');
		var ar = [];
		ar[0] = arr[1];
		ar[1] = arr[0];
		ar[2] = arr[2];
		var result = ar.toString().replace(/,/g, " ");
		console.log("result: " + result);
		callback(result);
	}

 	//precondition: room and timeslot all exist
	//              the group is complete//including if it exists
	//process: check if the prefered timeslot is taken
	//         check if the group alr booked any room
	//postcondition: if success
	this.groupBook = function(name, date, room, timeslot, callback) { //"group name", "101", "8TO10", callback
		isTimeslotEmpty(date, timeslot, room, function(boo) {
			if(boo == true) {
				console.log("alright the roooms empty and u can proceed");
				hasGroupBooked(name, date, function(booo) {
					if (booo == false) {
						console.log("empty group! can proceed!");
						groupBookPart1(name, date, room, timeslot, function(bool) {
							if(bool == true) {
								console.log("updated Group_record! now prepare to update Room_record!");
								groupBookPart2(name, date, room, timeslot, function(bol) {
									console.log("Room_record updated. congratz.");
									callback(true);
								})
							}
						});
					} else {
						console.log("group made booking!");
						callback(false);
					}
				});
			} else {
				console.log("nahhh");
				callback(false);
			}
		});
	}

    
    this.groupBookNotify = function(name, grpid, room, timeslot, date) {
		obtainAllMemberEmailIter(grpid, 1, [], [], function(email) {
			mailOptions.subject = "Your group has booked a room!";
			mailOptions.text = name + " has helped " + "your group book a room. Details: groupID: " + grpid +"; room: " + room + "; timeslot: " + timeslot + "; date: " + date;
		    for (var i = 0; i < email.length; i++) {
			    mailOptions.to = email[i];
			    console.log(mailOptions);
			    transporter.sendMail(mailOptions, function(err, info) {
			        if (err) console.error(err);
			        console.log("mailsent" + JSON.stringify(info));
			    });		
		    }   
		})    
    }

    this.groupCancelNotify = function(name, grpid, room, timeslot, date) {
		obtainAllMemberEmailIter(grpid, 1, [], [], function(email) {
			mailOptions.subject = "Your group has cancelled a booking!";
			mailOptions.text = name + " has helped " + "your group cancel a room booking. Details: groupID: " + grpid +"; room: " + room + "; timeslot: " + timeslot + "; date: " + date;
		    for (var i = 0; i < email.length; i++) {
			    mailOptions.to = email[i];
			    console.log(mailOptions);
			    transporter.sendMail(mailOptions, function(err, info) {
			        if (err) console.error(err);
			        console.log("mailsent" + JSON.stringify(info));
			    });		
		    }   
		})    
    }

	this.groupCancel = function(name, date, room, timeslot, callback) {
		isTimeslotEmpty(date, timeslot, room, function(boo) {
			if(boo == false) {
				console.log("yes the room is occupied, is this room occupied by this group?");
				hasGroupBookedRoom(name, date, room, timeslot, function(booo) {
					if(booo == false) {
						console.log("yo this group didnt book this room");
						callback(false);
					} else {
						console.log("yes this room is booked by this group");
						groupCancelPart1(name, date, room, timeslot, function(bol) {
							if(bol == true) {
								console.log("canceled the record in Group_record. Now proceed onto Room_record.");
								groupCancelPart2(name, date, room, timeslot, function(bool) {
									if(bool == true) {
										console.log("canceled the record in Room_record.");
										callback(true);
									} 
								});
							}
						});
					}
				});
			} else {
				console.log("nah the room is not occupied.");
				callback(false);
			}
		})
	}



 	this.groupBookingStateFor5Days = function(grp, callback) {
 		groupBookingStateIter(grp, [], [], 5, function(arr) {
 			callback(arr);
 		})
 	}
 	//output:
 	// [["2017-7-20"],
 	// ["2017-7-21"],
 	// ["2017-7-22"],
 	// ["2017-7-23",{"GROUPNAME":"moguempire","ROOMNUMBER":"103","DATE":"2017-07-22T16:00:00.000Z","SLOTSTART":"08:00:00","SLOTEND":"10:00:00","DECISIONTIME":"2017-07-20T01:53:54.000Z"}],
 	// ["2017-7-24"]]

 	
	this.hasGroupBookedAnyForTheDay = function(name, date, callback) {//"moguempire", "101", "dd mm year"/used externally, same as hasGroupBooked
		processDateWithHyphen(date, function(str) {
			connectionGroup.query("select * from ?? where GROUPID=? AND DATE=?", [infoGroup.table, name, str], function(err, results) {
				console.log(JSON.stringify(results));
				if (err) throw err;
				if(results.length == 0){
					console.log("this group hasnt made any bookings on " + date);
					callback(false);
				} else if (results[0]["CANCEL_DECISION"] == null) {
					console.log("this group has alr booked on " + date);
					callback(true);
				} else if (results[0]["CANCEL_DECISION"] == "CANCEL") {
					console.log("this group has cancelled their previous booking. Can make another booking.");
					callback(false);
				} 
			});	
		});
	}

	this.hasGroupBookedAnyFor5Days = function(name, callback) {
		hasGroupBookedAnyFor5DaysPart1(name, [], [], 0, function(arr) {
			callback(arr);
		})
	}//[ false, false, false, true, false ]

/*----Timeslot API-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

 	this.allTimeslotsFor5Days = function(callback) {
		allTimeslotsFor5DaysIter([], [], 5, function(arr) {
			callback(arr);
		})
	}

	this.bookedTimeslotForTheDay = function(date, callback) {//exactly the same as bookedTimeslot
		bookedTimeslotPart1(date, 0, [], function(emptyarr) {
 			callback(emptyarr);
 		})
 	} //[["8TO10",{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"}],["10TO12",{"ROOMNUMBER":"104"}],["14TO16",{"ROOMNUMBER":"105"}],["16TO18",{"ROOMNUMBER":"103"}]]
	

	this.emptyTimeslotForTheDay = function(date, callback) {//exactly the same as emptyTimeslot, used externally
 		emptyTimeslotPart1(date, 0, [], function(emptyarr) {
 			callback(emptyarr);
 		})
 	}

	this.allEmptyTimeslotsFor5Days = function(callback) {
		all5Days(function(arr) {
			allEmptyTimeslotsFor5DaysPart1([], arr, 5, function(arrr) {
				callback(arrr);
			})
		})	
	}
	// output (same format)
	// [["20 7 2017",[]],
	// ["21 7 2017",[]],
	// ["22 7 2017",[]],
	// ["23 7 2017",[["8TO10",{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"}],["10TO12",{"ROOMNUMBER":"104"}],["14TO16",{"ROOMNUMBER":"105"}],["16TO18",{"ROOMNUMBER":"103"}]]],
	// ["24 7 2017",[]]]
	
	this.allBookedTimeslotsFor5Days = function(callback) {
		all5Days(function(arr) {
			allBookedTimeslotsFor5DaysPart1([], arr, 5, function(arrr) {
				callback(arrr);
			})
		})	
	}
	// output
	// [["20 7 2017",[]],
	// ["21 7 2017",[]],
	// ["22 7 2017",[]],
	// ["23 7 2017",[["8TO10",{"ROOMNUMBER":"103"},{"ROOMNUMBER":"104"}],["10TO12",{"ROOMNUMBER":"104"}],["14TO16",{"ROOMNUMBER":"105"}],["16TO18",{"ROOMNUMBER":"103"}]]],
	// ["24 7 2017",[]]]


}

module.exports = db;