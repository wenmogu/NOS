var mysql = require("mysql");



var info = {
  host     : 'localhost',
  user     : 'root',
  password : 'LordMushroom2015',
  database : 'nus_db',
  table    : 'accommodation'

};

var connection = mysql.createConnection(info);


function databaseModify() {
  isEmpty = function (Room,callback) {
    ///connection.query(util.format('select Status from %s where RoomNumber=%s',info.table,Room), function (error, results, fields) {
    connection.query('select ?? from ?? where RoomNumber=?',["Status", info.table,Room], function (error, results, fields) {
  	  if (error) throw error; 
      console.log("^^^^^^^^^^^^^^^^^^66" +  results);
      callback(results);
    });
  }

    //below is a version that returns undefined instead of true/false => we need to callback
    // this.isEmpty = function (Room) {
    // ///connection.query(util.format('select Status from %s where RoomNumber=%s',info.table,Room), function (error, results, fields) {
    // connection.query('select ?? from ?? where RoomNumber=?',["Status", info.table,Room], function (error, results, fields) {
    //   if (error) {
    //     throw error; 
    //   } else {
    //     console.log("isEmpty working normally: " +  JSON.stringify(results));
    //     console.log("isEnpth: " + (results[0].Status == 0) );
    //     return results[0].Status == 0;
    //   }
      
    // });
  

  nvrBookedBefore = function (Name, callback) {
    connection.query('select * from ?? where Name=?', [info.table, Name], function (error, results, fields) {
      if (error) {
        console.log("error in nvrBookedBefore");
        throw error;
      } else {
        console.log("##################" + JSON.stringify(results));
        var leng = results.length;
        if(leng > 1) {
          var Roomnumbers = "";
                    for (var i = 0; i < leng; i++) {
            Roomnumbers += results[i].RoomNumber + " "
          }
          var msg = "Warning! Multiple Booking! " + Name + " have booked Room " + Roomnumbers;
          console.log(msg);
          results[leng] = {msg: msg};
          callback(false, results);
        } else if (leng == 1) {
          var msg = Name + "has already booked Room " + results[0].RoomNumber;
          console.log(msg);
          results[leng] = {msg: msg};
          callback(false, results);
        } else {
          callback(true, results);
        }
      }
    })
  }



  this.viewInfoByName = function (name,callback) {
    //connection.query(util.format('select * from %s where Name=%s', info.table, name), function (error, results, fields) {
  	connection.query('select * from ?? where Name=?',[info.table,name], function (error, results, fields) {  
      if (error) throw error; 
      console.log(results); 
      callback(results);
    });
  }
  this.totalTable = function (callback) {
    //connection.query(util.format('select * from %s',info.table), function (error, results, fields) {
    connection.query('select * from ??',[info.table], function (error, results, fields) {  
  	  if (error) throw error; 
      console.log(results);
      callback(results);
    });
  }

  this.totalNumber = function (callback) {
    //connection.query(util.format('select count(*) from %s',info.table), function (error, results, fields) {
    connection.query('select count(*) from ??',[info.table], function (error, results, fields) {  
  	  if (error) throw error; 
      console.log(results);
      callback(results);
    });
  }

  this.emptyRoomNumber = function (callback) {
    //connection.query(util.format('select count(*) from %s where Status = 0',info.table), function (error, results, fields) {
    connection.query('select ?? from ?? where Status = 0',["RoomNumber",info.table], function (error, results, fields) {  
  	  if (error) throw error; 
      console.log(results);
      callback(results);
    });
  }

  this.bookedRoomNumber = function (Name, email, callback) {
    connection.query('select RoomNumber from ?? where Name = ? AND Email = ?',[info.table, Name, email], function (error, results, fields) {  
      if (error) throw error; 
      console.log(results);
      callback(results);
    });
  }



  this.book = function (name, email, Room, callback) {
    isEmpty(Room, function(result) {
      if(result[0].Status == 0) {
        nvrBookedBefore(name, function(boo, resultt) {
            if(boo == true) {
              console.log("both pass");
              connection.query('update ?? set Status = 1 where RoomNumber=?',[info.table,Room], function (error, results, fields) {  
                if (error) throw error; 
                console.log(results);  
                });
                //Email
                //connection.query(util.format('update %s set Email="%s" where RoomNumber="%s"',info.table,email,Room), function (error, results, fields) {
                connection.query('update ?? set Email=? where RoomNumber=?',[info.table,email,Room], function (error, results, fields) {
                if (error) throw error; 
                console.log(results);  
                });
                //Name
                //connection.query(util.format('update %s set Name="%s" where RoomNumber="%s"',info.table,name,Room), function (error, results, fields) {
                connection.query('update ?? set Name=? where RoomNumber=?',[info.table,name,Room], function (error, results, fields) {
                if (error) throw error; 
                console.log(results);
                });      
                callback(true);
            } else {
              console.log("nvrBookedBefore fails");
              callback(false);
            }
        });
      } else {
        console.log("isEmpty fails");
        callback(false);
      }
    });
  };

  



  this.cancel = function (name, email, Room, callback) {

    isEmpty(Room, function(result) {
      console.log('$$$$$$$$$$$$' + JSON.stringify(result));
      if (result.length == 0) {
        console.log("result is undefined");
        callback(false);
      } else if(result[0].Status == 1) {
        nvrBookedBefore(name, function(boo, resultt) {
          if(boo == true) {
            console.log("you cannt cancel booking");
            callback(false);
          } else {
            console.log("can cancel");
            connection.query('update ?? set Status=0 where RoomNumber=?',[info.table,Room], function (error, results, fields) {
            if (error) throw error; 
            console.log(results);  
            });
            //Email
            //connection.query(util.format('update %s set Email=NULL where RoomNumber="%s"',info.table,Room), function (error, results, fields) {
            connection.query('update ?? set Email=NULL where RoomNumber=?',[info.table,Room], function (error, results, fields) {
            if (error) throw error; 
            console.log(results);  
            });
            //Name
            //connection.query(util.format('update %s set Name=NULL where RoomNumber="%s"',info.table,Room), function (error, results, fields) {
            connection.query('update ?? set Name=NULL where RoomNumber=?',[info.table,Room], function (error, results, fields) {
            if (error) throw error; 
            console.log(results);  
            });
            callback(true);
          }
        });
      } else {
        console.log("you didnt even book this room lol");
        callback(false);
      }
    });
  }

}

module.exports = databaseModify;