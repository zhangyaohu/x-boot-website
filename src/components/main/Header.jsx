import React, {Component} from 'react';

export default class Header extends Component {
  constructor(props) {
		super(props);
	}	

	render() {
		const {history} = this.props;
		console.log(history);
		return (
			<div></div>
		)
	}
}