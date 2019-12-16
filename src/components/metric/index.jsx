import React, {Component} from 'react';
import style from './metric.less';
import {formatDateTime } from '../../utils/utils'
import echarts from 'echarts';
import PropTypes from  'prop-types';
import _ from 'lodash'

class Metric extends Component{
  constructor(props) {
		super(props);
		this.state = {
			metricData: [],
			title:""
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
		if(this.props.type !== 'double')
		 options.series[0].data = data;
		else {
			options.series[0].data = this.props['metric-data'][0].map(it => {
				return it.value;
			});
			options.series.push({
				'type':'line',
				smooth: true,
				showSymbol: false,
        data: this.props['metric-data'][1].map(it => {
					return it.value;
				})
			})
		}
		options.xAxis.data = timeData;
		let chartContent = echarts.init(this.refs.metric);
		chartContent.setOption(options)
	}
	
	format = (param) => {
    if(param.length ===1 ) {
			return Math.round(param[0].value * 100) / 100 + '%'
		}else if(this.props.title === '总物理机网络吞吐量'){
      return 5 + 'k'
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
					 return `<div style="background: #fff;padding: 10px 20px;box-shadow: 1px 1px 6px #f6f6f6, -1px -1px 6px #f6f6f6;">
						 <div style="display: flex;">
							 <div style="flex: 1 1 auto;padding-right: 30px;">名称</div>
							 <div style="flex: 1 1 auto;" ></div>
						 </div>
						 <div style="display:flex;just-content: space-between;">
						   <div style="flex: 1 1 auto;padding-right: 30px;">值</div>
						   <div style="flex: 1 1 auto;" >${this.format(data)}</div>
						 </div>
					 </div>`
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
		this.init();
	}

	componentDidMount() {
		window.addEventListener('resize',() => {
			this.init();
		})
	}

	render () {
		return (
			<div className={style.metric_container}>
	      <div className={style.metric_title}>{this.props.title}</div>
				<div className={style.metric_lengend}>
					<div style={{'backgroundColor': '#369'}}></div>
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