import { useState, useContext, useEffect } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Loader from "react-loader-spinner";
import { ExitOutline, AddCircleOutline, RemoveCircleOutline} from 'react-ionicons'


import { login } from '../services/API.js';
import UserContext from "../contexts/UserContext";

export default function CashflowPage() {

    const [isLoading, setIsLoading] = useState(false);
    const [hasData, setHasData] = useState(false);
    const { user, setAndPersistUser } = useContext(UserContext);
    const navigate = useNavigate();

    /* Servidor aqui */

    const name = 'Vitor Carneiro';

    const cashFlowData = [
        {
            date: "30/11",
            description: "Almoço mãeeeeeeeeeeeeeeeeeeeeeeeeeee",
            value: -39.90
        },
        {
            date: "27/11",
            description: "Mercado",
            value: -542.54
        },
        {
            date: "26/11",
            description: "Compras Churrasco",
            value: -67.60
        },
        {
            date: "20/11",
            description: "Empréstimo Maria",
            value: 500.00
        },
        {
            date: "15/11",
            description: "Salário",
            value: 3000.00
        }
    ];

    const balance = cashFlowData?.map((cashData) => cashData.value).reduce((partialSum, a) => partialSum + a, 0);

    return (
        <Container>
            <Top>
                <h1>Olá, {name}</h1>
                <ExitOutline className='ion-icon'
                    color={'#ffffff'} 
                    height="25px"
                    width="25px"
                />
            </Top>

            <main>
                <CashFlow hasData={hasData}>
                    {hasData ? 
                        cashFlowData.map((cashData) =>
                        <CashData>
                                <Date>
                                    {cashData.date}
                                </Date>

                                <Description>
                                    {cashData.description}
                                </Description>

                                <Value isPositive={cashData.value >= 0 ? true : false}>
                                    {cashData.value.toFixed(2)}
                                </Value>
                            </CashData>
                        )
                    
                    :
                    <p>Não há registros de<br/>entrada ou saída</p>   
                    }

                </CashFlow>

                <Balance>
                    <div>
                        {hasData ? 'SALDO' : ''}
                    </div>

                    <Value isPositive={balance}>
                        {hasData ? balance : ''}
                    </Value>
                </Balance>
            </main>

            <Buttons>
                <Button to={`/movement/cash-in`} isLoading={isLoading}>
                    <AddCircleOutline
                        color={'#FFF'} 
                        height="25px"
                        width="25px"
                    />

                    <p>Nova<br/>entrada</p>
                </Button>

                <Button to={`/movement/cash-out`} isLoading={isLoading}>
                    <RemoveCircleOutline
                        color={'#FFF'} 
                        height="25px"
                        width="25px"
                    />

                    <p>Nova<br/>saída</p>
                </Button>
            </Buttons>
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
    justify-content: space-between;

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
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap; 
    }

    .ion-icon {
        cursor: pointer;
    }
`;

const CashFlow = styled.div`
    width: 100%;
    height: 100%;

    box-sizing: border-box;
    padding: 12px 12px 42px 12px;

    background-color: #FFF;

    font-size: 20px;
    text-align: center;
    color: #868686;

    display: flex;
    flex-direction: column;
    justify-content: start;

    overflow-y: scroll;

    ${({ hasData }) => 
        (hasData ? 'justify-content: start;' : 'justify-content: center;'
    )}
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

const Value = styled.p`
    ${({ isPositive }) => isPositive ? "color: #03AC00;" : "color: #C70000;"}
`;

const Buttons = styled.div`
    height: 15%;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Button = styled(Link)`
    width: 48%;
    height: 100%;

    box-sizing: border-box;
    padding: 10px;

    background-color: #A328D6;
    border: none;
    border-radius: 5px;

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    overflow: hidden;
    cursor: pointer;

    &:focus, &:visited, &:link, &:active, &:hover {
        text-decoration: none;
    }

    p {
        font-size: 17px;
        font-weight: 700;
        color: #FFF;
        text-decoration: none;
        text-align: left;
        margin: 0;
    }
`;

