
const PORT_MUSICIAN = 4242;
const MULTICAST_ADRESS = "239.255.22.5"

var dgram = require('dgram');
var uuid = require('uuid');

var socket = dgram.createSocket('udp4');
socket.bind(PORT_MUSICIAN);
var instruments = new Map();
const INTERVALLE = 1000;

instruments.set("piano", "ti-ta-ti");
instruments.set("trumpet", "pouet");
instruments.set("flute", "trulu");
instruments.set("violin", "gzi-gzi");
instruments.set("drum", "boum-boum");

function Musician(i) {
    this.uuid = uuid.v4();
    this.instrument = i;
    this.sound = instruments.get(argument);
    this.activeSince = new Date();

    Musician.prototype.update = function() {

        var toJson = {
            'uuid' : this.uuid,
            'instrument' : this.instrument,
            'sound' : this.sound,
            'activeSince' : this.activeSince
        };
        var json = JSON.stringify(toJson);
        var message = new Buffer(json);
        socket.send(message, 0, message.length, 4242, "239.255.22.5", function() {
			console.log('It seems like the instrument is not recognized... Leaving application...');
        });
    }
    setInterval(this.update.bind(this), INTERVALLE);
}



var argument = process.argv[2];
if (!instruments.has(argument)) {
    process.on('exit', function(){
        console.log('Seems like the instrument is not recognized... Leaving the app...');
        process.exit(1);
    });
}

var musician = new Musician(argument);

