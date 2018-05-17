var PORT_MUSICIANS = 4242
var PORT = 2205
var MULTICAST_ADRESS = "242.255.42.42"

var dgram = require('dgram');
var net = require('net'); 
var server;

var sounds = new Map();
sounds.set("ti-ta-ti","piano");
sounds.set("pouet","trumpet");
sounds.set("trulu","flute");
sounds.set("gzi-gzi","violin");
sounds.set("boum-boum","drum");

var maxWait = 5;

var isStillThere = [];
var soundIsPlaying = [];
var musicians = new Map();

var socket = dgram.createSocket('udp4');
socket.bin(PORT_MUSICIANS,function(){
	console.log("An auditor has joined the concerto !");
	socket.addMenbership(MULTICAST_ADRESS);
});

socket.on('messageToSend',function(msg,source)){
	console.log("An auditor has joined the concerto !");
	var dataReceived =  JSON.parse(msg);
	var soundExists = false;
	
	if(musicians.has(dataReceived.uuid)){
		musicians.set(dataReceived.uuid),{
			'uuid' : dataReceived.uuid, 'instrument' : dataReceived.instrument,'activityTime' :  new Date()
		});
	} else { musicians.get(dataReceived.uuid).activityTime = new Date(); }
});

server = net.createServer(function(srv){
	console.log("Server is running ...")
	var date = new Date();
	isStillThere = [];
	musicians.forEach(function(a,b){
		if(date - v.activityTime <= 5000) // si le délai de 5 secondes n'est pas dépassé
			isStillThere.push(a);
		}
	})
	
	var dataToSend = JSON.stringity(isStillThere);
	srv.write(dataToSend);
	srv.end;
	
});

server.listen(PORT,'0.0.0.0');
