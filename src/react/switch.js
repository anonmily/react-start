var React = require('react');

function toggleStatus(status){
	return status === 'on' ? 'off' : 'on';
}

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

		// The zombie component only shows up when the lights are off
		var zombie_component = "";
		if(this.state.status === 'off'){
			zombie_component = <Zombie />
		}

		// if currently on, next option = off, and vice versa
		var next_status = toggleStatus(this.state.status);

		return (
			<div className={(this.state.status === 'on' ? 'bg-warning' : 'bg-info') + ' switch-light' }>

				<button 
					className="btn btn-default" 
					onClick={this.switchStatus}
				>
					Turn { next_status }
				</button>
				<Light status={this.state.status} />

				{zombie_component}


			</div>
		);
	},

	/*---- custom methods can be defined for use in the component ---*/
	switchStatus: function(){

		var new_status = toggleStatus( this.state.status )

		this.setState({
			status: new_status
		});
	}
});

/*----------------------------------------------------------*/

var Light = React.createClass({
	render: function(){
		var status = this.props.status;

		var the_sun = "";
		if(status === 'on'){
			the_sun = (
				<img 
					className="sun"
					src="http://images.clipartpanda.com/cute-sun-clipart-happy-sun-md.png" 
				/>
			);
		}

		// Use brackets to use variable values/evaluate javascript
		return (
			<div className={ (status === 'on' ? 'bg-warning' : 'bg-info') + ' light' }>
				The light is currently {status}
				{the_sun}

			</div>
		);
	}
});

/*----------------------------------------------------------*/

// component lifecycle

var Zombie = React.createClass({
	componentWillMount: function(){
		console.log('--zombie--- Lights off! componentWillMount');
	},
	componentDidMount: function(){
		console.log('--zombie---Zombie party time. componentDidMount');
	},
	render: function(){
		return (
			<div className="zombie bg-error">
				<img src="https://s-media-cache-ak0.pinimg.com/236x/a9/7b/d9/a97bd9027f6dfad11669038ec10ed1c6.jpg" />
			</div>
		)
	},
	componentWillUnmount: function(){
		console.log('--zombie---Lights on! componentWillUnmount');
	}
});

module.exports = Switch;