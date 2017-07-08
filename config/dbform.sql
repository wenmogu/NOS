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
create table Room_101_record (
	ROOMNUMBER varchar(225) not null,
	GROUPNAME varchar(225),
	STATUS int not null default 0,
	SLOTSTART time not null,
	SLOTEND time not null,
	primary key(ROOMNUMBER)
}

A list of all_group_info
create table Group_info (
	GROUPNAME varchar(225) not null,
	NUSNETSID1 varchar(225) not null default 'none',
	NUSNETSID2 varchar(225) not null default 'none',
	NUSNETSID3 varchar(225) not null default 'none',
	NUSNETSID4 varchar(225) not null default 'none',
	NUSNETSID5 varchar(225),
	-- PASSWORD varchar(225) not null,
	primary key(GROUPNAME)
);

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
	ROOMNUMBER varchar(225) not null,
	SLOTSTART time not null,
	SLOTEND time not null,
	DECISIONTIME timestamp not null default current_timestamp on update current_timestamp,
	primary key (GROUPNAME)
);


-- load 
load data local infile "./table2.txt" into table User_info(USERNAME,NUSNETSID,GROUPNAME,EMAIL);  
--insert
insert into accommodation (Id,RoomNumber,Status) values (1,"101",0);
--update
update accommodation set Name="Wen Xin" where Id=1;

insert into User_info (USERNAME, NUSNETSID, GROUPNAME, EMAIL) values ("WEN XIN", "e0052753", "moguexpire", "e0052753@u.nus.edu");
insert into Group_info (GROUPNAME, NUSNETSID1) values ("moguempire", "e0052753");
ALTER TABLE Persons
ALTER COLUMN City SET DEFAULT 'SANDNES'
--Id auto increment
--RoomNumber e.g. 101
--Name Wen Xin
--Email 
--Status 0 vacant 1 booked 2 maintaining
--timestamp