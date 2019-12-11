import React, {Component} from 'react';
import style from './home.less';
import {Timeline} from 'antd';

class HomeIndex extends Component {
	constructor(props) {
		super(props);
		this.state = {
			initClientWidth: 0,
			initClientHeight: 0,
		}
	}

  componentDidMount() {
		this.setState({
			initClientWidth:  document.body.clientWidth,
			initClientHeight:  document.body.clientHeight
		}, () => {
      let ratioY = document.body.clientHeight / 960;
			this.refs.home_container.setAttribute('style', `transform:scale(${1}, ${ratioY});transform-origin: left top 0px;`)
			window.addEventListener('resize',this.changeContainer)
		})
	}

	changeContainer = () => {
		let ratioY = document.body.clientHeight / 960;
		this.refs.home_container.setAttribute('style', `transform:scale(${1}, ${ratioY});transform-origin: left top 0px;`)
	}

	componentWillUnmount() {
		window.removeEventListener('resize',this.changeContainer)
	}

	render() {
		return (<div className={style.home_container} ref="home_container" id="home_container">
			<div className={style.home_container__top}>
				<ul className={style.home_container__top___container}>
					<h3 className={style.home_container__top___title}>资源</h3>
					<li className={style.home_container__top___item} style={{'width': 'calc((100% - 120px) / 3)'}}>
						<span className={style.home_container__top___item____title}>
							用户
						</span>
						<span className={style.home_container__top___item____count}>
						0
						</span>
					</li>
					<li className={style.home_container__top___item} style={{'width': 'calc((100% - 120px) / 3)'}}>
					  <span className={style.home_container__top___item____title}>
							部门
						</span>
						<span className={style.home_container__top___item____count}>
						0
						</span>
					</li>
					<li className={style.home_container__top___item} style={{'width': 'calc((100% - 120px) / 3)'}}>
					  <span className={style.home_container__top___item____title}>
							我的申请
						</span>
						<span className={style.home_container__top___item____count}>
							0
						</span>
					</li>
				</ul>
			</div>
			<div className={style.home_container__bottom} style={{"height": "calc(100% - 320px)"}}>
				<div className={style.home_container__bottom___left} style={{"width": "calc((100% - 60px) /  2)"}}>
				  <div className={style.home_container__bottom___left____container}>
						<h3 className={style.home_container__bottom___title}>申请进度</h3>
						<Timeline>
							<Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
							<Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
							<Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
							<Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
						</Timeline>
					</div>
				</div>
				<div className={style.home_container__bottom___right} style={{"width": "calc((100% - 60px) /  2)"}}>
				   <div className={style.home_container__bottom___right____container}>
						<h3 className={style.home_container__bottom___title}>申请进度</h3>
							<Timeline>
								<Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
								<Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
								<Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
								<Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
							</Timeline>
					 </div>
				</div>
			</div>
		</div>)
	}
}

export default HomeIndex;

