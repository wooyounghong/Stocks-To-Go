import React from 'react';
import LineChart from './';
import * as d3 from 'd3';
import chroma from 'chroma-js';

class Chart extends React.Component {
	state = {
		highs: null,
		lows: null
	};

	xScale = d3.scaleTime().range([margin.left, width - margin.right]); // take in time
	yScale = d3.scaleLinear().range([0, width / 2]); // take in date
	lineGenerator = d3.line();

	xAxis = d3
		.axisBottom()
		.scale(this.xScale)
		.tickFormat(d3.timeFormat('%b'));
	yAxis = d3
		.axisLeft()
		.scale(this.yScale)
		.tickFormat(d => `${d}`);

	componentWillReceiveProps(nextProps) {
		const { data } = nextProps;
		// if data is not loaded yet, return nothing;
		if (!data) return;

		// update scales
		const timeDomain = d3.extend(data, d => d.date);
		const tempMax = d3.max(data, d => d.high);
		this.xScale.domain(timeDomain);
		this.yScale.domain([0, tempMax]);
		// create a line generator with d3
		this.lineGenerator.x(d => this.xScale(d.date));
		this.lineGenerator.y(d => this.yScale(d.high));
		const highs = this.lineGenerator(data);

		console.log(highs);
		this.setState({ highs });
  }
  
  componentDidUpdate() {
    d3.select(this.refs.xAxis).call(xAxis)
    d3.select(this.refs.yAxis).call(yAxis)
  }

	render() {
		return (
			<svg width={width} height={height}>
				<path d={this.state.highs} fill="none" stroke={red} />
				<path d={this.state.lows} fill="none" stroke={blue} />

        <g>
          <g ref='xAxis' transform={`translate(0, ${height - margin.bottom}`}/>
          <g ref="yAxis" />
        </g>
			</svg>
		);
	}
}
