import { useState, useContext, useEffect } from "react";
import styled from 'styled-components';
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Loader from "react-loader-spinner";
import CurrencyInput from 'react-currency-input-field';


import { login } from '../services/API.js';
import UserContext from "../contexts/UserContext";

export default function Home() {
	const { type } = useParams();
    const navigate = useNavigate();

    const typeText = type === 'cash-in' ? 'entrada' : 'saída';

    const [isLoading, setIsLoading] = useState(false);
    const [stringCashValue, setStringCashValue] = useState('');
    const [cashValue, setCashValue] = useState(0);
    const [description, setDescription] = useState('');
    const { user, setAndPersistUser } = useContext(UserContext);
    
    function handleNewMovimentation(event) {
        event.preventDefault();
        setIsLoading(true);

        const cashArray = stringCashValue.split(',')
        const decimal = cashArray[1]?.substring(0, cashArray[1].length - 1)
        
        if (decimal) { cashArray[1] = decimal };
        
        setCashValue(parseFloat(cashArray.join('.')));
   
        /* Servidor aqui */
    };

    return (
        <Container>
            <Top>
                <h1>Nova {typeText}</h1>
            </Top>

            <LoginForm onSubmit={handleNewMovimentation} isLoading={isLoading}>
                <CurrencyInput
                    decimalSeparator=","
                    disableGroupSeparators={true}
                    placeholder="Valor"
                    allowNegativeValue={false}
                    decimalScale={2}
                    onChange={(e) => setStringCashValue(e.target.value)}
                    required
                />

                <input
                    type="text"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <Button type="submit" isLoading={isLoading}>
                    {isLoading ? (
                        <Loader type="ThreeDots" color="#FFF" height={13} width={51} />
                    ) : (
                        `Salvar ${typeText}`
                    )}
                </Button>
            </LoginForm>   
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;

    background-color: #8C11BE;
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: normal;
    color: #FFF;

    main {
        height: 75%;
        width: 100%;
        position: relative;

        border-radius: 5px;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
        overflow: hidden;
    }
`;

const Top = styled.header`
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        margin: 0;
        font-size: 26px;
        font-weight: 700;
    }

`;

const LoginForm = styled.form`
    margin-top: 24px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    gap: 10px;

    input {
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
    }
`;

const Button = styled.button`
    height: 45px;
    width: 303px;

    border: 0px solid transparent;
    border-radius: 5px;
    background: #A328D6;

    font-size: 21px;
    font-style: normal;
    font-weight: 700;
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


const Balance = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 35px;
    
    box-sizing: border-box;
    padding: 12px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    
    background-color: #FFF;
    border-radius: 0 0 5px 5px;
    box-shadow: 5px 5px 0px rgba(0, 0, 0, 0.15);

    div {
        font-size: 17px;
        font-weight: 700;
        color: #000;
    }
`;

const CashData = styled.div`
    font-size: 16px;
    text-align: left;

    width: 100%;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
`;

const Date = styled.p`
    color: #C6C6C6;
`;

const Description = styled.p`
    color: #000;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap; 
`;
