var OpenIDStrategy = require('passport-openid').Strategy;
//var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  /*
  passport.use('login', new LocalStrategy({
    passReqToCallback: true
  }, function(req, username, password, done) {
    process.nextTick(function() {
      connection.
      })
    });
  }));
  */
  passport.use(new OpenIDStrategy({
      returnURL: 'http://localhost/auth/openid/return',
      realm: 'http://localhost/',
      profile: true
    },
    function(identifier, profile, done) {
      console.log("profile: " + JSON.stringify(profile)); //{"displayName":"Wen Xin","emails":[{"value":"e0052753@u.nus.edu"}],"name":{"familyName":"","givenName":""}}
      console.log("identifier: " + identifier); //https://openid.nus.edu.sg/e0052753
      profile.NusNetsID = identifier.split("/")[3];
      return done(null, profile);
    // #for further usage
    // User.findOrCreate({ openId: identifier }, function(err, user) {
    //    var usero = new User();
    //    usero.email = profile.email,
    //    usero.nickname = profile.nickname;
    //    done(err, usero);
    //  });
    }
  ));
}


