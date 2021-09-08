import React from "react"
import { Link } from "react-router-dom"
import locationImage from "./location.png"
import "./Location.css"
import { useState, useEffect } from "react"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import AnimalRepository from "../../repositories/AnimalRepository"
import LocationRepository from "../../repositories/LocationRepository"






export default ({ location }) => {

    const [totalEmployeesMessage, updateMessage] = useState("")
    const [totalAnimalsMessage, updateAnimalMessage] = useState("")
    const [locations, setLocations] = useState([])
    const [emps, setEmployees] = useState([])

    useEffect(
        () => {
            LocationRepository.getAll()
                .then((data) => {
                    setLocations(data)
                })
        }, []
    )


    useEffect(
        () => { 
            locations.map((l) => {
                if ( l?.employeeLocations?.length === 1) {
                    return updateMessage("You have 1 employee at this location")
                }
                if (l?.employeeLocations.length > 1) {
                    return updateMessage(`You have ${l?.employeeLocations.length} employees at this location`) // function that updates the variable of totalCustomerMessage
                }
            }
            )
        }, [locations] // when the state of this array changes, you invoke updateMessage
    )

    // l.employeeLocations.locationId === location.id &&

    //l?.animals.employeeLocations?.locationId === location.id

    // useEffect(
    //     () => {
    //         if (animals.length === 1) {
    //             updateAnimalMessage("You have 1 animal at this location")
    //         }
    //         else {
    //             updateAnimalMessage(`You have ${animals.length} animals at this location`) // function that updates the variable of totalCustomerMessage
    //         }
    //     },
    //     [animals] // when the state of this array changes, you invoke updateMessage
    // )


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
                Total animals {totalAnimalsMessage}
            </section>
            <section>
                Total locations {totalEmployeesMessage}
            </section>
        </article>
    )
}
                

