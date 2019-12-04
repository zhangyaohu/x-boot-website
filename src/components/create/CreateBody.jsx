import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './create.less';

class CreateBody extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		let {children} = this.props;
		return <div className={style.create_body} style={{'height': 'calc(100% - 120px)'}}>
			{children}
		</div>;
	}
}

CreateBody.propTypes = {
	children: PropTypes.node
}
export default CreateBody;