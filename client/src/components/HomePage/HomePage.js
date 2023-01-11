import React, {useEffect, useState} from 'react';
import { NavLink } from "react-router-dom";
import Pagination from "../Pagination";
import mini from "./homePageStyle.css"
import "./homePageStyle.css"
import { useParams } from "react-router-dom";

const HomePage = () => {
    const [characters, setCharacters] = useState([])
    const params = useParams();
    const {info, results} = characters;
    const listOfCharacters = `https://rickandmortyapi.com/api/character/?page=${params.page}`;
    const pagesAmount = info?.pages
    const [pageNumber, setPageNumber] = useState(pagesAmount)

    useEffect(() => {
        (async function() {
            let data = await fetch(listOfCharacters)
                .then(response => response.json())
                .catch(e => console.log(e))
            setCharacters(data)
        })()
    }, [listOfCharacters])

    return (
            <div className="container justify-content-center">
                <h1>Characters</h1>
                <ul className="list-group" style={{ listStyleType: "none" }}>
                {results?.map(character => {
                    return (
                        <NavLink className="liststyle" key={character.id} to={"/character/" + character.id}>
                            <li style={{textAlign: "start"}} className="list-group-item liststyle" >
                                <img style={mini} className="mini" src={character.image} alt=""/>
                                    {character.name}

                                {(() => {
                                    if (character.status === 'Dead') {
                                        return <div className="badge bg-danger float-end">{character.status}</div>
                                    } else if (character.status === 'Alive') {
                                        return <div className="badge bg-success float-end">{character.status}</div>
                                    } else {
                                        return <div className="badge bg-secondary float-end">Unknown</div>
                                    }
                                })()}
                            </li>
                </NavLink>
                    )
                })}
                </ul>
                <Pagination
                    info={info}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                />
            </div>

    );
};

export default HomePage;