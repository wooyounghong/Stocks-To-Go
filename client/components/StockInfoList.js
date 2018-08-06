import React from 'react';
import { List } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { fetchInfo } from '../store/companyReducer';
import axios from 'axios';
class StockInfoList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		// this.props.loadStockInfo(this.props.queryStr);

		return (
			<div>
				{this.props.companyInfo && (
					<List>
						<List.Item>Symbol: {this.props.companyInfo.symbol}</List.Item>
						<List.Item>
							Current Price: {this.props.companyInfo.latestPrice}
						</List.Item>
						<List.Item>
							Previous Close: {this.props.companyInfo.previousClose}
						</List.Item>
						<List.Item>Open: {this.props.companyInfo.open}</List.Item>
						<List.Item>
							52 Week Low: {this.props.companyInfo.week52Low}
						</List.Item>
						<List.Item>
							52 Week High: {this.props.companyInfo.week52High}
						</List.Item>
						<List.Item>
							Market Capacity: {this.props.companyInfo.marketCap}
						</List.Item>
					</List>
				)}
			</div>
		);
	}
}
const mapStateToProps = state => ({
	companyInfo: state.info
});

const mapDispatchToProps = dispatch => {
	return {
		loadStockInfo: queryStr => {
			dispatch(fetchInfo(queryStr));
		}
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(StockInfoList);
