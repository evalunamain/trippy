import React from 'react';
import { render } from 'react-dom';

// Webpack CSS
import css from './styles/main.scss';

//Import Containers
import App from './App';
import Entry from './entry/Entry';
import Trip from './trip/Trip';

//Import Router Dependencies
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

const routerMarkup = (
	<Provider store={store}> 
		<Router history={history}>
			<Route path="/" component={App}>
				<IndexRoute component={Entry}></IndexRoute>
				<Route path="/:tripId" component={Trip}></Route>
			</Route>
		</Router>
	</Provider>
)


render(routerMarkup, document.getElementById('root'));
