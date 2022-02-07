import axios from "axios";

const BASE_URL = "http://localhost:5000";

async function login(clientLogin) {
  try {
    await axios.post(`${BASE_URL}/sign-in`, clientLogin);
    
  } catch (error) {
    
  }
};

function signUp(clientData) {
  return axios.post(`${BASE_URL}/sign-up`, clientData);
};

function getTodayHabits(token) {
  const promise = axios.get(`${BASE_URL}/habits/today`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return promise;
}

function getAllHabits(user) {
  const promise = axios.get(`${BASE_URL}/habits`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    }
  );
  return promise;
}

function checkHabit(token, task) {
  const promise = axios.post(`${BASE_URL}/habits/${task.id}/check`,
    task,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return promise;
}

function uncheckHabit(token, task) {
  const promise = axios.post(`${BASE_URL}/habits/${task.id}/uncheck`,
  task,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return promise;
}

function createHabit(token, habit) {
  const promise = axios.post(`${BASE_URL}/habits`,
  habit,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return promise;
}

function deleteHabit(token, id) {
  const promise = axios.delete(`${BASE_URL}/habits/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return promise;
}

function getHistoryDailyHabits(token) {
  const promise = axios.get(`${BASE_URL}/habits/history/daily`,
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
  getTodayHabits,
  getAllHabits,
  checkHabit,
  uncheckHabit,
  createHabit,
  deleteHabit,
  getHistoryDailyHabits
};
