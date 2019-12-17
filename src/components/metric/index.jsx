import React, {Component} from 'react';
import style from './metric.less';
import {formatDateTime, bytesToSize } from '../../utils/utils'
import echarts from 'echarts';
import PropTypes from  'prop-types';
import _ from 'lodash'

class Metric extends Component{
  constructor(props) {
		super(props);
		this.state = {
			metricData: [],
			title:"",
			options: {}
		}
	}
	
	init = () => {
		let timeData = [];
		if(this.props.type !== 'double')
			timeData = this.props['metric-data'].map(it => {
				return formatDateTime(new Date(it.time), 'hh:mm');
			})
		else 
	  	timeData = this.props['metric-data'][0].map(it => {
			  return formatDateTime(new Date(it.time), 'hh:mm');
		 })
		let data = this.props['metric-data'].map(it => {
			return it.value;
		})
		let options = this.getOptions();
		if(this.props.type !== 'double'){
			options.series[0].data = data;
			options.series[0].name = '负载率';
		}
		else {
			options.series[0].data = this.props['metric-data'][0].map(it => {
				return it.value;
			});
			options.series[0].name = this.props.title === '总物理机网络吞吐量' ? '发送' : '写入';
			options.series.push({
				'type':'line',
				name: this.props.title === '总物理机网络吞吐量' ? '接收' : '读取',
				smooth: true,
				showSymbol: false,
        data: this.props['metric-data'][1].map(it => {
					return it.value;
				})
			})
		}
		options.xAxis.data = timeData;
	 if(this.refs.metric) {
			 let chartContent = echarts.init(this.refs.metric);
			 this.setState({
				 options: options
			 }, () => {
				chartContent.setOption(this.state.options, true)
			 })
	 }
	}
	
	format = (param) => {
    if(this.props.title === 'cpu使用率') {
			return Math.round(param.value * 100) / 100 + '%'
		}else if(this.props.title === '总物理机网络吞吐量' || this.props.title === '总物理机磁盘IO'){
      return bytesToSize(param.value);
		}
	}
	getOptions = () => {
    return {
				series: [
					{
					  'type':'line',
						data: [],
						smooth: true,
						showSymbol: false
				  }
			  ],
				title: '',
				tooltip: {
					trigger: 'axis',
					backgroundColor: '#fff',
					textStyle: {
						color:'#333',
					},
					formatter:(data)=> {
						let date = formatDateTime(new Date().getTime(), 'yyyy-MM-dd');
						let str = `<div style="background: #fff;padding: 10px 20px;box-shadow: 1px 1px 6px #f6f6f6, -1px -1px 6px #f6f6f6;">
						   <div>${date + ' ' + data[0].axisValue}</div>`
					 data.forEach((item, index) => {
							str += `
								<div style="display:block;just-content: space-between;">
									<div style="display:inline-block;width: 10px; height: 10px; borderRadius: 100%; backgroundColor:${this.state.options.color[index]}"></div>
									<div style="display:inline-block;">${item.seriesName}</div>
									<div style="display:inline-block;" >${this.format(item)}</div>
								</div>
							`
					 })
					 str +='</div>'
					 return  str;
					}
				},
				xAxis: {
					type: 'category',
					data: [],
					axisLabel: {
						interval: 7,
					},
					nameTextStyle: {
						color : '#fff',
						borderWidth: 0 
					},
					axisLine: {
						lineStyle: {
							color: '#666'
						}
					}
				},
				grid: {
				 show:true,
				 borderWidth:0,
				 borderColor: '#fff',
				 shadowColor :"#fff",
				 x: '0',
				 y: '0'
			  },
				yAxis: {
					type: 'value',
					show: false,
					nameTextStyle: {
						fontSize: 14,
						color: '#00ff00',
						fontStyle: 'italic'
					},
					splitLine: {
						show: false
			   	}
				},
				textStyle: {
          fontSize: 14,
				},
				color: ['#007FDF', '#52C4FF'],
				backgroundColor: '#fff',
				lengend: {

				},
		}
	}

	componentDidUpdate(prevProps) {
		if(_.isEqual(prevProps['metric-data'], this.props['metric-data'])) return;
		if(this.refs.metric) this.init();
	}

	componentDidMount() {
		window.addEventListener('resize',() => {
			if(this.refs.metric) {
				let chartContent = echarts.init(this.refs.metric);
				 chartContent.resize()
			 }
		})
	}
	
	componentWillUnmount() {
		window.removeEventListener('resize',() => {
			if(this.refs.metric) {
				let chartContent = echarts.init(this.refs.metric);
				 chartContent.resize()
			 }
		})
	}
	
	
	render () {
		return (
			<div className={style.metric_container}>
	      <div className={style.metric_title}>{this.props.title}</div>
				<div className={style.metric_lengend}>
					{
						this.props.type === 'double' ?
						 <div style={{'padding': '0px 10px'}}>
              <div  style={{'display': 'inline-block', 'marginRight': '50px'}}>
								<span style={{'display': 'inline-block', 'marginRight': '20px', 'width': '6px', 'height': '6px', 'borderRadius': '100%', 'backgroundColor': '#007FDF'}}></span>
								<span>{this.props.title === '总物理机网络吞吐量' ? '发送' : '写入'}</span>
							</div>
							<div style={{'display': 'inline-block', 'marginRight': '50px'}}>
								<span style={{'display': 'inline-block', 'marginRight': '20px', 'width': '6px', 'height': '6px', 'borderRadius': '100%', 'backgroundColor': '#007FDF'}}></span>
								<span>{this.props.title === '总物理机网络吞吐量' ? '接收' : '读取'}</span>
							</div>
						</div> : null
					}
				</div>
				<div className={[style.metric_content, 'metric_main'].join(' ')} 
				     ref="metric"
						 style={{"height": "calc(100% - 60px)"}}></div>
			</div>
		)
	}
}

Metric.propTypes = {
	'metric-data': PropTypes.array.isRequired,
	'title': PropTypes.string.isRequired
}

export default Metric;