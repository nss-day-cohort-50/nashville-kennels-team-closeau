import React from "react"
import { Link } from "react-router-dom"
import locationImage from "./location.png"
import "./Location.css"
import { useState, useEffect } from "react"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import AnimalRepository from "../../repositories/AnimalRepository"
import LocationRepository from "../../repositories/LocationRepository"






export default ({ location }) => {

    const [totalEmployeesMessage, updateEmployeeMessage] = useState("")
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
                    return updateEmployeeMessage("1")
                }
                if (l?.employeeLocations.length > 1) {
                    return updateEmployeeMessage(`${l?.employeeLocations.length}`) // function that updates the variable of totalCustomerMessage
                }
            }
            )
        }, [locations] // when the state of this array changes, you invoke updateMessage
    )

    // l.employeeLocations.locationId === location.id &&

    //l?.animals.employeeLocations?.locationId === location.id

    useEffect(
        () => { 
            locations.map((l) => {
                if ( l?.animals?.length === 1) {
                    return updateAnimalMessage("1")
                }
                if (l?.animals.length > 1) {
                    return updateAnimalMessage(`${l?.animals.length}`) // function that updates the variable of totalCustomerMessage
                }
            }
            )
        }, [locations] // when the state of this array changes, you invoke updateMessage
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
                Total animals {totalAnimalsMessage}
            </section>
            <section>
                Total locations {totalEmployeesMessage}
            </section>
        </article>
    )
}
                

