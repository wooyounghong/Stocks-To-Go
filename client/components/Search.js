import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Icon, Input } from 'semantic-ui-react';
import { fetchData } from '../store/companyReducer';

class Search extends React.Component {
	constructor() {
		super();
		this.state = {
			queryStr: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		this.setState({
			queryStr: event.target.value // works!
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.fetchData(this.state.queryStr);
	}
	render() {
		return (
			<div className="search-container">
				<h1 className="platform-title">Analytic Chart and Trading Platform</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="search-bar-container">
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
	fetchData: symbol => {
		dispatch(fetchData(symbol));
	}
});

export default connect(null, mapDispatchToProps)(Search);
