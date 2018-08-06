import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { storeCurrentTime } from '../store/companyReducer';
class DropDownMenu extends React.Component {
	constructor() {
		super();
		this.state = {
			menuVal: '1D'
		};
		this.saveMenuValue = this.saveMenuValue.bind(this);
	}
	saveMenuValue(event) {
		event.preventDefault();
		this.setState(
			{
				menuVal: event.target.value
			},
			() => {
				console.log('menu val: ', this.state);
			}
		);
		this.props.renderDropDownChart(this.state.menuVal);
		console.log(this.props);
	}
	render() {
		return (
			<select value={this.state.menuVal} onChange={this.saveMenuValue}>
				<option value="1D">1 Day</option>
				<option value="6M">6 Month</option>
				<option value="1Y">1 Year</option>
				<option value="3Y">3 Years</option>
				<option selected value="5Y">
					5 Years
				</option>
			</select>
		);
	}
}

const mapStateToProps = state => ({
	currentTime: state.currentTime
});

const mapDispatchToProps = dispatch => ({
	renderDropDownChart: item => {
		dispatch(storeCurrentTime(item));
	}
});

export default connect(null, mapDispatchToProps)(DropDownMenu);
