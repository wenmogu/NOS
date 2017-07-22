
var db = require('../config/db');
var db_manager = new db();

var db_use = require('../config/db_user');
var db_user = new db_use();

var db_boo = require("../config/db_groupBooking");
var db_book = new db_boo();

var t = require('../config/token');
var db_token = new t();

//套路：
	// db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
 //      if (boo == true) {
 //        //registered 
 //        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(idd, grp, bool) {
 //          if (bool == true) {
 //            //in a group.
 //            res.redirect('/viewBooking');
 //          } else {
 //          	//not in a group
 //            //res....
 //          }
 //        });
 //      } else {
 //      	//not registered
 //        res.redirect('/register');
 //      }
 //    });

isLoggedIn = function (req,res,next) {
  if(req.isAuthenticated()){
    // console.log("1111111111((((($$$$$$$$$$$@@@@@@@@@@@@!!!!!!!!!!!!!!----------------------------------------------------------------------");
    // console.log(req);
    // console.log("2222222222((((($$$$$$$$$$$@@@@@@@@@@@@!!!!!!!!!!!!!!----------------------------------------------------------------------");    
    db_user.isUserFromRVRC(req.user.NusNetsID, req.user.displayName, function(id, name, boo) {
      if(boo == true) {
        return next();
      } else {
        console.log(name + " is not from RVRC! redirected to login page");
        res.redirect('/login');
      }
    });
  } else {
    res.redirect('/login');
  }
}

module.exports = function (app,passport) {
  app.get('/',function (req,res) {
  	res.render('index.ejs',{ title : "nus test index page"});
  });  
  app.get('/login',function (req,res) {
  	res.render('login.ejs',{ message : req.flash("LOGIN") });
  });
  app.get('/logout', function (req,res) {
  	req.logout();
  	res.redirect('/');
  });

  app.post('/auth/openid', passport.authenticate('openid'));

  app.get('/auth/openid/return',passport.authenticate('openid', 
      { successRedirect: '/viewBooking',
        failureRedirect: '/login' }));

  // routes 

  // app.get("/info", function(req, res) {
  //   db_book.bookedTimeslot(function(resultt) { //resultt is an array of [roomnumber~8, roomnumber~18, ...]
  //     console.log("array: " + resultt);
  //     db_book.allTimeslot(function(result) {
  //       console.log("i m at .info. at allTimeslot.");
  //       if (JSON.stringify(req.user) == undefined) {
  //         res.render('info.ejs', {profile:{displayName:"Guest"}, table:result, userBooking:false, userGroup:null, bookedTimeslot:resultt}); //userBooking is false means User doesnt book anything
  //       } else {
  //         console.log("the user is logged in. Now printing more detailed table to him.");
  //         db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(id, grpname, boo) {
  //           console.log(JSON.stringify(result));
  //           if(boo == false) {
  //             res.render('info.ejs', {profile:req.user, table:result, userBooking:false, userGroup:null, bookedTimeslot:resultt});
  //           } else if(boo == true) {
  //             db_book.hasGroupBookedAny(grpname, function(bool) {
  //               console.log("groupname: " + grpname);
  //               if(bool == false) {
  //                 res.render('info.ejs', {profile:req.user, table:result, userBooking:false, userGroup:grpname, bookedTimeslot:resultt});
  //               } else if(bool == true) {
  //                 res.render('info.ejs', {profile:req.user, table:result, userBooking:true, userGroup:grpname, bookedTimeslot:resultt});
  //               }
  //             });
  //           }
  //         });
  //       }
  //     });
  //   });
  // });

  app.get('/info', function(req, res) {
    db_book.allBookedTimeslotsFor5Days(function(arrBooked) {
      db_book.allTimeslotsFor5Days(function(arrAll) {
        if (JSON.stringify(req.user) == undefined) {
          //info.ejs
          res.render('info.ejs', 
                      {profile:{displayName:"Guest"}, 
                      allTimeslots: arrAll, 
                      userBooking:[false,false,false,false,false], 
                      userGroup:null, 
                      bookedTimeslot:arrBooked}
          );
        } else {
          //check if the user has a grp or what to make sure the group's booking state
          db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(id, grpid, boo) {
            if (boo == false) {
              //doesnt hv a group
              //info.ejs
              res.render('info.ejs', 
                      {profile:req.user, 
                      allTimeslots: arrAll, 
                      userBooking:[false,false,false,false,false],
                      userGroup:null, 
                      bookedTimeslot:arrBooked}
              );
            } else {
              //has a group, check if the group made any booking. 
              db_book.hasGroupBookedAnyFor5Days(grpid, function(arrOfBoo) {
                //info.ejs
                res.render('info.ejs', 
                      {profile:req.user, 
                      allTimeslots: arrAll, 
                      userBooking:arrOfBoo, 
                      userGroup:grpid, 
                      bookedTimeslot:arrBooked}
                );
              })
            }
          })
        }
      })
    })
  })

  
  // app.get("/viewBooking", isLoggedIn, function(req, res) {
  //   db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(nname, iid, eemail, bboo) {
  //     if (bboo == true) {
  //       //registered. check if in a group
  //       db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(id, grp, boo) {
  //         if (boo == false) {
  //           console.log("i m at viewBooking routing/getUserGroup. This guy does not have a group.");
  //           res.redirect("/manageRegister");
  //         } else if (boo == true) {
  //           console.log("i m at viewBooking routing/getUserGroup. This guy is in a group.");
  //           console.log("printing the booking info by this guy's group");
  //           db_book.groupBookingState(grp, function(resul, boo) { //resul is the booking schedule for today and the next 5 days.
  //             if (boo == false) {
  //               console.log("i m at viewBooking routing/getUserGroup/groupBookingState. This guy's group did not make any booking. ");
  //               res.render('viewInfoByName.ejs', {profile:req.user, groupHasMadeBooking:false, table:[], groupName:grp});
  //             } else if (boo == true) {
  //               console.log("i m at viewBooking routing/getUserGroup/groupBookingState. This guy's group has made a booking. ");
  //               res.render('viewInfoByName.ejs', {profile:req.user, groupHasMadeBooking: true, table:resul, groupName:grp});
  //             }
  //           });
  //         }
  //       });
  //     } else {
  //       //havnt registed. register first.
  //       res.redirect('/register');
  //     }
  //   })

  // });

  app.get('/viewBooking', isLoggedIn, function(req, res) {
    db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
      if (boo == true) {
        //user is registered, check if in a group
        db_user.getUserGroup(name, id, function(idd, resul, bool) {
          if (bool == true) {
            //user in a group, check if group is complete
            db_user.IfGroupComplete(resul, function(grpid, booln) {
              if (booln == true) {
                //group is complete, allow viewing group booking schedule
                db_book.groupBookingStateFor5Days(grpid, function(schedule) {
                  res.render("viewInfoByName.ejs", 
                              {profile:req.user,
                                groupID:grpid,
                               schedule:schedule}
  // [["2017-7-20"],
  // ["2017-7-21"],
  // ["2017-7-22"],
  // ["2017-7-23",{"GROUPNAME":"moguempire","ROOMNUMBER":"103","DATE":"2017-07-22T16:00:00.000Z","SLOTSTART":"08:00:00","SLOTEND":"10:00:00","DECISIONTIME":"2017-07-20T01:53:54.000Z"}],
  // ["2017-7-24"]]
                  );
                })
              } else {
                //group is incomplete, redirect to manageRegister to ask invite member
                res.redirect('/manageRegister');
              }
            })
          } else {
            //user not in a group, redirect to manageRegister to let him choose to start a group or join a group
            res.redirect('/manageRegister');
          }
        })
      } else {
        //user is not registered, redirect to register
        res.redirect('/register');
      }
    })
  })

  app.get("/register", isLoggedIn, function(req, res) {
    db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
      if (boo == true) {
        res.redirect("/manageRegister");
      } else if (boo == false) {
        res.render("register.ejs", {profile:req.user});
      }
    });
  });

  app.post("/viewRegister", isLoggedIn, function(req, res) {
    db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
      if (boo == true) {
        //user is registered. check if the user has a group
        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(id, grpname, booo) {
          if (booo == true) { //user has a group
            res.redirect('/viewBooking');
          } else if (booo == false) { //user doesnt have a group
            res.redirect('/manageRegister'); 
          }
        });
      } else if (boo == false) {//user is not registered. Register him into the system
        db_user.addUserToUserInfo(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(namme, idd, emaill, booll) {
            console.log("adding user--booll == " + booll);
            res.redirect('/manageRegister');
        });
      }
    });
  });

  app.get('/manageRegister', isLoggedIn, function(req, res) {
    db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
      if (boo == true) {
        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(id, grpid, booo) {
          if (booo == true) {
            db_user.whichMemberSlotEmpty(grpid, function(arrOrNull) {
            	if(arrOrNull.length == 0) {
            		//group full. no one can add in anymore.
            		res.render('manageRegister.ejs', 
                           {profile:req.user, 
                            groupID:grpid, 
                            inviteButton:false, 
                            dismissButton:true,
                            JoinButton:false,
                            StartButton:false});
            	} else if (arrOrNull.length > 0) {
            		//group not full. can add in more
            		res.render('manageRegister.ejs', 
                           {profile:req.user, 
                            groupID:grpid, 
                            inviteButton:true, 
                            dismissButton:true,
                            JoinButton:false,
                            StartButton:false});
            	} 
            })
          } else if (booo == false) {
            //doesnt have a group
            res.render('manageRegister.ejs', 
                       {profile:req.user,
                        groupID:false,
                        inviteButton:false,
                        dismissButton:false,
                        JoinButton:true,
                        StartButton:true});
          }
        });      
      } else if (boo == false) {
        res.redirect('/register');
      }
    })
  })

  app.get("/startAGroup", isLoggedIn, function(req, res) {
    //check if this guy is registered first then if is in a grp 
    db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
      if (boo == true) {
        //registered check grp
        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(idd, grp, booo) {
          if (booo == true) {
            //in a group.
            res.redirect('/viewBooking');
            db_user.IfGroupComplete(grpid, function(groupid, bool) {
              if (bool == true) {
                //group is complete, direct to viewBooking
                res.redirect('/viewBooking');
              } else {
                //group is incomplete. stay on this page.
                //redirect to manageRegister
                res.redirect('/manageRegister'); 
              }
            });
          } else if (booo == false) {
            //doesnt have a group
            res.render('startAGroup.ejs', 
                       {profile:req.user,
                        groupID:false});
            //output to manageGroup in req.body: { groupname: 'wenxiaoxin',
                                                // member2ID: '1',
                                                // member2email: '1@.com',
                                                // member3ID: '2',
                                                // member3email: '2@.com',
                                                // member4ID: '3',
                                                // member4email: '3@.com',
                                                // member5ID: '',
                                                // member5email: '' }
          }
        });
      } else {
        res.redirect('/register');
      }
    });
  });

  app.get("/joinAGroup", isLoggedIn, function(req, res) {
        //check if this guy is registered first then if is in a grp 
    db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
      if (boo == true) {
        //registered check grp
        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(idd, grp, bool) {
          if (bool == true) {
            //in a group.
            res.redirect('/viewBooking');
          } else {
            //not in a group
            res.render('joinAGroup.ejs', {profile:req.user});
            //output to /manageGroup in req.body: { usergroupID: '1701', usertoken: 'asdfasdf' }
          }
        });
      } else {
        res.redirect('/register');
      }
    });
  });


  //receive data from startAGroup and joinAGroup
  //if it's start group, add userID, grpID, token to a table, send email;
  //if it's join group, check if its in table, if it is, add into the group, delete from the table. 
  app.post('/manageGroup', isLoggedIn, function(req, res) {
          //check if this guy is registered first then if is in a grp 
    db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
      if (boo == true) {
        //registered 
        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(idd, grp, bool) {
          if (bool == true) {
            //in a group.
            res.redirect('/viewBooking');
          } else {
          	//not in a group
            //res...
            if (req.body.usergroupID == undefined) {
            	//data come from startAGroup
            	//add the req.user into group_info, generate a GroupID, and give her the groupID.
            	db_user.registerGroup(req.body.groupname, req.user.NusNetsID, function(grpname, grpid) {
            		//pass out grpname and grpid, used in render
            		//now generate token and send email to the rest of them
            		if (req.body.member5ID == "") {
            			//ignore 5th member
            			db_token.createTokenForSomePpl(req.user.displayName, 
            									   [req.body.member2ID, req.body.member3ID, req.body.member4ID],
            									   [req.body.member2email, req.body.member3email, req.body.member4email],
            									   grpid,
            									   function(boo) {
            									   	if(boo == true) {
            									   		res.render('manageGroup.ejs', 
            									   				   {profile:req.user, 
            									   				   	notified:true, 
            									   				   	mailList:[req.body.member2email, req.body.member3email, req.body.member4email]
            									   				   });
            									   	}
            									   });
            		} else {
            			//send email also to the 5th member
            			db_token.createTokenForSomePpl(req.user.displayName,
            									   [req.body.member2ID, req.body.member3ID, req.body.member4ID, req.body.member5ID],
            									   [req.body.member2email, req.body.member3email, req.body.member4email, req.body.member5email],
            									   grpid,
            									   function(boo) {
            									   	if(boo == true) {
            									   		res.render('manageGroup.ejs', 
            									   					{profile:req.user, 
            									   					notified:true,
            									   					mailList:[req.body.member2email, req.body.member3email, req.body.member4email, req.body.member5email]
            									   					});
            									   	}
            									   });
            		}
            	});
            } else {
            	//data come from joinAGroup
            	//authenticate first
            	db_token.checkIfTokenMatch(usergroupID, req.user.NusNetsID, usertoken, function(grupid, netsid, token, boolin) {
            		if (boolin == true) {
            			//pass token check. add to groupinfo and userinfo
            			db_user.registerID(grupid, netsid, function(gid, nid, bullin) {
            				if (bullin == false) {
            					//either group is full or this id is alr registered. ask them to check with their fren or contact admin. 
            					//give the email of the member 1 of this grpid
            					db_user.getGroupLeader(grupid, function(leaderid, leadername, leaderemail) {
            						res.render('manageGroup.ejs', {profile:req.user,
            													   groupID:gid,
            													   contactID: leaderid,
            													   contactName: leadername,
            													   contactEmail: leaderemail});
            					})
            				} else if (bullin == true) {
            					//registered! add into userinfo, render success. 
            					db_user.addGroupToUserInfo(gid, req.user.NusNetsID, req.user.displayName, function(bub) {
            						console.log(bub);
            						res.render('manageGroup.ejs', {profile:req.user, groupID:gid, groupExist:true, added:true});
            					})
            				} else if (bullin == null) {
            					//group does not exist. probably alr dismissed. 
            					//rener failure
            					res.render('manageGroup.ejs', {profile:req.user, groupID:gid, groupExist:false, added:false});
            				}
            			})
            		} else {
            			//fail token check. render page indicate failure
            			res.render('manageGroup.ejs', {profile:req.user, groupID:gid, tokenFailure:true});
            		}
            	})
            }
          }
        });
      } else {
      	//not registered
        res.redirect('/register');
      }
    });  
  });

/*---------BOOKING AND CANCELLING FEATURES---------------------------------------------------------------------------*/

  app.get("/booking", isLoggedIn, function(req,res) {
  	///booking?room=101&timeslotstart=18&date=Tue%20Jul%2025%202017%2000:00:00%20GMT+0800%20(Malay%20Peninsula%20Standard%20Time)
  	if (req.url == "/booking") {
  		res.redirect('/info');
  	} else {
  		var roomnumber = req.url.split("&")[0].split('=')[1];
  		var timeslotstart = req.url.split("&")[1].split('=')[1];
  		var datestr = req.url.split("&")[2].split('=')[1].split('%20').slice(0,4).join(" ");
  		var timeslot = timeslotstart + "TO" + (parseInt(timeslotstart) + 2);
  		console.log(roomnumber);
  		console.log(timeslotstart);
  		console.log(datestr);
  		console.log(timeslot);
	  	db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
	      if (boo == true) {
	        //registered 
	        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(idd, grp, bool) {
	          if (bool == true) {
	            //in a group. check if the group is complete
	            db_user.IfGroupComplete(grp, function(grpid, bu) {
	            	if (bu == true) {
	            		//group is complete
	            		res.render('bookingForm.ejs', {profile:req.user, groupID:grpid, roomnumber:roomnumber, date: datestr, timeslot:timeslot})
	            	} else if (bu == false) {
	            		//group is incomplete
	            		res.redirect('/manageRegister');
	            	} else if (bu == null) {
	            		//group does not exist
	            		res.redirect('/manageRegister');
	            	}
	            })
	          } else {
	          	//not in a group
	            res.redirect('/manageRegister');
	          }
	        });
	      } else {
	      	//not registered
	        res.redirect('/register');
	      }
	    });
  	}
  })


//22号就写到这里啦，这里以上的ejs都写过了，下面的都还没有写
  app.post('/manageBooking', isLoggedIn, function(req,res) {
  	db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
      if (boo == true) {
        //registered 
        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(idd, grp, bool) {
          if (bool == true) {
            //in a group.
            db_user.IfGroupComplete(grp, function(grpid, bu) {
	            	if (bu == true) {
	            		//group is complete
	            		console.log("headerrrrrrrrrrrrrrrrrrrrrr");
	            		console.log(req.headers.referer); //http://localhost/booking?room=103&timeslotstart=10&date=Sun%20Jul%2023%202017%2000:00:00%20GMT+0800%20(Malay%20Peninsula%20Standard%20Time)
	            		var roomnumber = req.headers.referer.split("&")[0].split('=')[1];
				  		var timeslotstart = req.headers.referer.split("&")[1].split('=')[1];
				  		var datestr = req.headers.referer.split("&")[2].split('=')[1].split('%20').slice(0,4).join(" ");
				  		var timeslot = timeslotstart + "TO" + (parseInt(timeslotstart) + 2);
				  		console.log(roomnumber);
				  		console.log(timeslotstart);
				  		console.log(datestr);
				  		console.log(timeslot);
				  		db_book.dateFormatFromReq(datestr, function(strWithSpace) {
	            			db_book.groupBook(grpid, strWithSpace, roomnumber, timeslot, function(bulin) {
	            				if (bulin == true) {
	            					//booking made
	            					res.render('manageBooking.ejs', {profile:req.user, groupID:grpid, roomnumber:roomnumber, date: datestr, timeslot:timeslot});
	            					//and send emails to everyone in the group
/*trouble!!!!! solve groupBookNotify at db_groupBooking line 521, problem: obtainAllMemberEmailIter*/
	            					db_book.groupBookNotify(grpid, roomnumber, timeslot, datestr);
	            				}
	            			})
	            		})
	            	} else if (bu == false) {
	            		//group is incomplete
	            		res.redirect('/manageRegister');
	            	} else if (bu == null) {
	            		//group does not exist
	            		res.redirect('/manageRegister');
	            	}
	        })
          } else {
          	//not in a group
            res.redirect('/manageRegister');
          }
        });
      } else {
      	//not registered
        res.redirect('/register');
      }
    });	
  })

  //for manage Booking
				


  app.get("/cancelBookingConfirm", isLoggedIn, function (req,res) { //to the booking page, login to book a room
    db_manager.bookedRoomNumber(req.user.displayName, req.user.emails[0].value, function (result) {
      res.render("cancelBookingConfirm.ejs", {profile: req.user, rooms:result});
    })
  });


  app.post("/cancelBooking", isLoggedIn, function (req,res) { //to the booking page, login to book a room
    db_manager.cancel(req.user.displayName, req.user.emails[0].value, req.body.roomnumber, function (result) { //cancel?
      //res.render("cancelBookingConfirm.ejs", {profile: req.user, rooms: result});
      res.redirect("/viewBooking");
    }) 
  });



  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });	
}


