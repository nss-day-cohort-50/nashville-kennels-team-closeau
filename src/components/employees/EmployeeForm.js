import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import LocationRepository from "../../repositories/LocationRepository";
import "./EmployeeForm.css"


export default (props) => {
    const [employee, updateEmployee] = useState({
        name: "",
        locationId: 0
    })
    const [locations, defineLocations] = useState([])
    const history = useHistory()

    useEffect(
        () => {
            LocationRepository.getAll()
            .then(
                (locationsData) => {
                    defineLocations(locationsData)
                }
            )
        }, 
        []
    )

    const constructNewEmployee = () => {
        if (employee.locationId === 0) {
            window.alert("Please select a location")
        } else {
            EmployeeRepository.addEmployee({
                name: employee.name,
                employee: true
            })
            .then(employee => {
                EmployeeRepository.assignEmployee({
                    employeeId: employee.id,
                    locationId: parseInt(employee.locationId)
                })
            })
            .then(() => history.push("/employees"))
        }
    }

    const handleUserInput = (event) => {
        const copy = {...employee}
        copy[event.target.id] = event.target.value
        updateEmployee(copy)
    }


    return (
        <>
            <form className="employeeForm">
                <h2 className="employeeForm__title">New Employee</h2>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee name</label>
                    <input onChange={handleUserInput}
                        type="text"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Employee name"
                        id="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Assign to location</label>
                    <select onChange={handleUserInput}
                        defaultValue=""
                        name="location"
                        className="form-control"
                        id="locationId"
                    >
                        <option value="0">Select a location</option>
                        {locations.map(location => (
                            <option key={location.id} value={location.id}>
                                {location.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit"
                    onClick={
                        evt => {
                            evt.preventDefault()
                            constructNewEmployee()
                        }
                    }
                    className="btn btn-primary"> Save Employee </button>
            </form>
        </>
    )
}
