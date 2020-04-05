create database weather;
use weather;

create table sensors (
id int not null auto_increment primary key,
T1H double unsigned,
time char(20));

CREATE USER 'integralz'@'localhost' IDENTIFIED BY 'wnstjr12';
GRANT ALL PRIVILEGES ON weather.* TO 'integralz'@'localhost';
FLUSH PRIVILEGES;
