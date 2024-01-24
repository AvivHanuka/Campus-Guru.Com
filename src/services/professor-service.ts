import axios from './axios' 

const getProfessors = () => {
	return axios.get('/professor').then(response => {
		return response.data
	})
}

const createProfessor = (data: Partial<Professor>) => {
    return axios.post('/professor', data).then(response => {
        return response.data
    })
}

const updateProfessor = (data: Partial<Professor>, id:number) => {
    return axios.patch(`/professor/${id}`, data).then(response => {
        return response.data
    })
}

const getProfessorById = (id: number) => {
	return axios.get(`/professor/${id}`).then(response => {
		return response.data
	})
}

const deleteProfessor = (id: number) => {
	return axios.delete(`/professor/${id}`).then(response => {
		return response.data
	})
}


const professorService = {
	getProfessors,
    getProfessorById,
    createProfessor,
	updateProfessor,
    deleteProfessor
}

export default professorService
