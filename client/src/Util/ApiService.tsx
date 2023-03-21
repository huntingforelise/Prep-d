const BASE_URL = "http://localhost:4000";

export const getUser = (email: string | undefined): Promise<any> =>
  fetch(`${BASE_URL}/getuser/${email}`)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => err);

export const createUser = async (newUser: User): Promise<any> => {
  console.log(newUser);
  try {
    const response = await fetch(`${BASE_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

export const getInterview = (id: string): Promise<any[]> =>
  fetch(`${BASE_URL}/interview/${id}`)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => err);

export const getInterviews = (id: string) =>
  fetch(`${BASE_URL}/get-all-interviews/${id}`)
    .then((res) => (res.status <= 400 ? res : Promise.reject(res)))
    .then((res) => res.json())
    .catch((err) => err);
    
export const punctuate = async (text: string): Promise<any> => {
  return fetch (`${BASE_URL}/punctuate`, {
    method: "POST",
    body: JSON.stringify({ text }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

export const createInterview = async (userna_id: string): Promise<any> => {
  return fetch (`${BASE_URL}/${userna_id}`, {
    method: "UPDATE",
    body: JSON.stringify({ userna_id }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

export const updateAnswer = async (interview_id: string, question_text: string, answer_audio_url: string, answer_text: string, feedback: string, score: number): Promise<any> => {
  return fetch (`${BASE_URL}/${interview_id}/answer`, {
    method: "UPDATE",
    body: JSON.stringify({ interview_id, question_text, answer_audio_url, answer_text, feedback, score }),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err));
}

//TODO move cloudinary upload here
export const saveSolution = async (solution: Solution) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/problem`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(solution),
      }
    );
    const savedSolution = await response.json();
    return savedSolution;
  } catch (error) {
    console.error('Error saving solution:', error);
  }
};

export const getSolutions = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/problems/:${userId}}`
    );
    const solutions = await response.json();
    return solutions;
  } catch (error) {
    console.error('Error getting solutions:', error);
  }
}

export const getProblems = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/problems`
    );
    const problems = await response.json();
    return problems;
  } catch (error) {
    console.error('Error getting problems:', error);
  }
}
