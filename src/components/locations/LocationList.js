import React, { useEffect, useState } from "react"
import LocationRepository from "../../repositories/LocationRepository";
import Location from "./Location"
import "./LocationList.css"


export const LocationList = () => {
    const [ locations, setLocations] = useState([])

    useEffect(() => {
        LocationRepository.getAll()
            .then((data) => {
                setLocations(data)
            })
    }, [])

    return (
        <div className="locations">
            {locations.map(l => <Location key={l.id} location={l} updateLocations={setLocations} />)} {/* mapped over the array of locations in order to get the route for individual locations. Made the individual locations a prop to be used in Location.js  */}
        </div>
    )
}


