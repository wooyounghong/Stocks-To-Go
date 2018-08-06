import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Icon, Input } from 'semantic-ui-react';
import { fetchData, storeQueryStr, fetchInfo } from '../store/companyReducer';
import DropDownMenu from './DropDownMenu';
import { storeCurrentTime } from '../store/companyReducer';
import StockInfoList from './StockInfoList';
class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			queryStr: '',
			menuVal: '1D'
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.saveMenuValue = this.saveMenuValue.bind(this);
		this.handleAddTime = this.handleAddTime.bind(this);
		this.anotherFunc = this.anotherFunc.bind(this);
		this.getNewInfo = this.getNewInfo.bind(this);
	}

	saveMenuValue(event) {
		event.preventDefault();
		this.setState({
			menuVal: event.target.value
		});
	}
	handleChange(event) {
		this.setState({
			queryStr: event.target.value // works!
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.handleAddTime(this.state.menuVal);
		this.props.saveQueryStr(this.state.queryStr);
		this.props.loadStockInfo(this.state.queryStr);
		this.getNewInfo();
		this.renderNewGraph();
	}
	handleAddTime() {
		this.props.renderDropDownChart(this.state.menuVal);
	}
	anotherFunc2() {
		this.props.fetchData(this.state.queryStr, this.state.menuVal);
	}
	renderNewGraph() {
		setInterval(() => {
			this.anotherFunc2();
		}, 5000);
	}
	getNewInfo() {
		setInterval(() => {
			this.anotherFunc();
		}, 5000);
	}
	anotherFunc() {
		this.props.loadStockInfo(this.state.queryStr);
	}
	render() {
		return (
			<div className="search-container">
				<h1 className="platform-title">Analytic Chart and Trading Platform</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="search-bar-container">
						<select value={this.state.menuVal} onChange={this.saveMenuValue}>
							<option selected value="1D">
								1 Day
							</option>
							<option value="6M">6 Month</option>
							<option value="1Y">1 Year</option>
							<option value="2Y">2 Years</option>
							<option value="5Y">5 Years</option>
						</select>{' '}
						<Input
							icon="search"
							type="text"
							name="queryStr"
							className="search-bar"
							placeholder="Enter symbol here"
							value={this.state.queryStr.toUpperCase()}
							onChange={this.handleChange}
						/>
						<button type="submit" className="btn-search-submit">
							Search
						</button>
					</div>
				</form>
				<div />
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => ({
	fetchData: (symbol, menu) => {
		dispatch(fetchData(symbol, menu));
	},
	renderDropDownChart: item => {
		dispatch(storeCurrentTime(item));
	},
	saveQueryStr: queryStr => {
		dispatch(storeQueryStr(queryStr));
	},
	loadStockInfo: queryStr => {
		dispatch(fetchInfo(queryStr));
	}
});

export default connect(null, mapDispatchToProps)(Search);
