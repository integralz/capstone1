var express = require('express') 
 var app = express() 
 fs = require('fs'); 
 mysql = require('mysql'); 
 var connection = mysql.createConnection({ 
     host: 'localhost', 
     user: 'integralz', 
     password: 'wnstjr12', 
     database: 'weather' 
 }) 
 connection.connect(); 

 
 var year="";
 var month="";
 var day="";
 var hour="";
 var minute="";
  
 
 app.get('/graph', function (req, res) { 
     console.log('got app.get(graph)'); 
     var html = fs.readFile('./graph.html', function (err, html) { 
     html = " "+ html 
     console.log('read file'); 
 
 
    var qstr = 'select * from sensors '; 
    connection.query(qstr, function(err, rows, cols) { 
       if (err) throw err; 
       var data = ""; 
       var comma = "" 
       for (var i=0; i< rows.length; i++) { 
         r = rows[i]; 
		 
		 year = r.time.substring(0,4);
		 month = r.time.substring(4,6);
		 month = parseInt(month);
		 month--;
		 month = String(month);
		 
		 day = r.time.substring(6,8);
		 hour = r.time.substring(9,11);
		 minute = r.time.substring(11,13);
		 
         data += comma + "[new Date("+ year +","+ month +","+ day +"," + hour +","+ minute +"),"+ r.T1H +"]"; 
        comma = ","; 
       } 
       var header = "data.addColumn('date', 'Date/Time');" 
       header += "data.addColumn('number', 'Temperature');" 
       html = html.replace("<%HEADER%>", header); 
       html = html.replace("<%DATA%>", data); 

 
      res.writeHeader(200, {"Content-Type": "text/html"}); 
       res.write(html); 
       res.end(); 
     }); 
   }); 
 }) 
 
 
 var server = app.listen(8082, function () { 
   var host = server.address().address 
   var port = server.address().port 
   console.log('listening at http://%s:%s', host, port) 
 }); 
