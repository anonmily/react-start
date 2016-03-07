var React = require('react');

// component lifecycle
var FruitList = React.createClass({
	render: function(){
		var fruit_list = ['apple','oranges','peaches','pears'];
		var fruits = fruit_list.map(function(fruit){
			return <li key={fruit} className="list-group-item">{fruit}</li>
		});

		return (
			<ul className="fruits list-group">
				{fruits}
			</ul>
		);
	}
});

module.exports = FruitList;