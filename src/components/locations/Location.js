import React from "react"
import { Link } from "react-router-dom"
import locationImage from "./location.png"
import "./Location.css"
import { useState, useEffect } from "react"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import AnimalRepository from "../../repositories/AnimalRepository"
import LocationRepository from "../../repositories/LocationRepository"



export default ({ location }) => {

    const [locations, setLocations] = useState([])

    useEffect(
        () => {
            LocationRepository.getAll()
                .then((data) => {
                    setLocations(data)
                })
        }, []
    )


    return (
        <article className="card location" style={{ width: `18rem` }}>
            <section className="card-body">
                <img alt="Kennel location icon" src={locationImage} className="icon--location" />
                <h5 className="card-title">
                    <Link className="card-link"
                        to={{
                            pathname: `/locations/${location.id}`,
                            state: { location: location }
                        }}>
                        {location.name}
                    </Link>
                </h5>
            </section>
            <section>
                Total animals: {location.animals.length}
            </section>
            <section>
                Total employees: {location.employeeLocations.length}
            </section>
        </article>
    )
}
                

