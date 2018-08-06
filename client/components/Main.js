import React from 'react';
import Search from './Search';
import { connect } from 'react-redux';
import LineChart1Y from './LineChart1Y';
import LineChart1D from './LineChart1D';
import LineChart2Y from './LineChart2Y';
import LineChart5Y from './LineChart5Y';
import StockInfoList from './StockInfoList';
import axios from 'axios';
class Main extends React.Component {
	constructor() {
		super();
		this.state = {
			data: {}
		};
	}

	render() {
		return (
			<div>
				<div>
					<Search />
					<div className="stock-info-container">
						{(this.props.currentMenu.time === '6M' ||
							this.props.currentMenu.time === '1Y') && <LineChart1Y />}
						{this.props.currentMenu.time === '2Y' && <LineChart2Y />}
						{this.props.currentMenu.time === '1D' && <LineChart1D />}
						{this.props.currentMenu.time === '5Y' && <LineChart5Y />}
						<StockInfoList />
					</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = state => ({
	currentMenu: state.current,
	queryStr: state.queryStr
});
const mapDispatchToProps = dispatch => {
	return {
		loadStockInfo: queryStr => {
			dispatch(fetchInfo(queryStr));
		}
	};
};

export default connect(mapStateToProps)(Main);
