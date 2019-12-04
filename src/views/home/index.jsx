import React, {Component} from 'react';
import { show_create_detail } from '../../store/actions/menuAction';
import MainHeader from '../../components/main/Header';
import MainMenu from '../../components/main/MainMenu';
import  HomeRoute from '../../route/HomeRoute';
import style from './home.less';
import { Button } from 'antd';
import {connect} from 'react-redux';
import configureStore from '../../store/index.js';

class Home extends Component {
	constructor (props) {
		super(props);
		this.state = {
			isCreateOrDetail: false
		}
	}

	componentDidMount() {
		if(this.props.history.location.pathname.indexOf('add') > -1) {
      this.props.setCreateOrDetail(true);
		}else {
			this.props.setCreateOrDetail(false);
		}
		this.setState({
			isCreateOrDetail: this.props.isCreateOrDetail
		})
	}

	render() {
   const {history, match, isCreateOrDetail} = this.props;
		return (
			<div  className={style.container}>
				<header className={style.header} style={{'display': isCreateOrDetail ? 'none' : 'block'}}>
          <MainHeader history={history}></MainHeader>
				</header>
				<aside className={style.aside} style={{'display': isCreateOrDetail ? 'none' : 'inline-block'}}>
          <MainMenu history={history}></MainMenu>
				</aside>
				<section className={style.section} style={{"width": isCreateOrDetail ? "100%" : "calc(100% - 180px)"}}>
				    <HomeRoute history={history} match={match}></HomeRoute>
				</section>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
    isCreateOrDetail: state.menuReducer.isCreateOrDetail
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setCreateOrDetail: (payload) => dispatch(show_create_detail(payload))
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);