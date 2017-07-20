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


var connection = mysql.createConnection(info);
var connectionGroup = mysql.createConnection(infoGroup);
var connectionBook = mysql.createConnection(infoBook);
var connectionGroupInfo = mysql.createConnection(infoGroupInfo);


function db(){
	this.allGroup = function(callback) {
		connectionGroup.query("select ?? from ??", ['GROUPNAME', infoGroupInfo.table], function(err, resul) {
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


	hasGroupBookedRoom = function(name, date, room, callback) {//"moguempire", "101", "dd mm year"
		processDateWithHyphen(date, function(str) {
			connectionGroup.query("select * from ?? where GROUPNAME=? AND ROOMNUMBER=? AND DATE=? order by DECISIONTIME desc", [infoGroup.table, name, room, str], function(err, results) {
				console.log(JSON.stringify(results));
				if (err) throw err;
				if(results.length == 0){
					console.log("this group hasnt made any bookings for this room~");
					callback(false);
				} else if (results[0]["DECISION"] == "BOOK") {
					console.log("this group has alr booked a room ooops");
					callback(true);
				} else if (results[0]["DECISION"] == "CANCEL") {
					console.log("this group has cancelled their previous booking. Can make another booking.");
					callback(false);
				} 
			});	
		});
	}
	//17号半夜 我只能写到这里了。。下面都是没改的。。

	hasGroupBooked = function(name, date, callback) {//"moguempire", "101", "dd mm year"
		processDateWithHyphen(date, function(str) {
			connectionGroup.query("select * from ?? where GROUPNAME=? AND DATE=? order by DECISIONTIME desc", [infoGroup.table, name, str], function(err, results) {
				console.log(JSON.stringify(results));
				if (err) throw err;
				if(results.length == 0){
					console.log("this group hasnt made any bookings for this room~");
					callback(false);
				} else if (results[0]["DECISION"] == "BOOK") {
					console.log("this group has alr booked a room ooops");
					callback(true);
				} else if (results[0]["DECISION"] == "CANCEL") {
					console.log("this group has cancelled their previous booking. Can make another booking.");
					callback(false);
				} 
			});	
		});
	}

	groupBookPart1 = function(name, date, room, timeslot, callback) { 
//insert into Group_record (GROUPNAME, DECISION, DATE, ROOMNUMBER, SLOTSTART, SLOTEND) values ("moguempireee", "BOOK", "101", '2017-3-23', 100000', '120000');
		processDateWithHyphen(date, function(str) {
			connectionGroup.query("insert into ?? (GROUPNAME, DECISION, DATE, ROOMNUMBER, SLOTSTART, SLOTEND) values (?, 'BOOK', ?, ?, ?, ?)", 
								  [infoGroup.table, name, str, room, timeslot.split("TO")[0]+"0000", timeslot.split("TO")[1]+"0000"],
								  function(err, resul) {
								  	if (err) throw err;
								  	console.log("%%%%%% " + JSON.stringify(resul));
								  	connectionBook.query("insert into ?? (GROUPNAME, ROOMNUMBER, DATE, SLOTSTART, SLOTEND) values (?, ?, ?, ?, ?)", 
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
			connectionGroup.query("insert into ?? (GROUPNAME, DECISION, DATE, ROOMNUMBER, SLOTSTART, SLOTEND) values (?, 'CANCEL', ?, ?, ?, ?)", 
								  [infoGroup.table, name, str, room, timeslot.split("TO")[0]+"0000", timeslot.split("TO")[1]+"0000"],
								  function(err, resul) {
								  	if (err) throw err;
								  	console.log("%%%%%% " + JSON.stringify(resul));
									connectionBook.query("delete from ?? where GROUPNAME=? AND DATE=?", 
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

	//precondition: room and timeslot all exist
	//              the group is complete
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

	this.groupCancel = function(name, date, room, timeslot, callback) {
		isTimeslotEmpty(date, timeslot, room, function(boo) {
			if(boo == false) {
				console.log("yes the room is occupied, is this room occupied by this group?");
				hasGroupBookedRoom(name, date, room, function(booo) {
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
	all5Days = function(callback) {//output: [ '19 7 2017', '20 7 2017', '21 7 2017', '22 7 2017', '23 7 2017' ]
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

	this.allTimeslotsFor5Days = function(callback) {
		allTimeslotsFor5DaysIter([], [], 5, function(arr) {
			callback(arr);
		})
	}


	this.hasGroupBookedAny = function(name, date, callback) {//used externally, same as hasGroupBooked
		processDateWithHyphen(date, function(str) {
			connectionGroup.query("select * from ?? where GROUPNAME=? AND DATE=? order by DECISIONTIME desc", [infoGroup.table, name, str], function(err, results) {
				console.log(JSON.stringify(results));
				if (err) throw err;
				if(results.length == 0){
					console.log("this group hasnt made any bookings for this room~");
					callback(false);
				} else if (results[0]["DECISION"] == "BOOK") {
					console.log("this group has alr booked a room ooops");
					callback(true);
				} else if (results[0]["DECISION"] == "CANCEL") {
					console.log("this group has cancelled their previous booking. Can make another booking.");
					callback(false);
				} 
			});	
		});
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

 	this.bookedTimeslot = function(date, callback) {
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

 	this.emptyTimeslot = function(date, callback) {
 		emptyTimeslotPart1(date, 0, [], function(emptyarr) {
 			callback(emptyarr);
 		})
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
 				connectionBook.query("select * from ?? where GROUPNAME=? and DATE=?", [infoBook.table, grp, str], function(err, resul) {
 					emptyarr.push([str].concat(resul));
 					groupBookingStateIter(grp, emptyarr, the5DaysString, i - 1, callback);
 				})
 			});	
 		} else if (i == 0) {
 			callback(emptyarr);
 		}
 	}

 	this.groupBookingState = function(grp, callback) {
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
};

module.exports = db;