create table accommodation(
	Id int not null auto_increment,
	RoomNumber varchar(255) not null,
	Name varchar(255),
	Email varchar(255),
	Status int not null,
	TimeModified timestamp not null default current_timestamp on update current_timestamp,
	primary key (Id,RoomNumber)
);

User_info -> Group_info
			  -> Group_record
Room record being independent

A list of a single room record of the day
create table Room_record (
	DATEOFTABLE date() not null default CURDATE(),
	ROOMNUMBER varchar(225) not null,
	8TO10 varchar(225) not null default 'NONE',
	10TO12 varchar(225) not null default 'NONE',
	12TO14 varchar(225) not null default 'NONE',
	14TO16 varchar(225) not null default 'NONE',
	16TO18 varchar(225) not null default 'NONE',
	18TO20 varchar(225) not null default 'NONE',
	20TO22 varchar(225) not null default 'NONE',
	primary key(ROOMNUMBER)
)

A list of all_group_info
create table Group_info (
	GROUPID int not null auto_increment,
	GROUPNAME varchar(225) not null,
	NUSNETSID1 varchar(225) not null default 'none',
	NUSNETSID2 varchar(225) not null default 'none',
	NUSNETSID3 varchar(225) not null default 'none',
	NUSNETSID4 varchar(225) not null default 'none',
	NUSNETSID5 varchar(225),
	-- PASSWORD varchar(225) not null,
	primary key(GROUPID)
);
alter table Group_info auto_increment=1701;

A list of all_user_info
create table User_info (
	USERNAME varchar(225) not null,
	NUSNETSID varchar(225) not null,
	GROUPNAME varchar(225),
	EMAIL varchar(225) not null,
	primary key(NUSNETSID)
);

A list recording all the decisions in a day
create table Group_record (
	GROUPNAME varchar(225) not null,
	DECISION varchar(225) not null, 
	DATE date not null,
	ROOMNUMBER varchar(225) not null,
	SLOTSTART time not null,
	SLOTEND time not null,
	DECISIONTIME datetime not null default NOW()
);
insert into Group_record (GROUPNAME, DECISION, DATE, ROOMNUMBER, SLOTSTART, SLOTEND) values ("moguempireee", "BOOK", '2017-3-23', '101', '100000', '120000');

A list of all the booking decisions.
create table Book_state (
	GROUPNAME varchar(225) not null,
	ROOMNUMBER varchar(225) not null,
	DATE date not null,
	SLOTSTART time not null,
	SLOTEND time not null,
	DECISIONTIME datetime not null default NOW()
)

insert into Book_state (GROUPNAME, ROOMNUMBER, DATE, SlOTSTART, SLOTEND) values ("moguempire", "101", "2017-04-14", 80000, 100000);

create table RVRC_User (
	NUSNETSID varchar(225) not null,
	NAME varchar(225) not null,
	primary key(NUSNETSID)
)


create table Room_record1 ( 
			ROOMNUMBER varchar(225) not null,
			8TO10 varchar(225) not null default "NONE",
			10TO12 varchar(225) not null default "NONE",
			12TO14 varchar(225) not null default "NONE",
			14TO16 varchar(225) not null default "NONE",
			16TO18 varchar(225) not null default "NONE",
			18TO20 varchar(225) not null default "NONE",
			20TO22 varchar(225) not null default "NONE",
			CREATETIME datetime not null default NOW(),
			primary key(ROOMNUMBER)
			);

-- decision: either "cancel" or "book"
create table Room_record_Fri_Jul_21_2017 (
	ROOMNUMBER varchar(225) not null,
	8TO10 varchar(225) not null default "NONE",
	10TO12 varchar(225) not null default "NONE",
	12TO14 varchar(225) not null default "NONE",
	14TO16 varchar(225) not null default "NONE",
	16TO18 varchar(225) not null default "NONE",
	18TO20 varchar(225) not null default "NONE",
	20TO22 varchar(225) not null default "NONE",
	DATEOFTABLE datetime not null default NOW(),
	primary key (ROOMNUMBER)
);
-- create table Room_record-Fri-Jul-21-2017 (ROOMNUMBER varchar(225) not null,8TO10 varchar(225) not null default "NONE",10TO12 varchar(225) not null default "NONE",12TO14 varchar(225) not null default "NONE",14TO16 varchar(225) not null default "NONE",16TO18 varchar(225) not null default "NONE",18TO20 varchar(225) not null default "NONE",20TO22 varchar(225) not null default "NONE",DATEOFTABLE datetime not null default NOW(),primary key (ROOMNUMBER))
-- load 
load data local infile "./table2.txt" into table User_info(USERNAME,NUSNETSID,GROUPNAME,EMAIL);  
--insert
insert into accommodation (Id,RoomNumber,Status) values (1,"101",0);
--update
update accommodation set Name="Wen Xin" where Id=1;

insert into User_info (USERNAME, NUSNETSID, GROUPNAME, EMAIL) values ("XU YIQING", "e0052755", "1338", "e0052755@u.nus.edu");
insert into Group_info (GROUPNAME, NUSNETSID1) values ("moguempire", "e0052753");
insert into Group_record (GROUPNAME, DECISION, ROOMNUMBER, SLOTSTART, SLOTEND) values ("moguempireee", "BOOK", "101", '100000', '120000');
insert into Book_state (GROUPNAME, ROOMNUMBER, SLOTSTART, SLOTEND) values ("moguempireee", "101", '100000', '120000');
insert into Room_record1 (ROOMNUMBER) values ("101");
Update Room_record1 set CREATETIME = DATE_ADD(CREATETIME, interval 5 day);

insert into RVRC_User (NUSNETSID, NAME) values ("e0032334", "YAP JIT WU");
insert into User_info (USERNAME, NUSNETSID, GROUPNAME, EMAIL) values ("YAP JIT WU", "e0032334", "moguempireee", "e0032334@u.nus.edu");
insert into Group_info (GROUPNAME, NUSNETSID1, NUSNETSID2, NUSNETSID3, NUSNETSID4) values ("moguempire", "e0032334", "a", "b", "c");
-- YAP JIT WU is a registered user in a group 
ALTER TABLE Persons
ALTER COLUMN City SET DEFAULT 'SANDNES'

--Id auto increment
--RoomNumber e.g. 101
--Name Wen Xin
--Email 
--Status 0 vacant 1 booked 2 maintaining
--timestamp

