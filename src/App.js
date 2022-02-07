import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import CashflowPage from './pages/CashflowPage.js';
import MovementPage from './pages/MovementPage.js';

export default function App() {

    return (
        <AuthProvider>
            <BrowserRouter>
                    <Routes>
                        <Route path="/" element={ <LoginPage /> }></Route>
                        <Route path="/register" element={ <RegisterPage /> }></Route>
                        <Route path="/cashflow" element={ <CashflowPage /> }></Route>
                        <Route path="/movement/:type" element={ <MovementPage /> }></Route>
                    </Routes>
            </BrowserRouter>
        </AuthProvider>

    );
}