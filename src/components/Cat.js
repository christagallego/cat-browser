import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Cat({match}) {
	const [catDetails, setCat] = useState({ breeds: [] });
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		fetchCat();
	}, []);

	const fetchCat = async () => {
		setIsLoading(true);
		const res = await fetch(`https://api.thecatapi.com/v1/images/${match.params.id}`);
		const data = await res.json();
		console.log(data);
		setCat(data);
		setIsLoading(false);
	}

	return (
	    <div className="cat">
	    	<Container>
	    		{isLoading ?
	    			<h4>Loading...</h4> :
		    		<Card>
		    			<Card.Header><Button variant="primary" as={Link} to="/">Back</Button></Card.Header>
			    		 	<Card.Img variant="top" src={catDetails.url} />
		    		 		{ Array.isArray(catDetails.breeds) ?
		    		 		    catDetails.breeds.map( details => (
		    		 				<Card.Body key={details.id}>
			    		 		        <h4>{ details.name}</h4> 
			    		 		        <h5>Origin: { details.origin }</h5>
			    		 		        <h6>{details.temperament}</h6>
			    		 		        <p>{details.description}</p>
		    		 				</Card.Body>
		    		 		    ))
		    		 		    :  "" }
		    		</Card> }
	    	</Container>
	    </div>
	);
}

export default Cat;
