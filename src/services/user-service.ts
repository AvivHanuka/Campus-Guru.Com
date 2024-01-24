import axios from './axios' 

const getUsers = () => {
	return axios.get('/user').then(response => {
		return response.data
	})
}

const deleteUser = (id: number) => {
	return axios.delete(`/user/${id}`).then(response => {
		return response.data
	})
}

const userService = {
	getUsers,
    deleteUser
}

export default userService
