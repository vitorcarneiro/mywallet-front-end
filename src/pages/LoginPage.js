import { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Loader from "react-loader-spinner";

import { login } from '../services/API.js';
import useAuth from "../hooks/useAuth";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { auth, storeLogin } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (auth && auth.token) {
            navigate("/cashflow")   
        }
    }, [auth]);
    

    async function handleLogin(event) {
        event.preventDefault();
        setIsLoading(true);

        try {
            const promise = await login({email, password});
            
            setIsLoading(false);

            console.log(promise);
            storeLogin(promise.data);
            navigate('/cashflow');

        } catch (error) {
            console.log(error.response);
            alert(`STATUS: ${error.response.statusText} (${error.response.status})
            
            ${error.response.data}
            `);
            
            setIsLoading(false);
        }
    
    };

    return (
        <Container>
            <h1>MyWallet</h1>

            <LoginForm onSubmit={handleLogin}>
                <Input type="email"
                    id="email"
                    placeholder="E-mail"
                    isLoading={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Input type="password"
                    id="password"
                    placeholder="Senha"
                    isLoading={isLoading}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button type="submit" isLoading={isLoading}>
                    {isLoading ? (
                        <Loader type="ThreeDots" color="#FFF" height={13} width={51} />
                    ) : (
                        "Entrar"
                    )}
                </Button>
            </LoginForm>

            <LogInButton to={`/register`} isLoading={isLoading}>
                Primeira vez? Cadastre-se!
            </LogInButton>

        </Container>
    );
}

const Container = styled.main`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background-color: #8C11BE;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: normal;

    h1 {
        font-family: 'Saira Stencil One', cursive;
        color: #FFF;
        font-style: normal;
        font-weight: normal;
        font-size: 32px;
        margin: 0;
    }
`;

const LoginForm = styled.form`
    margin-top: 24px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: 10px;
`;

const Input = styled.input`
    width: 303px;
    height: 45px;

    background: #FFFFFF;
    border: 1px solid #FFFFFF;
    box-sizing: border-box;
    border-radius: 5px;

    padding: 11px;

    font-size: 20px;
    line-height: 25px;
    color: black;

    ::-webkit-input-placeholder {
        color: #D5D5D5;
    }
    :-moz-placeholder {
        color: #D5D5D5;
        opacity:  1;
    }
    ::-moz-placeholder {
        color: #D5D5D5;
    opacity:  1;
    }
    :-ms-input-placeholder {
        color: #D5D5D5;
    }
    ::-ms-input-placeholder {
        color: #D5D5D5;
    }

    ::placeholder {
        color: #D5D5D5;
    }

    ${({ isLoading }) =>
        (isLoading && `
            background: #F2F2F2;
            color: #AFAFAF;
            opacity: 0.7;
            pointer-events: none;
        `)
    };
`;

const Button = styled.button`
    height: 45px;
    width: 303px;

    border: 0px solid transparent;
    border-radius: 5px;
    background: #A328D6;

    font-size: 21px;
    font-style: normal;
    font-weight: 600;
    color: #FFFFFF;

    cursor: pointer;

    ${({ isLoading }) =>
        (isLoading && `
            opacity: 0.7;
            pointer-events: none;
        `)
    };
`;

const LogInButton = styled(Link)`
    text-decoration: none;

    &:focus, &:visited, &:link, &:active {
        text-decoration: none;
    }

    &:hover {
        text-decoration: underline;
    }

    margin-top: 25px;
    font-size: 14px;
    color: #FFF;

    ${({ isLoading }) =>
        (isLoading && `
            opacity: 0.7 !important;
            pointer-events: none !important;
        `)
    };
`;