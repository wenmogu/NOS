isLoggedIn = function (req,res,next) {
  if(req.isAuthenticated()){
  	return next();
  }
  res.redirect('/login');
}
var db = require('../config/db');
var db_manager = new db();

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
  app.get("/info", function (req, res) { // to the general room info page, where you dont need to log in to view 
    db_manager.totalTable(function (result) {
      console.log("###########@@@@@@@@@@@@@@" + typeof(req.user));
      if (JSON.stringify(req.user) == undefined) {
        res.render('info.ejs', { profile: {displayName:"guest"}, table: result});
      } else {
        console.log("sadfsadfsadfsdfsdfsadfasdfasdfsadfs");
        res.render('info.ejs', { profile : req.user, table: result, content: 'login.ejs'});
      }
    });
  })

  app.get("/viewBooking", isLoggedIn, function (req,res) { //to ur personal booking page, where you need to log in to see ur booking
    db_manager.viewInfoByName(req.user.displayName, function (result) {
      //console.log(JSON.stringify(req.user));//{"displayName":"","emails":[{"value":""}],"name":{"familyName":"","givenName":""}}
      res.render('viewInfoByName.ejs', {profile: req.user, table: result});
    });
  });

  app.get("/booking", isLoggedIn, function (req,res) { //to the booking page, login to book a room
    db_manager.emptyRoomNumber(function (result) {
      res.render("bookingForm.ejs", {profile: req.user, rooms: result});
    })
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


