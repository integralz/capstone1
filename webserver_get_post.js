const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/get?', function(req, res) {
        var ip = req.connection.remoteAddress;
		var par = "undefined";
		var i = 0;
		
		while(ip[i] == ':' || ip[i] == 'f') i++;
		
        var mes = '{';
		
		for(var k = 0; k < req.url.length; k++){
			if(req.url[k] == '?'){
				if(k + 1 != req.url.length)
					par = req.url.substring(k+1);
				else break;
			}
		}
		if(par != "undefined"){
			mes += "\"";
			for(var k = 0; k < par.length; k++){
				if(par[k] == '=') mes += "\":\"";
				else if(par[k] == '&') mes += "\",\"";
				else mes += par[k];
			}
			mes += "\",";
		}
		mes += "\"ip\":\"";
		mes += ip.substring(i);
        mes += "\",\"time\":\"";
		
		var moment = require('moment');
		require('moment-timezone');
		moment.tz.setDefault("Asia/Seoul"); 
		var date = moment().format('YYYY-MM-DD HH:mm:ss'); 

		mes += date;
		mes += "\",\"email\":\"integralz@naver.com\",\"stuno\":\"20141214\"}";
        res.send(mes);
})

app.post('/', function(req, res){

        var ip = req.connection.remoteAddress;
		var i = 0;
		
		while(ip[i] == ':' || ip[i] == 'f') i++;
		
        var mes = '{';
		
		
		for(var k = 0; k < Object.keys(req.body).length; k++){
			mes += "\"";
			mes += Object.keys(req.body)[k];
			mes += "\":\"";
			mes += req.body[Object.keys(req.body)[k]];
			mes += "\",";
		}
		mes += "\"ip\":\"";
		mes += ip.substring(i);
        mes += "\",\"time\":\"";
		
		var moment = require('moment');
		require('moment-timezone');
		moment.tz.setDefault("Asia/Seoul"); 
		var date = moment().format('YYYY-MM-DD HH:mm:ss'); 

		mes += date;
		mes += "\",\"email\":\"integralz@naver.com\",\"stuno\":\"20141214\"}";
        res.send(mes);
})

app.listen(port, () => console.log("${port}!"));
