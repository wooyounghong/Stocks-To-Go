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
var timeseries = require('timeseries-analysis');

class LineChart5Y extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			crossHairVal: [],
			predictStock: false
		};
		this.renderHighChart = this.renderHighChart.bind(this);
		this.calculateTick = this.calculateTick.bind(this);
		this.predictStock = this.predictStock.bind(this);
		this.clickHandler = this.clickHandler.bind(this);
	}
	calculateTick() {
		const output = [];
		for (let i = 0; i < this.props.company.length; i += 150) {
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
	clickHandler() {
		this.setState({
			predictStock: true
		});
	}
	predictStock() {
		const data = [];
		for (var i = 0; i < this.props.company.length; i++) {
			data.push([
				Number(this.props.company[i].date.split('-').join('')),
				this.props.company[i].close
			]);
		}
		var t = new timeseries.main(data);
		var processed = t.ma().output();
		const newData = processed.map(point => {
			return { x: point[0], y: point[1] };
		});
		console.log(newData);
		return newData;
	}
	render() {
		console.log(this.state, 'this.state');
		return (
			<div>
				<XYPlot width={800} height={500} xType="ordinal">
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
					{this.state.predictStock && <LineSeries data={this.predictStock()} />}
					{/* </FlexibleWidthXYPlot> */}
				</XYPlot>
				<button onClick={this.clickHandler}>PREDICT STOCK!</button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	company: state.company
});

export default connect(mapStateToProps)(LineChart5Y);
