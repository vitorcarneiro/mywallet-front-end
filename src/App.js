import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import UserContext from "./contexts/UserContext.js";

import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import CashflowPage from './pages/CashflowPage.js';
import MovementPage from './pages/MovementPage.js';

export default function App() {

    const userLocalStorage = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(userLocalStorage);

    const [allTodayTasks, setAllTodayTasks] = useState(0);
    const [tasksDoneToday, setTasksDoneToday] = useState(0);

    function setAndPersistUser(user) {
		setUser(user);
		localStorage.setItem("user", JSON.stringify(user));
	}

    return (
        <UserContext.Provider value={{ user, allTodayTasks, setAllTodayTasks, tasksDoneToday, setTasksDoneToday, userLocalStorage, setAndPersistUser }}>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <LoginPage /> }></Route>
                        <Route path="/register" element={ <RegisterPage /> }></Route>
                        <Route path="/cashflow" element={ <CashflowPage /> }></Route>
                        <Route path="/movement/:type" element={ <MovementPage /> }></Route>
                    </Routes>
            </BrowserRouter>
        </UserContext.Provider>

    );
}