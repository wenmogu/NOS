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

var RVRCuser = {
  host     : 'localhost',
  user     : 'root',
  password : 'LordMushroom2015',
  database : 'nus_db',
  table    : 'RVRC_User'
}

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jlinswenmogu@gmail.com',
    pass: '*'
  }
});

var mailOptions = {
  from: 'jlinswenmogu@gmail.com',
  to: "to be updated",
  subject: "punishment for ignoring me",
  text: '!!!'
};

//Group_info: NUSNETSID1(first member),NUSNETSID2, NUSNETSID3, NUSNETSID4, NUSNETSID5, GROUPNAME(string), PASSWORD(hashed)
//User_info: NUSNETS ID, NAME, EMAIL, GROUPNAME

var connection = mysql.createConnection(Groupinfo);
var connectionUser = mysql.createConnection(Userinfo);
var connectionRV = mysql.createConnection(RVRCuser);

//results of select from table example: [{"Id":2,"RoomNumber":"102","Name":"Wen Xin","Email":"e0052753@u.nus.edu","Status":1,"TimeModified":"2017-06-26T10:43:55.000Z"}]
function dbGroupandUser() {
	

	IfGroupIsComplete = function(name, callback) { //precondition: the group is alr registered
		connection.query("select * from ?? where GROUPID=?", [Groupinfo.table, name], function(err, results) {
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

	IfIdAlrAddedPart1 = function(id, emptyarr, i, callback) {//id, [], 1, callback
		if(i > 5) {
			callback(id, emptyarr);
		} else {
			connection.query("select * from ?? where NUSNETSID" + i + "=" + '?', [Groupinfo.table, id], function(err, results) {
				if(err) throw err;
				if (results.length == 0) {
					IfIdAlrAddedPart1(id, emptyarr, i + 1, callback);
				} else {
					emptyarr.push(results[0]["GROUPID"]);
					IfIdAlrAddedPart1(id, emptyarr, i + 1, callback);
				}
			}) 
		}
	}

	IfIdAlrAdded = function(id, callback) {
		IfIdAlrAddedPart1(id, [], 1, function(idd, arr) {
			if (arr.length == 0) {
				callback(id, arr, false);
			} else {
				callback(id, arr, true);
			}
		})
	}

	

	this.lol = function(callback) {
		connection.query("select NUSNETSID1 from ??", [Groupinfo.table], function(err, results) {
					console.log(results);
					callback(results);
		});
	}	

	isUserInDB = function(name, id, email, callback) {
		connectionUser.query("select * from ?? where NUSNETSID=? and USERNAME=?", [Userinfo.table, id, name], function(err, resul) {
			if (err) throw err;
			if (resul.length == 0) {
				console.log("user not in DB yet. adding her later.");// followed by addUserToUserInfo
				callback(name, id, email, false);
			} else {
				console.log("user in DB.");
				callback(name, id, email, true);
			}
		})
	}

	whichMemberSlotEmptypart1 = function(grp, i, emptyarr, resularr, trigger, callback) {//grpid, 1, [], [], false, callback
		if (trigger == false) {
			//hvnt loaded to resularr yet
			connection.query('select * from ?? where GROUPID=?', [Groupinfo.table, grp], function(err, resul) {
				if (err) throw err;
				whichMemberSlotEmptypart1(grp, i, emptyarr, resul, true, callback);
			});
		} else {
			if (i > 5) {
				callback(emptyarr);
			} else {
				if (resularr.length == 0 && i == 3) {
					callback(null);
				} else if (resularr[0]["NUSNETSID" + i] == "NONE") {
					emptyarr.push[i];
					whichMemberSlotEmptypart1(grp, i+1, emptyarr, resularr, true, callback);
				} else {
					whichMemberSlotEmptypart1(grp, i + 1, emptyarr, resularr, true, callback);
				}
			}
		}
	}

	
	UserGetEmailAddFromDB = function(id, callback) {
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

	UserGetEmailAddFromReq = function(email, callback) {
		console.log(email);
		mailOptions.to = email;
		callback(mailOptions);
	} 

	UserSendEmailPart1= function (id, callback) {
		UserGetEmailAddFromDB(id, function(idd, resul, boo) {
			if (boo == false) {
				console.log("user not found");
			} else if (boo == true) {
				console.log("add user to mailOptions");
				mailOptions.to = resul[0].EMAIL;
				callback(mailOptions);
			}
		});
	}



/* _______________________________________________________User methods __________________________________________________________*/


	//precondition: the user tries to login, and NUS authenticates the request and fetched the profile of the user
	//postcondition: the webpage check if this user if from RVRC: if true, allow access; if false, deny access
	this.isUserFromRVRC = function(id, name, callback) {
		connectionRV.query("select * from ?? where NUSNETSID=? and NAME=?", [RVRCuser.table, id, name], function(err, results) {
			if (err) throw err;
			if (results.length == 0) {
				console.log("USER NOT FROM RVRC");
				callback(id, name, false);
			} else {
				console.log("USER FROM RVRC.");
				callback(id, name, true);
			}
		})
	}

	this.hasUserRegistered = function(name, id, email, callback) {//used in routing register: 
		//if user has registered then redirect to viewRegister
		connectionUser.query("select * from ?? where NUSNETSID=? and USERNAME=?", [Userinfo.table, id, name], function(err, resul) {
			if (err) throw err;
			if (resul.length == 0) {
				console.log("user not in DB yet. adding her later.");// followed by addUserToUserInfo
				callback(name, id, email, false);
			} else {
				console.log("user in DB.");
				callback(name, id, email, true);
			}
		})
	}

	//i.e. register user into this system, before this user can be added into any group. 
	this.addUserToUserInfo = function(name, id, email, callback) {
		isUserInDB(name, id, email, function(namee, idd, emaill, boo) {
			if(boo == true) {
				console.log("dont need to add");
				callback(true);
			} else if (boo == false) {
				console.log("need to add");
				connection.query("insert into ?? (USERNAME, NUSNETSID, EMAIL) values (?, ?, ?)", [Userinfo.table, namee, idd, emaill], function(err, result) {
					if (err) throw err;
					console.log(JSON.stringify(result));
					callback(true);
				});
			} else {
				callback(false);
			}
		});
	}

	this.getUserGroup = function(name, id, callback) {//if this guy doesnt have a group, directed to register page//related to Group_info
		connectionUser.query("select * from ?? where USERNAME=? and NUSNETSID=?", [Userinfo.table, name, id], function(err, resul) {
			if (err) throw err;
			if(resul.length == 0) {
				console.log("this guy does not even exist");
				callback(false, null, false);
			} else if(resul[0].GROUPID == null) {
				console.log("this guy hasnt gotten a group yet!");
				callback(id, null, false);
			} else {
				console.log("ok this guy is in a group");
				callback(id, resul[0].GROUPID, true);
			}
		});
	}

	this.getGroupLeader = function(grpid, callback) {
		connection.query('select NUSNETSID1 from ?? where GROUPID=?', [Groupinfo.table, grpid], function(err, resul) {
			if (err) throw err;
			// console.log(JSON.stringify(resul));[{"NUSNETSID1":"e0032334"}]
			connectionUser.query('select * from ?? where NUSNETSID=?', [Userinfo.table, resul[0]["NUSNETSID1"]], function(errr, resull) {
				if (errr) throw errr;
				callback(resull[0]["NUSNETSID"], resull[0]["USERNAME"], resull[0]["EMAIL"]);
			})
		})
	}
/*--------------------------------------------for MAINTAINANCE----------------------------------------*/

//if the user changed her email halfway, gotta update the system. 
	this.updateUserEmail = function(reqName, reqID, reqEmail, callback) {
		connectionUser.query('select * from ?? where USERNAME=? AND NUSNETSID=?', [Userinfo.table, reqName, reqID], function(err, resul) {
			if (err) console.error(err);
			if (resul[0]["EMAIL"] == reqEmail) {
				callback(true);
			} else {
				connectionUser.query('update ?? set EMAIL=? where NUSNETSID=?', [Userinfo.table, reqEmail, reqID], function(errr, resull) {
					if (errr) console.error(errr);
					callback(true);
				})
			}
		})
	}
/* _______________________________________________________GROUP methods __________________________________________________________*/


	//used in Group registration (the first person register, or pull other ppl in)
	this.IfGroupAlrExist = function(name, callback) {
		connection.query('select * from ?? where GROUPID=?', [Groupinfo.table, name], function(err, results) {
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

	this.IfGroupComplete = function(name, callback) { //exactly same as IfGroupIsComplete, used externally
		connection.query("select * from ?? where GROUPID=?", [Groupinfo.table, name], function(err, results) {
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

	this.whichMemberSlotEmpty = function(grp, callback) {
		whichMemberSlotEmptypart1(grp, 1, [], [], false, function(arrOrBoo) {
			console.log(JSON.stringify(arrOrBoo));
			if (arrOrBoo == null) {
				console.log("the group doesnt exist");
				callback(null);
			} else {
				console.log("the group exists");
				callback(arrOrBoo);
			}
		})
	}

	//precondition: the user id not in any group
	//precondition: the group name is valid, so can register
	//post condition: add the group to user info also
		// the name, id1, id2, id3, id4 and id5 r submitted to the database, where a grp with name and id1 is created
		// the rest of the ids send email to ask them confirm their group, then update after confirmation. 
	this.registerGroup = function(name, id1, callback) {
		connection.query("insert into ?? (GROUPNAME, NUSNETSID1) values (?, ?)", [Groupinfo.table, name, id1], function(err, results) {
			if (err) throw err;
			console.log(results);
			connection.query("select * from ?? where NUSNETSID1=?", [Groupinfo.table, id1], function(err, resul) {
				if (err) throw err;
				console.log(resul);
				callback(name, resul[0].GROUPID);
			})
		});
	}


	this.addGroupToUserInfo = function(grpname, id, name, callback) {//related to Group_info
		connectionUser.query("update ?? set GROUPID=? where NUSNETSID=? and USERNAME=?", [Userinfo.table, grpname, id, name], function(err, resul) {
			if (err) throw err;
			console.log("groupname of the user updated.");
			callback(true);
		})
	}

//output to /manageGroup in req.body: 
//{ usergroupID: '1701', usertoken: 'asdfasdf' }

	//precondition: the owner of the id acknowledge by clicking the link on the email and confirming on the confirmation page
	//precondition: the group alr exists
	//precondition: run this together with addGroupToUserInfo to add the groupname into the userinfo table
	this.registerID = function(name, id, callback) { //name is group name!!!
		IfIdAlrAdded(id, function(idd, resul, booo) {
			if(booo == true) {
				console.log("this id has alr been registered in groups with group names " + resul);
				callback(name, id, false);
			} else if (booo == false) {
				console.log("this id hasnt been registered in any group yet.");
				IfGroupIsComplete(name, function(namee, boo) {
					if (boo == false) {
						console.log("incomplete group, can register the next id!");
						connection.query("select * from ?? where GROUPID=?", [Groupinfo.table, name], function(err, results) {
							console.log(results);
							for(var i = 2; i <= 5; i++) {
								console.log(i);
								var str = "NUSNETSID" + i;
								console.log("**************************************");
								console.log(JSON.stringify(results));
								if(results[0][str] == "none") {
									connection.query("update ?? set NUSNETSID" + i + "=? where GROUPID=?", [Groupinfo.table, id, name], function(err, resultss) {
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
						connection.query("select NUSNETSID5 from ?? where GROUPID=?", [Groupinfo.table, name], function(err, results) {
							if(results[0].NUSNETSID5 == null) {
								console.log("one more available id slot in this grp!");
								connection.query("update ?? set NUSNETSID5=? where GROUPID=?", [Groupinfo.table, id, name], function(err, results) {
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

	this.sendUserEmail = function(id, callback) {
		UserSendEmailPart1(id, function(mO) {
			console.log("mO: " + JSON.stringify(mO));
			transporter.sendMail(mO, function(err, info) {
				if (err) {
					console.log(err);
					callback(false);
				} else {
					console.log("???????????" + info);
					callback(true);
				}
			});
		});
	}

	this.sendUserEmailFromReq = function(email, callback) { //used in start a group, to send emails to others members to register or join the group
		UserGetEmailAddFromReq(email, function(mO) {
			console.log("mO: " + JSON.stringify(mO));
			transporter.sendMail(mO, function(err, info) {
				if (err) {
					console.log(err);
					callback(false);
				} else {
					console.log("???????????" + info);
					callback(true);
				}
			});
		});			
	}
}

module.exports = dbGroupandUser;




