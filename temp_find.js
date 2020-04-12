var request = require('request');  
var express = require('express');
 var app = express();
 const bodyParser = require('body-parser');
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
 

		
		
 app.get('/*?', function (req, res) { 
	var moment = require('moment');
	require('moment-timezone');
	moment.tz.setDefault("Asia/Seoul"); 
	var date1 = moment().format('YYYY-MM-DD HH:mm:ss');
	var data = '';
    var qstr = 'select * from sensors '; 
    connection.query(qstr, function(err, rows, cols) { 
       if (err) throw err;  
       for (var i=0; i< rows.length; i++){ 
        r = rows[i]; 
		if(r.device_id == parseInt(req.param('device_id'))){
			if(moment(date1,"YYYY-MM-DD HH:mm:ss").diff(moment(r.time,"YYYY-MM-DD HH:mm:ss")) < 86400000){
			data += '{\"sequence_number\":\"';
			data += r.sequence_number;
			data += '\",\"time\":\"';
			data += r.time;
			data += '\",\"temperature_value\":\"';
			data += r.temperature_value;
			data += '\",\"device_id\":\"';
			data += r.device_id;
			data += '\"}';
			}
			}
		else if(!req.param('device_id')){
			if(moment(date1,"YYYY-MM-DD HH:mm:ss").diff(moment(r.time,"YYYY-MM-DD HH:mm:ss")) < 86400000){
			data += '{\"sequence_number\":\"';
			data += r.sequence_number;
			data += '\",\"time\":\"';
			data += r.time;
			data += '\",\"temperature_value\":\"';
			data += r.temperature_value;
			data += '\",\"device_id\":\"';
			data += r.device_id;
			data += '\"}';
			}
		}
		}	
		res.send(data);
		}); 
		
    });
 var server = app.listen(8081, function () { 
   var host = server.address().address 
   var port = server.address().port 
   console.log('listening at http://%s:%s', host, port) 
 }); 