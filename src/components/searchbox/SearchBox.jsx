import React, {Component} from 'react';
import PropsTypes from 'prop-types';
import {Input, Select, DatePicker } from 'antd';
import style from './searchbox.less'
const { Option } = Select;
const  RangePicker = DatePicker.RangePicker;

class SearchBox extends React.Component{
	  constructor(props) {
			super(props);
		}
		
		getSearchContent = (arg) => {
       return  arg.map((item, index) => {
				 return (
					 <div key={index} className={style.search_item}>
              <span className={style.search_item_label}>
								{item.label}
							</span>
							<span className={style.search_item_input}>
								{this.getSearchItem(item)}
							</span>
					 </div>
				 )
			 })
		}
		
		handleChange = (item, value) => {
      this.props.setSearchVal(value, item.key)
		}

		getSearchItem = (item) => {
			if(item.type === 'input') {
				return (
					<Input/>
				)
			}else if(item.type === 'select') {
				return (
					<Select
							showSearch
							style={{ width: '100%' }}
							placeholder={item.placeholder ? item.placeholder : '请选择'}
							optionFilterProp="children"
							onChange={this.handleChange.bind(this,item)}
						>
							{
								item.value.map((it, index) => {
									{
										return (
										<Option key={index} value={it.value}>{it.label}</Option>
										)
									}
								}) 
							} 
					</Select>
				)
			}else if(item.type === 'date') {
				return (
					<RangePicker onChange={this.handleChange} style={{ width: '100%' }}/>
				)
			}
		}

		render() {
			let {searchConditionList, getSearchVal} = this.props;
			return (
				<div className={style.searchbox_contaienr}>
					{this.getSearchContent(searchConditionList)}
				</div>
			)
		}
}

SearchBox.propTypes= {
	searchConditionList:  PropsTypes.array.isRequired,
	setSearchVal: PropsTypes.func.isRequired
}

export default SearchBox;