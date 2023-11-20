// gregory dalla

// express to serve clients
function launch_interface() {
	const express = require( 'express' );
	const cors = require( 'cors' );
	const app = express();
	const PORT = 8080;

	app.set( 'view engine', 'ejs' );

	app.use( cors() );
	app.use( express.static( 'public' ) );
	app.use( express.urlencoded( { extended: true } ) );

	// default route
	app.get( '/', (req, res) => {
		res.render( 'index' );
	});

	// do listening
	app.listen( PORT, () => {
		console.log( 'Running on port ' + PORT + '...' );
	});
}

// sockets to handle messaging
function launch_socket_server() {
	const bimap = require( 'bidirectional-map' );
	const io = require('socket.io')( 6969, {
		cors: {
			origin: '*',
		}
	});

	let chatrooms = new bimap();
	let clients = new bimap();
	var queue = [];

	io.on( 'connection', (socket) => {
		// add client to queue
		socket.on( 'idself', (client_ip) => {
			clients.set( client_ip, socket.id );
			queue.push( client_ip );
		});

		// pair clients from queue
		socket.on( 'findfriend', (callback) => {
			while( queue.length < 2 ) {
				// busy wait ew
			}

			chatrooms.set( queue.pop(), queue.pop() );
			callback( chatrooms.get( clients.get( socket.id ) ) );
		});

		socket.on( 'newmsg', (msg) => {
			io.to( chatrooms.get( clients.get( socket.id ) ) ).emit( 'newmsg', msg )
		});
	});
}

launch_socket_server();
launch_interface();
