import Settings from "./Settings"
import { fetchIt } from "./Fetch"

export default {
    async get(id) {
        const user = await fetchIt(`${Settings.remoteURL}/users/${id}`)
        const userLocations = await fetchIt(`${Settings.remoteURL}/employeeLocations?userId=${id}&_expand=location&_expand=user`)
        return await fetchIt(`${Settings.remoteURL}/animalCaretakers?userId=${id}&_expand=animal`)
            .then(data => {
                if(userLocations) {
                    const userWithRelationships = userLocations[0].user
                    userWithRelationships.locations = userLocations
                    userWithRelationships.animals = data
                    
                    return userWithRelationships
                } else {
                    const user = user
                    
                    return user
                }
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
        return await fetchIt(`${Settings.remoteURL}/users?employee=true&_embed=employeeLocations`)
    }
}
