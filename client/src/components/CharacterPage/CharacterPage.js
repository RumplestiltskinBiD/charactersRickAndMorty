import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from './characterPageStyle.css'

const CharacterPage = () => {
    const params = useParams();
    console.log(params)
    const [character, setCharacter] = useState({})
    const characterURL = `https://rickandmortyapi.com/api/character/${params.id}`
    const {name, image, location, origin, gender, species, status, type} = character

    useEffect(() => {
        (async function() {
            let data = await fetch(characterURL)
                .then(response => response.json())
                .catch(e => console.log(e))
            setCharacter(data)
        })()
    }, [characterURL])

    return (
        character
        ?
        <div className="container d-flex justify-content-center">
            <div className="character-page d-flex flex-column gap-3" style={styles.characterPage}>
                <h1>{name}</h1>
                <img src={image} alt="" className="img-fluid"/>

                {(() => {
                    if (status === 'Dead') {
                        return <div className="badge bg-danger">{status}</div>
                    } else if (status === 'Alive') {
                        return <div className="badge bg-success">{status}</div>
                    } else {
                        return <div className="badge bg-secondary">{status}</div>
                    }
                })()}
                <div className="content">
                    <div className="">
                        <span className="fw-bold">Gender: </span>
                        {gender}
                    </div>
                    <div>
                        <span className="fw-bold">Species: </span>
                        {species}
                    </div>
                    <div>
                        <span className="fw-bold">Type: </span>
                        {type === '' ? 'Unknown' : type}
                    </div>
                    <div>
                        <span className="fw-bold">Location: </span>
                        {location?.name}
                    </div>
                    <div>
                        <span className="fw-bold">Origin: </span>
                        {origin?.name}
                    </div>
                </div>
            </div>
        </div>
            :
            <div>Nothing to show</div>
    );
};

export default CharacterPage;