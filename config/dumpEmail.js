const schedule = require('node-schedule');
const { spawn } = require('child_process');
const { format } = require('util');
const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'jlinswenmogu@gmail.com',
		pass: '*'
	}
});

var timeSchedule = "42 * * * * *"; 

var mailOptions = {
	from: 'jlinswenmogu@gmail.com',
	to: "to be updated",
	subject: "punishment for ignoring me",
	text: '!!!',
	attachments:[
		{
			filename:'',
			path:''
		}
	]
};

function main() {
	/*this need change to linux version*/
	csvGet = function(path,database,table,user,password) {
		const bat = spawn('cmd.exe', ['/c', 'mysqldump','-T',path,database,table,format('--user=%s',user),format('--password=%s',password),'--fields-enclosed-by=\\"','--fields-terminated-by=\\,']);
		bat.stdout.on('data', function(data){
			console.log("stdout: ${data}");
		});

		bat.stderr.on('data', function(data){
			console.log("stderr: ${data}");
		});

		bat.on('close', function(code){
			console.log("child process exited with code ${code}");
		});

	}

	dateStringForSomeDay = function(int, callback) {//for testing purpose
		var date = new Date();
		var time = date.getTime();
		date.setTime(time + 86400000 * int);
		var str = ("_" + date.toDateString()).replace(/ /g, "_");
		callback(str);
	}

	scheduleExportRoomRecordOfYersterday = function(path, db, user, password, timeschedule, callback) {
		dateStringForSomeDay(-1, function(str) {
			console.log(str);
			var j = schedule.scheduleJob(timeschedule, function() {
				csvGet(path, db, "Room_record" + str, user, password);
				callback(path + "\\" + "Room_record" + str + ".txt");
			});	
		});
	}

	//csvGet("C:\\abc","nus_db","accommodation","root","19940215")
	sendAttachment = function(email,path,timeschedule) {
		console.log("main start");
		var j = schedule.scheduleJob(timeschedule, function(){
			console.log("schedule start");
			console.log("");
			mailOptions.to = email;
			var array = path.split("\\");
			console.log(array);
			mailOptions.attachments[0].filename = array[array.length-1];
			mailOptions.attachments[0].path = path
			console.log(mailOptions);
			transporter.sendMail(mailOptions, function(err, info) {
				if (err) {
					console.log(err);
				} else {
					console.log("mailsent" + info);
				}
			});
		});
	}

	this.sendRoomRecordOfYesterday = function(path, db, user, password, timescheduleExport, timescheduleSend) {
		scheduleExportRoomRecordOfYersterday(path, db, user, password, timescheduleExport, function(filename) {
			sendAttachment('e0052753@u.nus.edu', filename, timescheduleSend);
		});
	}
//main("mcshuo@vip.qq.com","c:\\abc\\accommodation.txt")
}


module.exports = main;