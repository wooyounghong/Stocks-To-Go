import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import Main from './components/Main';

class MainRoute extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Main} />
			</Switch>
		);
	}
}

export default MainRoute;
