import React, { useState, useEffect } from "react"
import Employee from "./Employee"
import EmployeeRepository from "../../repositories/EmployeeRepository"
import "./EmployeeList.css"


export default () => {
    const [emps, setEmployees] = useState([])
    const [animalsCaredFor, setCaretakerCount] = useState([])

    useEffect(
        () => {
            EmployeeRepository.getAll()
            .then((data) => {
               setEmployees(data) 
            })
        }, []
    )
    
    useEffect(
        () => {
            AnimalRepository.getAll()
            .then((data) => {
                setCaretakerCount(data) 
            })
        }, []
    )

    return (
        <>
            <div className="employees">
                {
                    emps.map(a => <Employee key={a.id} employee={a} updateEmployees= {setEmployees} />)
                }
            </div>
        </>
    )
}
