//

// express to serve clients, communicate with backend
function launch_interface() {
	const express = require('express');
	const app = express();

	const PORT = 8080;
	app.set( 'view engine', 'ejs' );
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

launch_interface();
