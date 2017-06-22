create table accommodation(
	Id int not null auto_increment,
	RoomNumber varchar(255) not null,
	Name varchar(255),
	Email varchar(255),
	Status int not null,
	TimeModified timestamp not null default current_timestamp on update current_timestamp,
	primary key (Id,RoomNumber)
);

-- load 
load data local infile "./table.txt" into table accommodation(RoomNumber,Name,Email,Status);  
--insert
insert into accommodation (Id,RoomNumber,Status) values (1,"101",0);
--update
update accommodation set Name="Wen Xin" where Id=1;

--Id auto increment
--RoomNumber e.g. 101
--Name Wen Xin
--Email 
--Status 0 vacant 1 booked 2 maintaining
--timestamp