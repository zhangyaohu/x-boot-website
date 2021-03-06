import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from  './create.less';

class CreateFooter extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		let {children} = this.props;
		return (
			<div className={style.create_footer} style={{'width': 'calc(100vw - 220px)'}}>
				{children}
			</div>
		);
	}
}

CreateFooter.propTypes = {
	children: PropTypes.node
}

export default CreateFooter;