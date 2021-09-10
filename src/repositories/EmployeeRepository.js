import Settings from "./Settings"
import { fetchIt } from "./Fetch"
import LocationRepository from "./LocationRepository"

export default {
    async get(id) {
        const userLocations = await fetchIt(`${Settings.remoteURL}/employeeLocations?userId=${id}&_expand=location&_expand=user`)
        return await fetchIt(`${Settings.remoteURL}/animalCaretakers?userId=${id}&_expand=animal`)
            .then(data => {
                const userWithRelationships = userLocations[0].user
                userWithRelationships.locations = userLocations
                userWithRelationships.animals = data
                return userWithRelationships
            })
    },
    async delete(id) {
        return await fetchIt(`${Settings.remoteURL}/users/${id}`, "DELETE")
    },
    async addEmployee(employee) {
        return await fetchIt(`${Settings.remoteURL}/users`, "POST", JSON.stringify(employee))
    },
    async assignEmployee(rel) {
        return await fetchIt(`${Settings.remoteURL}/employeeLocations`, "POST", JSON.stringify(rel))
    },
async getAll() {
    const locations = await LocationRepository.getAll() // locations contains the names and ids of the two locations
    return await fetchIt(`${Settings.remoteURL}/users?employee=true&_embed=employeeLocations&_embed=animalCaretakers`)
    .then((usersArray)=> { // users array is the array of employee locations and animal caretakers
        const monstrosity = usersArray.map((userObject) => { // monstrosity is the result of mapping over the object, then mapping over employee locations, and then mapping ovet the locations, and finding the place id associated with the correct locationId. we chouls be left with the correct place id
           
            userObject.employeeLocations = userObject.employeeLocations.map((location)=> { // mapping over the locations on the user object
                location.location = locations.find((place)=> { // returns object that matches place.id
                    return place.id === location.locationId
                }) 
                return location 
            })
            return userObject
        })
        console.log(monstrosity) 
        return monstrosity
    })
 
}
}
