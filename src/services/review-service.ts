import axios from "./axios";

const getCourseReviewById = (courseId: number) => {
  return axios.get(`/courseReview/courseId/${courseId}`).then((response) => {
    return response.data;
  });
};

const getProfessorReviewById = (professorId: number) => {
  return axios
    .get(`/professorReview/professorId/${professorId}`)
    .then((response) => {
      return response.data;
    });
};

const createCourseReview = (data: CourseReview) => {
  return axios.post(`/courseReview/`, data).then((response) => {
    return response.data;
  });
};
const upVoteCourseReview = (id: number) => {
  return axios
    .post(`/courseReview/upVoteCourseReview/${id}`, null)
    .then((response) => {
      return response.data;
    });
};
const downVoteCourseReview = (id: number) => {
  return axios
    .post(`/courseReview/downVoteCourseReview/${id}`, null)
    .then((response) => {
      return response.data;
    });
};
const createProfessorReview = (data: ProfessorReview) => {
  return axios.post(`/professorReview/`, data).then((response) => {
    return response.data;
  });
};
const upVoteProfessorReview = (id: number) => {
  return axios
    .post(`/professorReview/upVoteProfessorReview/${id}`, null)
    .then((response) => {
      return response.data;
    });
};
const downVoteProfessorReview = (id: number) => {
  return axios
    .post(`/professorReview/downVoteProfessorReview/${id}`, null)
    .then((response) => {
      return response.data;
    });
};
const updateCourseReview = (data: Partial<CourseReview>, id: number) => {
  return axios.patch(`/courseReview/${id}`, data).then((response) => {
    return response.data;
  });
};
const updateProfessorReview = (data: Partial<ProfessorReview>, id: number) => {
  return axios.patch(`/professorReview/${id}`, data).then((response) => {
    return response.data;
  });
};
const reportCourse = (data: CourseReport) => {
  return axios.post(`/courseReview/report`, data).then((response) => {
    return response.data;
  });
};
const reportProfessor = (data: ProfessorReport) => {
  return axios.post(`/professorReview/report`, data).then((response) => {
    return response.data;
  });
};
const reviewService = {
  getProfessorReviewById,
  getCourseReviewById,
  createCourseReview,
  upVoteCourseReview,
  downVoteCourseReview,
  createProfessorReview,
  upVoteProfessorReview,
  downVoteProfessorReview,
  updateCourseReview,
  updateProfessorReview,
  reportCourse,
  reportProfessor,
};

export default reviewService;
