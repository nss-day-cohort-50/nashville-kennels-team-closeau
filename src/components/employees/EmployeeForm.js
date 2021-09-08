import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import LocationRepository from "../../repositories/LocationRepository";
import "./EmployeeForm.css"


export default (props) => {
    const [employee, updateEmployee] = useState({
        name: "",
        email: "",
        employee: false
    })
    const [employeeLocation, updateEmployeeLocation] = useState({
        userId: 0,
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
                email: employee.email,
                employee: true
            })
                .then(employee => {
                    EmployeeRepository.assignEmployee({
                        userId: employee.id,
                        locationId: employeeLocation.locationId
                    })
                })
                .then(() => history.push("/employees"))
        }
    }

    return (
        <>
            <form className="employeeForm">
                <h2 className="employeeForm__title">New Employee</h2>
                <div className="form-group">
                    <label htmlFor="employeeName">Employee name</label>
                    <input onChange={(event) => {
                        const copy = { ...employee }
                        copy[event.target.id] = event.target.value
                        updateEmployee(copy)
                    }
                    }
                        type="text"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Employee name"
                        id="name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="employeeEmail">Employee email</label>
                    <input onChange={(event) => {
                        const copy = { ...employee }
                        copy[event.target.id] = event.target.value
                        updateEmployee(copy)
                    }
                    }
                        type="text"
                        required
                        className="form-control"
                        placeholder="Employee email"
                        id="email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Assign to location</label>
                    <select onChange={(event) => {
                        const copy = { ...employeeLocation }
                        copy[event.target.id] = parseInt(event.target.value)
                        updateEmployeeLocation(copy)
                    }
                    }
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
