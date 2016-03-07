var React = require('react');

/*--- The main application: Creating a basic component ----*/

var App = React.createClass({

	/*--- render the component ---*/
	render: function(){
		return (
			<main>
				<h1>Hi React!</h1>
				<Switch />
			</main>
		)
	}
});

var Switch = React.createClass({

	/*--- the initial state of the component, will vary frequently ---*/
	// try to limit the amount of statue used
	getInitialState: function(){
		return {
			status: 'on'
		}
	},

	/*--- render the component ---*/
	render: function(){


		// onClick, onFocus...etc: bind events and event handlers to the component
		// React child component can receiving props.
		//     e.g. the Light component receives a "status" prop which will vary depending on the current component's state

		return (
			<div className="switch-light">

				<button className="btn btn-default" onClick={this.switchStatus}>
					Turn { this.state.status.toUpperCase() }
				</button>


				<Light status={this.state.status} />
			</div>
		);
	},


	/*---- custom methods can be defined for use in the component ---*/
	switchStatus: function(){

		var new_status = this.state.status === 'on' ? 'off' : 'on';

		this.setState({
			status: new_status
		});
	}
});

var Light = React.createClass({
	render: function(){
		var status = this.props.status;

		// Use brackets to use variable values/evaluate javascript
		return (
			<div className={ (status === 'on' ? 'bg-warning' : 'bg-info') + ' light' }>
				The light is currently {status}
			</div>
		);
	}
});

module.exports = App;
