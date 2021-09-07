import React from "react"
import { Link } from "react-router-dom"
import locationImage from "./location.png"
import "./Location.css"
import { useState, useEffect } from "react"






export default ({location, locations, }) => {

const [totalLocationsMessage, updateMessage] = useState("")

useEffect(
    ()=> {
        if (locations.length === 1){
            updateMessage("You have 1 location")
        }
        else{
            updateMessage(`You have ${locations.length} locations`) // function that updates the variable of totalCustomerMessage
        }
    },
    [locations] // when the state of this array changes, you invoke updateMessage
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
                Total animals
            </section>
            <section>
                Total locations {totalLocationsMessage}
            </section>
        </article>
    )
}
