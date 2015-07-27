"use babel";

import React from 'react';
import { RouteHandler, Link } from 'react-router';

class Handler extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				RouteHandler
				<RouteHandler />
			</div>
		);
	}
}

export default Handler;
