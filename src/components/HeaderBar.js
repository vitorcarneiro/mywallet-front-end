import { useContext } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

import UserContext from "../contexts/UserContext";

export default function HeaderBar() {
    
    const { user } = useContext(UserContext);

    return (
        <Header>
            <Link to={`/`}>
                <Logo>
                    TrackIt
                </Logo>
            </Link>

            <UserPic>
                <img src={user.image} alt='profilePic' />
            </UserPic>
        </Header>
    );
}

const Header = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    box-sizing: border-box;

    width: 100%;
    height: 70px;

    background-color: #126BA5;

    padding: 0 18px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);

    a {
        text-decoration: none;
    }
`;

const Logo = styled.div`
    font-family: Playball;
    font-size: 39px;
    font-style: normal;
    font-weight: 400;
    line-height: 49px;
    letter-spacing: 0em;
    text-align: left;

    color: #FFF;
`;

const UserPic = styled.div`
    height: 51px;
    width: 51px;

    border-radius: 50%;

    background-color: #FFF;

    display: flex;
    justify-content: center;
    align-items: center;

    overflow: hidden;

    img { 
        height: 100%
    }
`;