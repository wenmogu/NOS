
var db = require('../config/db');
var db_manager = new db();

var db_use = require('../config/db_user');
var db_user = new db_use();

var db_boo = require("../config/db_groupBooking");
var db_book = new db_boo();

isLoggedIn = function (req,res,next) {
  if(req.isAuthenticated()){
    console.log("1111111111((((($$$$$$$$$$$@@@@@@@@@@@@!!!!!!!!!!!!!!----------------------------------------------------------------------");
    console.log(req);
    console.log("2222222222((((($$$$$$$$$$$@@@@@@@@@@@@!!!!!!!!!!!!!!----------------------------------------------------------------------");    
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
                      userGroup:grpname, 
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
        console.log("i m at routing /register-hasUserRegistered, boo==true, this user has registered. Redirecting to viewRegister page.");
        res.redirect("/manageRegister");
      } else if (boo == false) {
        console.log("i m at routing /register-hasUserRegistered, boo==false, this user hasnt registered. Staying on this page and let her register.");
        res.render("register.ejs", {profile:req.user});
      }
    });
  });

  app.post("/viewRegister", isLoggedIn, function(req, res) {
    db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
      if (boo == true) {
        console.log("i m at routing /viewRegister-hasUserRegistered, boo==true, this user has registered. Check if this guy alr has a group.");
        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(id, grpname, booo) {
          if (booo == true) {
            console.log('i m at routing /viewRegister-hasUserRegistered/getUserGroup, booo == true, this guy has a grp. Redirect to viewInfoByName');
            res.redirect('/viewBooking');
          } else if (booo == false) {
            console.log('i m at routing /viewRegister-hasUserRegistered/getUserGroup, booo == false, this guy doesnt have a grp. Register him first. Stay on this page and let him get a group');     
            db_user.addUserToUserInfo(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(bool) {
              if(bool == true) {
                console.log("adding the user.");
                res.redirect('/manageRegister');              
              }
            });
          }
        });
      } else if (boo == false) {
        console.log("i m at routing /viewRegister-hasUserRegistered, boo==false, this user hasnt registered. register him now.");
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
        console.log("i m at routing /manageRegister-hasUserRegistered, boo==true, this user has registered. Check if this guy alr has a group.");
        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(id, grpname, booo) {
          if (booo == true) {
            console.log('i m at routing /manageRegister-hasUserRegistered/getUserGroup, booo == true, this guy has a grp. Redirect to viewInfoByName');
            res.redirect('/viewBooking');
          } else if (booo == false) {
            console.log('i m at routing /manageRegister-hasUserRegistered/getUserGroup, booo == false, this guy doesnt have a grp. ask him to get a group first');     
            res.render('manageRegister.ejs', {profile:req.user});
          }
        });      
      } else if (boo == false) {
        console.log("i m at routing/manageRegister, boo == false, this guy has not registered. redirect him to the register page.");
        res.redirect('/register');
      }
    })
  })

  app.get("/startAGroup", isLoggedIn, function(req, res) {
    //check if this guy is registered first then if is in a grp 
    db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
      if (boo == true) {
        //registered check grp
        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(idd, grp, bool) {
          if (bool == true) {
            //in a group.
            res.redirect('/viewBooking');
          } else {
            db_book.allGroup(function(resul) {
              res.render('startAGroup.ejs', {profile:req.user, groupName:resul});
            });
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
            db_book.allGroup(function(resul) {
              res.render('joinAGroup.ejs', {profile:req.user, groupName:resul});
            });
          }
        });
      } else {
        res.redirect('/register');
      }
    });
  });


  //receive data from startAGroup and joinAGroup
  //if req.body has data from startAGroup, register the group and member1 email, send email to the rest of the members to register;
  //if req.body has data from joinAGroup, register the user into this group.
  app.post('/manageGroup', isLoggedIn, function(req, res) {
          //check if this guy is registered first then if is in a grp 
    db_user.hasUserRegistered(req.user.displayName, req.user.NusNetsID, req.user.emails[0].value, function(name, id, email, boo) {
      if (boo == true) {
        //registered check grp
        db_user.getUserGroup(req.user.displayName, req.user.NusNetsID, function(idd, grp, bool) {
          if (bool == true) {
            //in a group.
            res.redirect('/viewBooking');
          } else {
            db_book.allGroup(function(resul) {
              res.render('manageGroup.ejs', {profile:req.user, groupName:resul});
            });
          }
        });
      } else {
        res.redirect('/register');
      }
    });  
  });





  app.get("/booking", isLoggedIn, function (req,res) { // dont forget to check again if the intended timeslot is alr booked by someone else; if so, redirect back to info. 
    console.log("---------------------------------------------------------------");
    console.log(req.url); //to the booking page, login to book a room
    console.log("---------------------------------------------------------------");
    if(req.url == '/booking') {
      db_manager.emptyRoomNumber(function(result) {
        res.render("bookingForm.ejs", {profile: req.user, rooms:result});
      }); 
    } else {
      var timeslotstart = req.url.split("=")[2];
      var roomnumber = req.url.split("=")[1].split("&")[0];
      console.log("request for " + roomnumber + timeslotstart);
      db_manager.emptyRoomNumber(function (result) {
        res.render("bookingForm.ejs", {profile: req.user, rooms: result, bookedRoom: roomnumber, timeslotstart: timeslotstart, timeslotend: parseInt(timeslotstart) + 2});
      });
    }
  });

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


  app.post("/manageBooking", isLoggedIn, function(req,res) {
    
      db_manager.book(req.user.displayName,req.user.emails[0].value,req.body.roomnumber,function (result) {
      // debugging  console.log(req);
      //console.log(JSON.stringify(req.user));//{"displayName":"","emails":[{"value":""}],"name":{"familyName":"","givenName":""}}
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
      console.log(JSON.stringify(req.body));
      console.log(JSON.stringify(result));
      console.log("****************************************");
      console.log(JSON.stringify(req.user));
      if(result == false) {
        res.redirect('/viewBooking');
      } else {
        res.render("manageBooking.ejs", {profile: req.user, content: req.body, table:result});
      }
    });
  })


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


