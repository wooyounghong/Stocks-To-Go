import React from 'react';
import { connect } from 'react-redux';
import {
	XYPlot,
	XAxis,
	YAxis,
	HorizontalGridLines,
	LineSeries,
	VerticalGridLines
} from 'react-vis';
const data = [{ date: 0, high: 0 }, { date: 100, high: 2 }];

class LineChart extends React.Component {
	constructor() {
		super();
		this.renderChart = this.renderChart.bind(this);
	}
	renderChart() {
		// console.log('data', Number(this.props.company[0].date.split('-').join()));
		// if (this.props.company.length > 1) {
		// 	for (let i = 0; i < this.props.company.length; i++) {
		// 		if (i % 2 === 0) {
		// 			console.log('hi', typeof this.props.company[i].date);
		// 			return [
		// 				{
		// 					x: Number(this.props.company[i].date.split('-').join('')),
		// 					y: this.props.company[i].high
		// 				},
		// 				{
		// 					x: Number(this.props.company[i + 1].date.split('-').join('')),
		// 					y: this.props.company[i + 1].high
		// 				}
		// 			];
		// 		}
		// 	}
		// }
		const create = this.props.company.map(comp => {
			return {
				x: comp.date.split('-').join(''),
				y: comp.high
			};
		});
		return create;
	}
	render() {
		return (
			// <XYPlot width={300} height={300} xType="ordinal" color="white">
			// 	<VerticalGridLines />
			// 	<HorizontalGridLines />
			// 	<XAxis title="Dates" />
			// 	<YAxis title="Dollars" />
			// 	<LineSeries
			// 		data={[
			// 			{ x: 1, y: 4 },
			// 			{ x: 5, y: 2 },
			// 			{ x: 15, y: 6 },
			// 			{ x: 29, y: 300 }
			// 		]}
			// 	/>
			// </XYPlot>
			<XYPlot width={500} height={500} xType="ordinal">
				<HorizontalGridLines />
				<VerticalGridLines />
				<XAxis title="Dates" />
				<YAxis title="Dollars" />
				{/* <LineSeries data={[{ x: 1, y: 4 }, { x: 5, y: 2 }, { x: 15, y: 6 }]} /> */}
				{this.renderChart && <LineSeries data={this.renderChart()} />}
				{/* <LineSeries data={[{ x: 1, y: 10 }, { x: 2, y: 5 }]} /> */}
			</XYPlot>
		);
	}
}

const mapStateToProps = state => ({
	company: state.company
});

export default connect(mapStateToProps)(LineChart);
