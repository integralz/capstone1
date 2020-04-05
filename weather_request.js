var request = require('request');  
var express = require('express'); 
 var app = express(); 
 
mysql = require('mysql'); 
 var connection = mysql.createConnection({ 
     host: 'localhost', 
     user: 'integralz', 
     password: 'wnstjr12', 
     database: 'weather' 
 }) 
 connection.connect(); 
 
 
 function insert_sensor(T1H, date) {
   obj = {}; 
   obj.T1H = T1H;  
   obj.time = date;
   var query = connection.query('insert into sensors set ?', obj, function(err, rows, cols) { 
     if (err) throw err; 
     console.log("database insertion ok= %j", obj); 
   }); 
 } 
setInterval(function(){
 var moment = require('moment');
		require('moment-timezone');
		moment.tz.setDefault("Asia/Shanghai"); 
		var date = moment().format('YYYYMMDD HHmm'); 

var serviceKey = 'Qn713AqsL%2BWIOgmgYhwquZ8dst48Jitsv7YZTIUFZ6Da9BY%2BoZH6A%2BfE9JDPs8wG6%2FB2HZshuDC%2FZTQuyp70dA%3D%3D';
var base_date = date.substring(0,8);
var base_time = date.substring(9,13);
var nx = '59';
var ny= '126'; 

var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getUltraSrtNcst?serviceKey=';
url += serviceKey + '&pageNo=1&numOfRows=10&dataType=XML&base_date=';
url += base_date + '&base_time=';
url += base_time + '&nx=';
url += nx + '&ny=';
url += ny;


request(url, function(err, res, body) {

    if (err) {

        console.log(err);

        return;

    }

    console.log("received server data:");
	
	var n = body.indexOf("T1H");
	body = body.substring(n,body.length-1);
	n = body.indexOf("obsrValue");
	body = body.substring(n+10,body.length-1);
	n = body.indexOf("obsrValue");
	body = body.substring(0,n-2);
	body = parseFloat(body);
	
	console.log(body);
	insert_sensor(body, date);
	process.exit();
});
},600000);
 var server = app.listen(8083, function () { 
   var host = server.address().address 
   var port = server.address().port 
   console.log('listening at http://%s:%s', host, port) 
 }); 