var mysql = require("mysql");



var Groupinfo = {
  host     : 'localhost',
  user     : 'root',
  password : 'LordMushroom2015',
  database : 'nus_db',
  table    : 'Group_info'
};

var Userinfo = {
  host     : 'localhost',
  user     : 'root',
  password : 'LordMushroom2015',
  database : 'nus_db',
  table    : 'User_info'
}

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wen.xin.2014@vjc.sg',
    pass: 'victoria2014'
  }
});

var mailOptions = {
  from: 'wen.xin.2014@vjc.sg',
  to: "to be updated",
  subject: 'Sending Email using Node.js',
  text: 'That was easy lol!'
};

//Group_info: NUSNETSID1(first member),NUSNETSID2, NUSNETSID3, NUSNETSID4, NUSNETSID5, GROUPNAME(string), PASSWORD(hashed)
//User_info: NUSNETS ID, NAME, EMAIL, GROUPNAME

var connection = mysql.createConnection(Groupinfo);
var connectionUser = mysql.createConnection(Userinfo);

//results of select from table example: [{"Id":2,"RoomNumber":"102","Name":"Wen Xin","Email":"e0052753@u.nus.edu","Status":1,"TimeModified":"2017-06-26T10:43:55.000Z"}]
function dbGroupandUser() {
	//used in Group registration (the first person register, or pull other ppl in)
	this.IfGroupAlrExist = function(name, callback) {
		connection.query('select * from ?? where GROUPNAME=?', [Groupinfo.table, name], function(err, results) {
			if(err) {
				console.log(err);
				throw err;
			};
			if(results.length == 0) { //no such group, can register
				callback(name, false, results);
			} else if (results.length == 1) {
				callback(name, true, results); //there is one group with this name, join them
			} else {
				callback(name, null, results); // error
			}
		});
	}

	IfGroupIsComplete = function(name, callback) { //precondition: the group is alr registered
		connection.query("select * from ?? where GROUPNAME=?", [Groupinfo.table, name], function(err, results) {
			console.log(results);
			if (err) throw err;
			if (results.length == 0) {
				callback(name, null); //group does not even exist
			} else if (results[0].NUSNETSID1 == "none" ||
				results[0].NUSNETSID2 == "none" ||
				results[0].NUSNETSID3 == "none" ||
				results[0].NUSNETSID4 == "none" ) {
				callback(name, false); //group is not complete, cannt make a booking 
			} else {
				callback(name, true); //group is complete, can make a booking
			}
		});
	}

	IfIdAlrAddedPart1 = function(id, arr, callback) {//arr is an empty array
			for (var i = 1; i <= 5; i++) {
				connection.query("select * from ?? where NUSNETSID" + i + "=" + "?", [Groupinfo.table, id], function(err, results) {
					console.log(JSON.stringify(results));
					if(err) {
						throw err;
					} else if (results.length == 0) {
						;
					} else {//[{"NUSNETSID1":"e0052753"},{"NUSNETSID1":"a"},{"NUSNETSID1":"e0052753"}]
						for (var u = 0; u < results.length; u++) {
							arr.push(results[u]["GROUPNAME"]);
							console.log("array: " + arr);
						}
					}
				});
			}
			setTimeout(function(){callback(id, arr);}, 1000);
			//setTimeout(function(){console.log("*************************** " + arr+ " **************************");}, 1000);
	}

	IfIdAlrAdded = function(id, callback) {
		IfIdAlrAddedPart1(id, [], function(idd, arr) {
			if (arr.length == 0) {
				callback(id, arr, false);
			} else {
				callback(id, arr, true);
			}
		})
	}

	//precondition: the group name is valid, so can register
	// the name, id1, id2, id3, id4 and id5 r submitted to the database, where a grp with name and id1 is created
	// the rest of the ids send email to ask them confirm their group, then update after confirmation. 
	this.registerGroup = function(name, id1, id2, id3, id4, id5, callback) {
		connection.query("insert into ?? (GROUPNAME, NUSNETSID1) values (?, ?)", [Groupinfo.table, name, id1], function(err, results) {
			if (err) throw err;
			console.log(results);
			callback(name, id2, id3, id4, id5);
		});
	}

	this.groupBookingRoom = function(name, callback) {
		IfGroupIsComplete(name, function(namee, boo) {
			if(boo == false) {
				console.log("group is incomplete, cannt make a booking!");
				callback(name, false);
			} else if (boo == true) {
				console.log("group is complete: can make a booking.");
				callback(name, true);
			}
		})
	}

	//precondition: the owner of the id acknowledge by clicking the link on the email and confirming on the confirmation page
	//precondition: the group alr exists
	//postcondition: the id's might be added multiple times to the same grp
	this.registerID = function(name, id, callback) {
		IfIdAlrAdded(id, function(idd, resul, booo) {
			if(booo == true) {
				console.log("this id has alr been registered in groups with group names " + resul);
				callback(name, id, false);
			} else if (booo == false) {
				console.log("this id hasnt been registered in any group yet.");
				IfGroupIsComplete(name, function(namee, boo) {
					if (boo == false) {
						console.log("incomplete group, can register the next id!");
						connection.query("select * from ?? where GROUPNAME=?", [Groupinfo.table, name], function(err, results) {
							console.log(results);
							for(var i = 2; i <= 5; i++) {
								console.log(i);
								var str = "NUSNETSID" + i;
								console.log("**************************************");
								console.log(JSON.stringify(results));
								if(results[0][str] == "none") {
									connection.query("update ?? set NUSNETSID" + i + "=? where GROUPNAME=?", [Groupinfo.table, id, name], function(err, resultss) {
										console.log("add member id successfully!");
										console.log("^^^^^^^^^^^^666" + resultss);
										callback(name, id, true);
									});
									break;
								} else {
									continue;
								}
							}
						});
					} else if (boo == true) {
						console.log("lets check NUSNETSID5");
						connection.query("select NUSNETSID5 from ?? where GROUPNAME=?", [Groupinfo.table, name], function(err, results) {
							if(results[0].NUSNETSID5 == null) {
								console.log("one more available id slot in this grp!");
								connection.query("update ?? set NUSNETSID5=? where GROUPNAME=?", [Groupinfo.table, id, name], function(err, results) {
									console.log("add to id5 slot successfully!");
									console.log(results);
									callback(name, id, true);
								})
							} else if(results[0].NUSNETSID5 != null) {
								console.log("Ooops the grp is full! ")
								callback(name, id, false);
							}
						});
					} else if (boo == null) {
						console.log("Group not registered!");
						callback(name, id, null);
					}
				});
			}
		});
	}

	this.lol = function(callback) {
		connection.query("select NUSNETSID1 from ??", [Groupinfo.table], function(err, results) {
					console.log(results);
					callback(results);
		});
	}
	//used in Group login (maynot be useful)
	// this.authenticateGroup = function(name, password, callback) { //callback is done()
	// 	connection.query("select * from ?? where GROUPNAME=?", [Groupinfo.table, name], function(err, results) {
	// 		if(err) return callback(err);
	// 		if(results.length == 0 {
	// 			// no such username
	// 			callback(null, false);
	// 		} else if (results[0].PASSWORD != password) {
	// 			// invalid password
	// 			callback(null, false);
	// 		} 

	// 		callback(null, results[0]);
	// 	})
	// }
/* _______________________________________________________User methods __________________________________________________________*/
	this.UserRegistered = function(id, callback) {
		connectionUser.query("select * from ?? where NUSNETSID=?", [Userinfo.table, id], function(err, results) {
			if (err) throw err;
			if (results.length == 0) {
				console.log("User not registered!");
				callback(id, false);
			} else {
				console.log("User registered!");
				callback(id, true);
			}
		})	
	}

	UserGetEmailAdd = function(id, callback) {
		connectionUser.query("select EMAIL from ?? where NUSNETSID=?", [Userinfo.table, id], function(err, results) {
			if (err) throw err;
			if (results.length == 0) {
				console.log("User is not found");
				callback(id, results, false);
			} else {
				console.log("User email obtained");
				callback(id, results, true);
			}
		})
	}

	UserSendEmailPart1= function (id, callback) {
		UserGetEmailAdd(id, function(idd, resul, boo) {
			if (boo == false) {
				console.log("user not found");
			} else if (boo == true) {
				console.log("add user to mailOptions");
				mailOptions.to = resul[0].EMAIL;
				callback(mailOptions);
			}
		});
	}

	this.UserSendEmail = function(id, callback) {
		UserSendEmailPart1(id, function(mO) {
			transporter.sendMail(mO, function(err, info) {
				if (err) {
					console.log(err);
					callback(false);
				} else {
					console.log(info);
					callback(true);
				}
			});
		});
	}
}

module.exports = dbGroupandUser;




