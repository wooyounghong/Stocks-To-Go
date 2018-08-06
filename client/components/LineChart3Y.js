import React from 'react';
import { connect } from 'react-redux';
import {
	XYPlot,
	XAxis,
	YAxis,
	HorizontalGridLines,
	LineSeries,
	VerticalGridLines,
	makeWidthFlexible,
	FlexibleHeightXYPlot,
	FlexibleWidthXYPlot,
	FlexibleXYPlot,
	Crosshair
} from 'react-vis';
const data = [{ date: 0, high: 0 }, { date: 100, high: 2 }];

class LineChart1Y extends React.Component {
	constructor() {
		super();
		this.setState = {
			crossHairVal: []
		};
		this.renderHighChart = this.renderHighChart.bind(this);
		this.calculateTick = this.calculateTick.bind(this);
	}
	calculateTick() {
		const output = [];
		for (let i = 0; i < this.props.company.length; i += 30) {
			output.push(this.props.company[i].date.split('-').join(''));
		}
		return output;
	}

	renderHighChart() {
		const closePrice = this.props.company.map(comp => {
			return {
				x: Number(comp.date.split('-').join('')),
				y: comp.close
			};
		});
		return closePrice;
	}

	render() {
		this.calculateTick();
		return (
			<XYPlot width={500} height={500} xType="ordinal">
				{/* <FlexibleWidthXYPlot height={100}> */}
				<HorizontalGridLines />
				<VerticalGridLines />
				<XAxis
					title="Dates"
					tickValues={this.calculateTick()}
					// tickFormat={d =>
					// 	`${new Date(d).getMonth()}-${new Date(d).getFullYear()}`
					// }
				/>
				<YAxis title="Dollars" />
				{this.renderHighChart && (
					<LineSeries
						data={this.renderHighChart()}
						style={{ stroke: 'red', strokeWidth: 1 }}
					/>
				)}
				{/* </FlexibleWidthXYPlot> */}
			</XYPlot>
		);
	}
}

const mapStateToProps = state => ({
	company: state.company
});

export default connect(mapStateToProps)(LineChart1Y);
