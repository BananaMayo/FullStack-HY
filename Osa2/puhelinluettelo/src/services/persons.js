import axios from "axios"
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const remove = (Id) => {
    return axios.delete(`${baseUrl}/${Id}`)
}

const update = (newObject) => {
    return axios.put(`${baseUrl}/${newObject.id}`, {name: newObject.name, number: newObject.number, id:newObject.id})
}

export default { getAll: getAll, create: create , remove:remove, update:update}