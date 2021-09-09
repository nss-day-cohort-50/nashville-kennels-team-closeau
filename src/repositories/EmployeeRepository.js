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
        const locations = await LocationRepository.getAll()
        return await fetchIt(`${Settings.remoteURL}/users?employee=true&_embed=employeeLocations&_embed=animalCaretakers`)
        .then((usersArray)=> {
            const monstrosity = usersArray.map((userObject) => {
                userObject.employeeLocations = userObject.employeeLocations.map((location)=> {
                    location.location = locations.find((place)=> {
                        return place.id === location.locationId
                    }) 
                    return location 
                })
                return userObject
            })
            console.log(monstrosity)
        })

    }
}
