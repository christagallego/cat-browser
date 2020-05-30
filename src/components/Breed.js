import React, {useEffect} from 'react';

function Breed({breeds}) {
  return (
    <div>
    	{breeds.map(breed => <div>{breed.id}</div>)}
    </div>
  );
}

export default Breed;
