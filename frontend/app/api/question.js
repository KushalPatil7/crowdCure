import axios from "./axios.js"


const getAllQuestions = async () => {
  try {
    const response = await axios.get("question/getAllQuestions")
    return response.data
  } catch (error) {
    // More robust error handling
    console.error("Error in getAllQuestions:", error)

    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message
    } else {
      throw "Something went wrong while fetching questions."
    }
  }
}

const createQuestion = async (question) => {
  try {
    const response = await axios.post("question/createQuestion", question)
    return response.data
  } catch (error) {
    console.error("Error in createQuestion:", error)

    if (error.response && error.response.data && error.response.data.message) {
      throw error.response.data.message
    } else {
      throw "Something went wrong while creating the question."
    }
  }
}
export {getAllQuestions, createQuestion}