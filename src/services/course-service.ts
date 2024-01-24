import axios from './axios' 

const getCourses = () => {
	return axios.get('/course').then(response => {
		return response.data
	})
}

const createCourse = (data: Partial<Course>) => {
    return axios.post('/course', data).then(response => {
        return response.data
    })
}

const getCourseById = (id: number) => {
	return axios.get(`/course/${id}`).then(response => {
		return response.data
	})
}

const updateCourse = (data: Partial<Course>, id:number) => {
    return axios.patch(`/course/${id}`, data).then(response => {
        return response.data
    })
}

const deleteCourse = (id: number) => {
	return axios.delete(`/course/${id}`).then(response => {
		return response.data
	})
}


const courseService = {
	getCourses,
	getCourseById,
	createCourse,
	updateCourse,
	deleteCourse
}

export default courseService
