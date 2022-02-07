import axios from "axios";

const BASE_URL = "http://localhost:5000";

function login(clientLogin) {
  return axios.post(`${BASE_URL}/sign-in`, clientLogin);
};

function signUp(clientData) {
  return axios.post(`${BASE_URL}/sign-up`, clientData);
};

function getCashflow(token) {
  return axios.get(`${BASE_URL}/cashflow`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

function addMovement(token, movement, type) {
  const promise = axios.post(`${BASE_URL}/addMovement/${type}`,
  movement,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return promise;
}

export {
  login,
  signUp,
  getCashflow,
  addMovement
};
