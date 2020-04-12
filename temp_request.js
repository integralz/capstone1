var request = require('request');  
var express = require('express'); 
var app = express(); 
const bodyParser = require('body-parser');
const port = 8080;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
 
mysql = require('mysql'); 
 var connection = mysql.createConnection({ 
     host: 'localhost', 
     user: 'integralz', 
     password: 'wnstjr12', 
     database: 'temperature' 
 }) 
 connection.connect(); 
 
 
 function insert_sensor(device_id,temperature_value, sequence_number, date) {
	obj = {}; 
	obj.device_id = device_id;
	obj.temperature_value = temperature_value;
	obj.sequence_number = sequence_number
	obj.time = date;
	var query = connection.query('insert into sensors set ?', obj, function(err, rows, cols) { 
	if (err) throw err; 
	console.log("database insertion ok= %j", obj); 
   }); 
 } 
 app.get('/*?', function(req, res) {
		var par = "undefined";
		var i = 0;
		
        var mes = '{\"device_id\":\"';
		mes += req.param('device_id');
		mes += '\",\"status\":\"ok\",\"time\":\"'; 
		
		var moment = require('moment');
		require('moment-timezone');
		moment.tz.setDefault("Asia/Seoul"); 
		var date = moment().format('YYYY-MM-DD HH:mm:ss'); 

		mes += date;
		mes += '\"}'
        res.send(mes);
		
		insert_sensor(parseInt(req.param('device_id')),parseFloat(req.param('temperature_value')), parseInt(req.param('sequence_number')), date);
})

var server = app.listen(8080, function () { 
   var host = server.address().address 
   var port = server.address().port 
   console.log('listening at http://%s:%s', host, port) 
 }); 