var mysql = require('mysql');
var connection = mysql.createConnection({
	host:'localhost',
	user:'root',
	password: 'LordMushroom2015',
	database:'nus_db'
});

var schedule = require('node-schedule');
 
function wrapper() {
	this.createTableSchedule = function(timestr, callback) {//everday at 00:00
		schedule.scheduleJob(timestr, function() {
			dateStringForDATE(function(datestr) {
				dateStringForCreateTable(function(str) {
					createTable(str, datestr);
					callback(true);
				})
			})
		})
	}
	//timestr: "min hr day month dayofweek" => '40 * * * *' // every 40 of one hr: 12:40, 13:40, 14:40
	//timestr: every one sec: "/1 * * * * *"
	this.dropTableSchedule = function(timestr, callback) {//everyday at 00:00, drop the table of yesterday
		schedule.scheduleJob(timestr, function() {
			dateStringForDropTable(function(str) {
				dropTable(str);
				callback(true);
			})
		});
	}

	this.mendRoomRecordSchedule = function(timestr) {
		schedule.scheduleJob(timestr, function() {
			mendRoomRecord();
		})
	}

	this.dropRedundantRoomRecordSchedule = function(timestr) {
		schedule.scheduleJob(timestr, function() {
			dropRedundantRoomRecord();
		})
	}

	mendRoomRecordPart1 = function(i, callback) {//check from today to 4 days later //0, "", callback
		if (i < 5) {
			dateSpaceStringForSomeDay(i, function(spacestr) {
				dateStringForSomeDay(i, function(datestr) {
					ifTableExist(spacestr, function(boo) {
						if (boo == true) {
							console.log(i);
							//table exist
							mendRoomRecordPart1(i + 1, callback);
						} else {
							//table doesnt exist, replenish it
							console.log(i);
							dateStringForSomeDATE(i, function(dateestr) {
								createTable(datestr, dateestr);
								mendRoomRecordPart1(i+1, callback);
							})
						}
					})
				})
			})	
		} else {
			callback(true);
		}		
	}

	mendRoomRecord = function() {
		mendRoomRecordPart1(0, function(boo) {
			console.log("if all tables replenished: " + boo);
		})
	}

	

	dropRedundantRoomRecordPart1 = function(pastAndFuture, callback) {//integer:-10, callback
		if (pastAndFuture > 10 || pastAndFuture < -10) {
			callback(true);
		} else if (pastAndFuture <= 10 && pastAndFuture >= 5) {
			//checking from -10 to 0 and 5 to 10
			dateSpaceStringForSomeDay(pastAndFuture, function(spacestr) {
				console.log(spacestr);
				dateStringForSomeDay(pastAndFuture, function(datestr) {
					ifTableExist(spacestr, function(boo) {
						if (boo == true) {
							//table exist, drop them
							//console.log(pastAndFuture);
							dropTable(datestr);
							dropRedundantRoomRecordPart1(pastAndFuture + 1, callback);
						} else {
							//table does not exist, check the next table
							//console.log(pastAndFuture);
							dropRedundantRoomRecordPart1(pastAndFuture + 1, callback);
						}
					})
				})
			})
		} else if (pastAndFuture <= -1 && pastAndFuture >= -10) {
			//checking from -10 to 0 and 5 to 10
			dateSpaceStringForSomeDay(pastAndFuture, function(spacestr) {
				console.log(spacestr);
				dateStringForSomeDay(pastAndFuture, function(datestr) {
					ifTableExist(spacestr, function(boo) {
						if (boo == true) {
							//table exist, drop them
							//console.log(pastAndFuture);
							dropTable(datestr);
							dropRedundantRoomRecordPart1(pastAndFuture + 1, callback);
						} else {
							//table does not exist, check the next table
							//console.log(pastAndFuture);
							dropRedundantRoomRecordPart1(pastAndFuture + 1, callback);
						}
					})
				})
			})
		} else {
			// in between the acceptable range, so just pass, dont check
			dropRedundantRoomRecordPart1(pastAndFuture + 1, callback);
		}
	}

	dropRedundantRoomRecord = function() {
		dropRedundantRoomRecordPart1(-10, function(boo) {
			console.log(boo);
		})
	}

	dateStringForCreateTable = function(callback) { //string of 4 days later
		var date = new Date();
		var time = date.getTime();
		date.setTime(time + 345600000);
		var str = (" " + date.toDateString()).replace(/ /g, "_");
		callback(str);
	}

	dateStringForDATE = function(callback) {
		var date = new Date();
		var time = date.getTime();
		date.setTime(time + 345600000);
		var arr = date.toLocaleDateString().split('/');
		var ar = [];
		ar[0] = arr[2];
		ar[1] = arr[0];
		ar[2] = arr[1];
		var result = ar.toString().replace(/,/g, "-");
		console.log("result: " + result);
		callback(result);
	}

	dateStringForSomeDATE = function(int, callback) {
		var date = new Date();
		var time = date.getTime();
		date.setTime(time + 86400000 * int);
		var arr = date.toLocaleDateString().split('/');
		var ar = [];
		ar[0] = arr[2];
		ar[1] = arr[0];
		ar[2] = arr[1];
		var result = ar.toString().replace(/,/g, "-");
		console.log("result: " + result);
		callback(result);
	}

	dateStringForSomeDay = function(int, callback) {//count start from today //_output: _tue_jul_23_2017
		var date = new Date();
		var time = date.getTime();
		date.setTime(time + 86400000 * int);
		var str = (" " + date.toDateString()).replace(/ /g, "_");
		console.log(str);
		callback(str);
	}

	dateSpaceStringForSomeDayPart1 = function(int, callback) {//callback(a integer number)
		var date = new Date();
		var time = date.getTime();
		callback(date.setTime(time + 86400000 * int));
	}

	dateSpaceStringForSomeDay = function(int, callback) {
		dateSpaceStringForSomeDayPart1(int, function(time) {
			var d = new Date();
			d.setTime(time);
			var arr = d.toLocaleDateString().split('/');
			var ar = [];
			ar[0] = arr[1];
			ar[1] = arr[0];
			ar[2] = arr[2];
			var result = ar.toString().replace(/,/g, " ");
			console.log("result: " + result);
			callback(result);
		})
	}

	createTableStatement = function(str, callback) {
			callback( 
			'create table Room_record' + str + ' (' +  
			'ROOMNUMBER varchar(225) not null,'+
			'8TO10 varchar(225) not null default "NONE",'+
			'10TO12 varchar(225) not null default "NONE",'+
			'12TO14 varchar(225) not null default "NONE",'+
			'14TO16 varchar(225) not null default "NONE",'+
			'16TO18 varchar(225) not null default "NONE",'+
			'18TO20 varchar(225) not null default "NONE",'+
			'20TO22 varchar(225) not null default "NONE",'+
			'DATEOFTABLE date not null,'+
			'primary key (ROOMNUMBER)'+
			')');
	}

	createTableQuery = function(tableStatement, datestr, callback) {
		connection.query(tableStatement, function(errr, resul) {
			if(errr) throw errr;
			callback(datestr);
		});
	}

	createTableContent = function(datestr, i, end, DATEstr, callback) {//i = 6, end = 0;
		if (i >= 0) {
			connection.query('insert into ?? (ROOMNUMBER, DATEOFTABLE) values (?, ?)', ['Room_record'+datestr, '10'+i, DATEstr], function(er, res) {
					if (er) throw er;
					createTableContent(datestr, i - 1, 0, DATEstr, callback);
			})
		} else {
			callback(datestr);
		}
		
	} 

	// updateTableContent = function(str) {
	// 	connection.query('update ?? set DATEOFTABLE = DATE_ADD(DATEOFTABLE, interval 4 day)', ['Room_record'+str], function(e, r) {
	// 				if (e) throw e;
	// 				console.log(r);
	// 	});
	// }

	createTable = function(datestr, DATEstr) {//_tue_jul_32_2017, 2017-2-23
			createTableStatement(datestr, function(tableStatement) {
				createTableQuery(tableStatement, datestr, function(datee) {
					createTableContent(datee, 6, 0, DATEstr, function(datestrr) {
						// updateTableContent(datestrr);
						;
					});
				});
			});
	}


	this.getTableDate = function(str, callback) {
		connection.query('select DATEOFTABLE from ??', ['Room_record'+str], function(err, resul) {
			if (err) throw err;
			console.log(JSON.stringify(resul));
			callback();
		})
	}

	dateStringForDropTable = function(callback) { //yesterday's string
		var date = new Date();
		var time = date.getTime();
		date.setTime(time - 86400000);
		var str = (" " + date.toDateString()).replace(/ /g, "_");
		callback(str);
	}

	dropTable = function(str) {
			connection.query('drop table ??', ['Room_record'+str], function(er, res) {
				if (er) throw er;
				console.log(res);
			});
	}

/*------------------------------------------------check if table exist for that day-------------------------------------------------*/

	ifTableExist = function(str, callback) { //dd mm year
		processDateWithUnderscore(str, function(datestr) {
			connection.query("select * from ??", ["Room_record" + datestr], function(err, resul) {
				if (err) {
					//the table doesnt exist
					console.log("table doesnt exist");
					callback(false);
				} else {
					//the table exist
					console.log("table exist");
					callback(true);
				}
			})
		})
	}


/*----------------------------------------------------------------------------------*/



	processDateWithUnderscorePart1 = function(str, callback) {//dd mm year
		var d = new Date();
		console.log("**********" + str);
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
}

module.exports = wrapper;