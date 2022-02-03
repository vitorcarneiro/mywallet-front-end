import { useContext } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import UserContext from "../contexts/UserContext";

export default function FooterBar() {
    
    const { allTodayTasks,  tasksDoneToday} = useContext(UserContext);
    const percentage = allTodayTasks === 0 ? 0 : Math.round((tasksDoneToday/allTodayTasks) * 100);

    return (
        <Footer>
            <StyledLink to={`/habitos`}>
                Hábitos
            </StyledLink>

            <ProgressCircle>
                <StyledLink to={`/hoje`}>
                    <CircularProgressbar
                        value={percentage}
                        text={`Hoje`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#52B6FF",
                            textColor: "#FFF",
                            pathColor: "#FFF",
                            trailColor: "transparent",
                            fontSize: "18px",
                        })} 
                        />
                </StyledLink>
            </ProgressCircle>

            <StyledLink to={`/historico`}>
                Histórico
            </StyledLink>
        </Footer>
    );
}

const Footer = styled.footer`
    box-sizing: border-box;

    position: fixed;
    z-index: 1;
    bottom: 0;
    left: 0;

    width: 100%;
    height: 70px;

    background-color: #FFF;

    padding: 0 36px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    font-family: Lexend Deca !important;
`;

const ProgressCircle = styled.div`
    height: 91px;
    width: 91px;
  
    margin-bottom: 50px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }

    color: #52B6FF;
    font-size: 18px !important;
    font-style: normal;
    font-weight: 400;

    text-decoration: none;
    margin: 0 !important;

    ${({ isLoading }) =>
        (isLoading && `
            opacity: 0.7 !important;
            pointer-events: none !important;
        `)
    };
`;
