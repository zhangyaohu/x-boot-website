import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import style from './create.less';

class CreateHeader extends Component {
	constructor(props) {
		super(props);
	}

	render () {
		const {title, goBack, description} = this.props;
		return (<div className={style.create_header} style={{'width': 'calc(100vw - 220px)'}}>
			<span className={style.create_header_title}>
				{title}
			</span>
			<span className={style.create_header_back} onClick={goBack}>
			  <Icon type="arrow-left" />
				<span className={style.create_header_back_title}>
					{description}
				</span>
			</span>
		</div>)
	}
}

CreateHeader.propTypes = {
	title: PropTypes.string.isRequired,
	goBack: PropTypes.func.isRequired,
	description: PropTypes.string.isRequired
}

export default CreateHeader;