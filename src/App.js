import React, { useState, useEffect, useRef } from 'react';
import Cats from './components/Cats';

import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

	const [breeds, setBreeds] = useState([]);
	const [breedSelected, setBreedSelect] = useState("");
	const [catsList, setCatsList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [count, setCount] = useState(4);

	const firstLoad = useRef(true);

	useEffect(() => {
		fetchBreeds();
	}, []);

	useEffect(() => {
		if (firstLoad.current) {
	    	firstLoad.current = false;
	    	return;
	    }
	    const fetchCats = async () => {
	    	setIsLoading(true);
	    	const res = await fetch(`https://api.thecatapi.com/v1/images/search?limit=100&page=100&breed_id=${breedSelected}`);
	    	const data = await res.json();
	    	console.log(data);
	    	setCatsList(data);
	    	setCount(4);
	    	setIsLoading(false);
	    }
		fetchCats();
	}, [breedSelected]);


	const fetchBreeds = async () => {
		setIsLoading(true);
		const res = await fetch('https://api.thecatapi.com/v1/breeds');
		const data = await res.json();

		setBreeds(data);
		setIsLoading(false);
	}


	const onBreedSelect = e => {
		setBreedSelect(e.target.value);
	}


	const loadMore = () => {
		setIsLoading(true);
		setTimeout(() => {
		    setCount(count + 4);
			setIsLoading(false);
		}, 500);
		//setCount(count + 4);
	}

  return (
  	<div className="home">
	    <Container>
	      	<h1>Cat Browser</h1>
		    <Row>
		      	<Col xs={12} sm={6} md={3}>
		      		<Form.Group controlId="formBreedSelect">
		      			<Form.Label>Breed</Form.Label>
		      			<Form.Control as="select" onChange={ onBreedSelect } disabled={isLoading}>
		      			  	<option value>Select breed</option>
		      			  {breeds.map(item => (
		      			  	<option key={item.id} value={item.id}>{item.name}</option>
		      			  ))}
		      			</Form.Control>
				    </Form.Group>
			    </Col>
	     	</Row>
	     	<Row>
	     		{Array.isArray(catsList) && catsList.length === 0 ?
	     			 <Col xs={12}>No Cats Available</Col> :
		     		catsList.slice(0,count).map(cat => (
		     			<Cats
		     				key={cat.id}
		     				id = {cat.id}
		     				imageUrl = {cat.url}
		     			/>
		     		))
		     	}
	     	</Row>
	     	<Row>
	     		<Col xs={12} sm={6} md={3}>
	     			<Button variant="success" disabled={(Array.isArray(catsList) && catsList.length === 0) || isLoading} onClick={ loadMore }>{isLoading ? "Loading Cat..." : "Load More"}</Button>
	     		</Col>
	     	</Row>
	    </Container>
	  </div>
  );
}

export default App;
