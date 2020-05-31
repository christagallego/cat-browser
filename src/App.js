import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Cat from './components/Cat';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
  	<Router basename={'/cat-browser'}>
		<Route path="/" exact component={Home} />
		<Route path="/:id" exact component={Cat} />
	</Router>
  );
}

export default App;
