var mysql = require("mysql");
// Create a token generator with the default settings:
var randtoken = require('rand-token');





var tokenInfo = {
  host     : 'localhost',
  user     : 'root',
  password : 'LordMushroom2015',
  database : 'nus_db',
  table    : 'ID_TOKEN_EMAIL'
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
  subject: "You're invited to join a group!",
  text: 'TO be updated'
};

//Group_info: NUSNETSID1(first member),NUSNETSID2, NUSNETSID3, NUSNETSID4, NUSNETSID5, GROUPNAME(string), PASSWORD(hashed)
//User_info: NUSNETS ID, NAME, EMAIL, GROUPNAME

var connection = mysql.createConnection(tokenInfo);

function token() {
  createToken = function(id, email, grpid, callback) {
    var token = randtoken.generate(6);
    connection.query("insert into ?? (NUSNETSID, TOKEN, EMAIL, GROUPID) values (?,?,?,?)", [tokenInfo.table, id, token, email, grpid], function(err, resul) {
      console.log("token given successulfully! " + token);
      callback(id, token, email, grpid);
    });
  }

  createTokenForSomePplPart1 = function(inviter, id, email, i, end, grpid, callback) {//arr,arr,0, -1, grpid, callback
    if (end == -1) {
      createTokenForSomePplPart1(inviter, id, email, i, id.length, grpid, callback);
    } else {
      if (i == end) {
        callback(true);
      } else {
        var token = randtoken.generate(6);
        connection.query("insert into ?? (NUSNETSID, TOKEN, EMAIL, GROUPID) values (?,?,?,?)", [tokenInfo.table, id[i], token, email[i], grpid], function(err, resul) {
          console.log("token given successulfully! " + token);
          mailOptions.to = email[i];
          mailOptions.text = "you are invited by "+ inviter + " to join " + grpid + ". Your token for joining is " + token + ". Please go to localhost:/joinAGroup after you logged in.";
          console.log(mailOptions);
          transporter.sendMail(mailOptions, function(err, info) {
            if (err) throw err;
            console.log("mailsent" + info);
          })
          createTokenForSomePplPart1(inviter, id, email, i+1, end, grpid, callback);
        }); 
      }
    }
    
  }
  this.createTokenForSomePpl = function(inviter, idarr, emailarr, grpid, callback) {
    createTokenForSomePplPart1(inviter, idarr, emailarr, 0, -1, grpid, function(boo) {
      callback(boo);
    })
  }
  //output to manageGroup in req.body: { groupname: 'wenxiaoxin',
                                                // member2ID: '1',
                                                // member2email: '1@.com',
                                                // member3ID: '2',
                                                // member3email: '2@.com',
                                                // member4ID: '3',
                                                // member4email: '3@.com',
                                                // member5ID: '',
                                                // member5email: '' }

//output to /manageGroup in req.body: 
// { usergroupID: '1701', usertoken: 'asdfasdf' }

  this.checkIfTokenMatch = function(grpid, nusnetsid, token, callback) {
    connection.query("select * from ?? where GROUPID=? AND NUSNETSID=? AND TOKEN=?", [tokenInfo.table, grpid, nusnetsid, token], function(err, resul) {
      if (resul.length == 0) {
        console.log("check token fail");
        callback(grpid, nusnetsid, token, false);
      } else if (resul.length == 1) {
        console.log("token check pass");
        callback(grpid, nusnetsid, token, true);
      }
    })
  }
}

module.exports = token;
