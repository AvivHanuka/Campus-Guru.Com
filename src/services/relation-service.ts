import axios from './axios' 

const getRelations = () => {
	return axios.get('/courseProfessorRelation').then(response => {
		return response.data
	})
}

const getRelationById = (id: number) => {
	return axios.get(`/courseProfessorRelation/${id}`).then(response => {
		return response.data
	})
}

const createRelation = (data: Partial<Relation>) => {
	return axios.post('/courseProfessorRelation', data).then(response => {
		return response.data
	})
}

const updateRelation = (data: Partial<Relation>, id: number) => {
	return axios.patch(`/courseProfessorRelation/${id}`, data).then(response => {
		return response.data
	})
}

const deleteRelation = (id: number) => {
	return axios.delete(`/courseProfessorRelation/${id}`).then(response => {
		return response.data
	})
}

const relationsService = {
    getRelations,
    getRelationById,
    deleteRelation,
    updateRelation,
	createRelation
}

export default relationsService
