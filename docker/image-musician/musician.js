
const PORT_MUSICIAN = 4242;
const MULTICAST_ADRESS = "242.255.42.42"

var dgram = require('dgram');
var uuid = require('uuid');

var socket = dgram.createSocket('udp4');
socket.bind(PORT_MUSICIAN);

var instruments = new Map();

instruments.set("piano", "ti-ta-ti");
instruments.set("trumpet", "pouet");
instruments.set("flute", "trulu");
instruments.set("violin", "gzi-gzi");
instruments.set("drum", "boum-boum");

function Musician(pos){
	this.instrument = pos;
	this.sound = instruments.get(arg);
	this.uuid = uuid.v4();
	this.activityTime = new Date();
	
	Musician.prototype.update = function(){
	
		var JsonData = {
			'uuid' : this.uuid, 'instrument' : this.instrument, 'sound'
 		    : this.sound, 'activityTime' :this.activityTime };
		
			var Json = JSON.stringify(JsonData);
			var dataToSendToServer = new Buffer(Json);
			socket.send(dataToSendToServer,0, dataToSendToServer.length,
					    PORT_MUSICIAN, MULTICAST_ADRESS, function(){
							console.log("Now playing : " + Json);
			});
	}
	
	var readArgument = process.argv[2];
	if(!instruments.has(readArgument)){
		process.on'exit',function(){
			console.log('It seems like the instrument is not known... Leaving application...');
			process.exit(1); //Leave the applicationwith error code 1
		});
	}
	
	var musician = new Musician(arg);
}
