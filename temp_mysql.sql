create database temperature;
use temperature;

create table sensors (
no int not null auto_increment primary key,
temperature_value double unsigned,
device_id int unsigned,
sequence_number int unsigned,
time char(20));

CREATE USER 'integralz'@'localhost' IDENTIFIED BY 'wnstjr12';
GRANT ALL PRIVILEGES ON temperature.* TO 'integralz'@'localhost';
FLUSH PRIVILEGES;
