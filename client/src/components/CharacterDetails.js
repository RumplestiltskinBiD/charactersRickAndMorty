import React, {useEffect, useState} from 'react';

const CharacterDetails = ({results}) => {
    console.log(results)
    let display
    const handleClick = (status, location, url) => {
        console.log(status, location, url)
        return <h5>{location.name}</h5>
    }
    if (results) {
        display = results.map(i => {
            let {id, image, name, status, location, url} = i
            return (
                <div key={id} className="col-4" onClick={() => {handleClick(status, location.name, url)}}>
                    <h1>{name}</h1>
                    {/*<img src={image} alt="" className="img-fluid"/>
                    <h5>{location.name}</h5>
                    <h6>{status}</h6>*/}
                </div>
            )
        })
    } else {
        display = 'Nothing to show'
    }
    return (
        <div>
            {display}
        </div>
    );
};

export default CharacterDetails;