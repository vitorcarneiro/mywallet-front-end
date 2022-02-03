import { useState, useContext, useEffect } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Loader from "react-loader-spinner";

import { login } from '../services/API.js';
import UserContext from "../contexts/UserContext";

export default function LoginPage() {

    const [isLoading, setIsLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const { user, setAndPersistUser } = useContext(UserContext);

    useEffect(() => {
        if (user){
         navigate("/hoje")   
        }
    },[navigate, user])

    function handleLogin(event) {
        event.preventDefault();

        const clientLogin = {
            email: email,
            password: password
        }

        startLogin(clientLogin);
    };

    function startLogin(clientLogin) {
        setIsLoading(true);

        const promise = login(clientLogin);

        promise.then((clientData) => {
            setAndPersistUser(clientData.data);
        
            navigate('/hoje');
        });
        
        promise.catch((error) => {
            console.log(error.response);
            alert(`STATUS: ${error.response.status}
            
                ${error.response.data.message}
                ${(error.response.data.details) ? error.response.data.details : ""}
            `);

            setIsLoading(false);
        });
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

            <StyledLink to={`/register`} isLoading={isLoading}>
                Primeira vez? Cadastre-se!
            </StyledLink>

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

const StyledLink = styled(Link)`
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