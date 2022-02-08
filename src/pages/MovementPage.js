import { useState } from "react";
import styled from 'styled-components';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import Loader from "react-loader-spinner";
import CurrencyInput from 'react-currency-input-field';

import { addMovement } from "../services/API";
import useAuth from "../hooks/useAuth";

export default function Home() {
    const { auth } = useAuth();
	const { type } = useParams();
    const navigate = useNavigate();
    const typeText = type === 'cash-in' ? 'entrada' : 'saída';
    
    const [isLoading, setIsLoading] = useState(false);
    const [stringCashValue, setStringCashValue] = useState('');
    const [description, setDescription] = useState('');
    
    async function handleNewMovimentation(event) {
        event.preventDefault();
        setIsLoading(true);

        const cashArray = stringCashValue.split(',');

        let decimal;
        if (cashArray[1]) {
            if (cashArray[1].length === 3) {
                decimal = cashArray[1]?.substring(0, cashArray[1].length - 1);
            }
        }

        if (decimal) { cashArray[1] = decimal };
        const cashValue = parseFloat(cashArray.join('.'));
   
        try {
            await addMovement(auth.token, { description, movement: cashValue }, type);
            setIsLoading(false);
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