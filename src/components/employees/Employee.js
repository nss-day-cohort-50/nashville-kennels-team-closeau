import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import EmployeeRepository from "../../repositories/EmployeeRepository";
import useResourceResolver from "../../hooks/resource/useResourceResolver";
import useSimpleAuth from "../../hooks/ui/useSimpleAuth";
import person from "./person.png"
import "./Employee.css"



export default ({ employee, updateEmployees }) => { // object deconstruction, employee is a child of employee list, so I can pass props down from employee list to employee
    const [animalCount, setCount] = useState(0)
    const [l, markLocation] = useState({ name: "" })
    const [classes, defineClasses] = useState("card employee")
    const { employeeId } = useParams()
    const { getCurrentUser } = useSimpleAuth()
    const { resolveResource, resource } = useResourceResolver()
  



    useEffect(() => {
        if (employeeId) {
            defineClasses("card employee--single")
        }
        resolveResource(employee, employeeId, EmployeeRepository.get)
    }, [])

    useEffect(() => {
        if (resource?.employeeLocations?.length > 0) {
            markLocation(resource.employeeLocations[0])
        }
    }, [resource])



    const fireEmployee = (id) => {
        EmployeeRepository.delete(id)
            .then(() => {
                EmployeeRepository.getAll()
                    .then(updateEmployees)
            })
    }



    return (
        <article className={classes}>
            <section className="card-body">
                <img alt="Kennel employee icon" src={person} className="icon--person" />
                <h5 className="card-title">
                    {
                        employeeId
                            ? resource.name
                            : <Link className="card-link"
                                to={{
                                    pathname: `/employees/${resource.id}`,
                                    state: { employee: resource }
                                }}>
                                {resource.name}
                            </Link>

                    }
                </h5>
                {
                    employeeId
                        ? <>
                            <section>
                                Caring for {resource?.animals?.length} animals
                            </section>
                            <section>
                                Working at unknown location
                            </section>
                        </>
                        : <>
                            <section>
                                Caring for {employee?.animalCaretakers?.length} animals
                            </section>
                            <section>
                                Working at {resource?.employeeLocations?.map((location) => {
                                    return location.location.name
                                })}
                        </section>
                        </>
                }

                {
                    <button className="btn--fireEmployee" onClick={() => { fireEmployee(resource.id) }}>Fire</button>
                }

            </section>

        </article>
    )
}








// {locations.map(
//     (location) => {
//         if (location.id === location?.employeeLocations?.locationId) {
//             return location.name
//         } else {
//             return ""
//         }
//     }
// )}