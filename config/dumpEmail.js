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

function DumpAndEmail() {
	/*this need change to linux version*/
	this.csvGet = function(path,database,table,user,password) {
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
	//csvGet("C:\\abc","nus_db","accommodation","root","19940215")
	this.sendAttachment = function(email,path,timeschedule) {
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
//main("mcshuo@vip.qq.com","c:\\abc\\accommodation.txt")
}


module.exports = main;