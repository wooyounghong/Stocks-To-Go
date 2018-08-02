import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Button, Icon } from 'semantic-ui-react';

class Search extends React.Component {
	constructor(props) {
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
	}
	render() {
		return (
			<div>
				<h1>Analytic Chart and Trading Platform</h1>
				<form>
					<input
						type="text"
						name="queryStr"
						className="form-control-input"
						placeholder="Enter symbol here"
						value={this.state.queryStr}
						onChange={this.handleChange}
					/>
					<Button animated type="submit">
						<Button.Content visible>Submit</Button.Content>
						<Button.Content hidden>
							<Icon name="arrow right" />
						</Button.Content>
					</Button>
				</form>
			</div>
		);
	}
}

export default connect()(Search);
