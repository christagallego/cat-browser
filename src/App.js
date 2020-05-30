import React, { useState, useEffect } from 'react';
import Breed from './components/Breed';

import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	useEffect(() => {
		fetchItems();
	}, []);

	const [breeds, setBreeds] = useState([]);

	const fetchItems = async () => {
		const res = await fetch('https://api.thecatapi.com/v1/breeds');
		const items = await res.json();

		setBreeds(items);
	}

  return (
  	<div className="home">
	    <Container>
	      <h1>Cat Browser</h1>
	      <Row>
	      	<Col xs={12} sm={6} md={3}>
	      		<Form.Group controlId="formBreedSelect">
	      			<Form.Label>Breed</Form.Label>
	      			<Form.Control as="select" onChange={}>
	      			  <option value>Select breed</option>
	      			  {breeds.map(item => (
	      			  	<option key={item.id} value="{item.id}">{item.name}</option>
	      			  	))}
	      			</Form.Control>
				    </Form.Group>
			    </Col>
	     	</Row>
	    </Container>
	  </div>
  );
}

export default App;
