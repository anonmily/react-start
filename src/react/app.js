var React = require('react');
var Switch = require('./switch');
var FruitList = require('./fruitlist');

/*--- The main application: Creating a basic component ----*/

var App = React.createClass({

	/*--- render the component ---*/
	render: function(){
		return (
			<main>
			
				<h1>Hi React!</h1>
				<Switch />

				<hr />

				<h1>Fruit list</h1>
				<FruitList />
			</main>
		)
	}
});

module.exports = App;
