var OpenIDStrategy = require('passport-openid').Strategy;

module.exports = function (passport) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  passport.use(new OpenIDStrategy({
      returnURL: 'http://localhost/auth/openid/return',
      realm: 'http://localhost/',
      profile: true
    },
    function(identifier, profile, done) {
      console.log(JSON.stringify(profile));
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
