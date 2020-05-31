import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Cat({match}) {
	const [catDetails, setCat] = useState({ breeds: [] });
	const [catBreed, setCatBreed] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const location = useLocation();

	useEffect(() => {
		const fetchCat = async () => {
			setIsLoading(true);
				let res;
  				try {
					res = await fetch(`https://api.thecatapi.com/v1/images/${location.pathname.replace("/","")}`);					
				} catch(error) {
				    return error;
				}
				if (!res.ok) {
		            return res;
		        }
		        const data = await res.json();

		        setCat(data);

		        setCatBreed("/?breed=" + data.breeds[0].id);
		        setIsLoading(false);
		}
		fetchCat();
	}, [match, location.pathname]);

	

	return (
	    <div className="cat">
	    	<Container>
	    		{isLoading ?
	    			<h4>Loading...</h4> :
		    		<Card>
		    			<Card.Header><Button variant="primary" as={Link} to={catBreed}>Back</Button></Card.Header>
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
