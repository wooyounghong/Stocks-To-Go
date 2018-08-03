import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';

import { ChartCanvas, Chart } from 'react-stockcharts';

class LineStockChart extends React.Component {
	render() {
		console.log(this.props);
		return (
			<ChartCanvas
				width={100}
				height={100}
				ratio={100}
				data={this.props.company}
				seriesName="AAPL"
			/>
		);
	}
}
const mapStateToProps = state => ({
	company: state.company
});
export default connect(mapStateToProps)(LineStockChart);
