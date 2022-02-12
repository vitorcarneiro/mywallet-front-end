import axios from "axios";

const BASE_URL = "https://my-wallet-vitor.herokuapp.com";

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

function addMovement(token, movementInfo, type) {
  return axios.post(`${BASE_URL}/addMovement/${type}`,
  movementInfo,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}

export {
  login,
  signUp,
  getCashflow,
  addMovement
};
