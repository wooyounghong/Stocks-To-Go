import React from 'react';
import { connect } from 'react-redux';
import { List } from 'semantic-ui-react';
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

class LineChart1D extends React.Component {
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
			if (this.props.company[i].minute) {
				if (this.props.company[i].minute[0] === '0') {
					output.push(
						this.props.company[i].minute
							.slice(1)
							.split(':')
							.join('')
					);
				} else {
					output.push(this.props.company[i].minute.split(':').join(''));
				}
			}
		}
		return output;
	}

	renderHighChart() {
		const closePrice = this.props.company.map(comp => {
			if (comp.minute) {
				return {
					x: Number(comp.minute.split(':').join('')),
					y: comp.close
				};
			}
		});
		return closePrice;
	}

	render() {
		return (
			<div className="stock-info-container">
				Stock Chart:
				<XYPlot width={800} height={500} xType="ordinal" margin={{ left: 100 }}>
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
				<div />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	company: state.company
});

export default connect(mapStateToProps)(LineChart1D);
