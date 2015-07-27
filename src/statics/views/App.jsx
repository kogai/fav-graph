'use babel';

import React from 'react';
import Router from 'react-router';
import { Route, HashLocation } from 'react-router';

import Handler from './Handler.jsx';
import Index from './pages/Index.jsx';

const routes = (
	<Route handler={ Handler }>
		<Router.DefaultRoute handler={ Index } />
	</Route>
);

var router = Router.create({
	routes: routes,
	location: HashLocation
});

router.run(function(Root, state){
	React.render(<Root params={ state.params } />, document.body);
});
