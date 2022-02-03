import { useState, useEffect, useContext } from "react";
import styled from 'styled-components';
import { Checkbox } from 'react-ionicons';
import Loader from "react-loader-spinner";

import dayjs from "dayjs";
import 'dayjs/locale/pt-br';

import { getTodayHabits, checkHabit, uncheckHabit } from '../services/API.js';
import UserContext from "../contexts/UserContext";

import HeaderBar from './HeaderBar.js'
import FooterBar from './FooterBar.js';

export default function TodayPage() {

    const { user, allTodayTasks, setAllTodayTasks, tasksDoneToday, setTasksDoneToday } = useContext(UserContext);

    const [todayTasks, setTodayTasks] = useState(null);
    
    const todayDate = dayjs().locale("pt-br").format("dddd, DD/MM");

    useEffect(() => {
        const promise = getTodayHabits(user.token);

        promise.then((todayTasksApi) => {
            let doneTasks = 0;
            
            todayTasksApi.data.forEach(task => {
                if (task.done) {
                    doneTasks++;
                }
            });

            setTasksDoneToday(doneTasks);
            setAllTodayTasks(todayTasksApi.data.length)
            setTodayTasks(todayTasksApi.data);
        });

        promise.catch((error) => {
            console.log(error);
        });
    }, [user, tasksDoneToday, setAllTodayTasks, setTasksDoneToday]);

    function toggleCheck(task) {
        if(task.done) {
            const checkPromise = uncheckHabit(user.token, task);

            checkPromise.then((reponse) => {
                setTasksDoneToday(tasksDoneToday - 1);
            });

            checkPromise.catch((error) => {
                console.log(error.response);
            });

        } else {
            const uncheckPromise = checkHabit(user.token, task)

            uncheckPromise.then((reponse) => {
                setTasksDoneToday(tasksDoneToday + 1);
            });

            uncheckPromise.catch((error) => {
                console.log(error.response);
            });
        }
    }

    return (
        <>
            <HeaderBar />
            <Container>
                <DateAndHabitsPercentage>
                    <h1>{todayDate}</h1>
                    { tasksDoneToday === 0 ? (
                        <h2>Nenhum hábito concluído ainda</h2>
                        ) : (
                        <h2 style={{color: '#8FC549'}}>{Math.round((tasksDoneToday/allTodayTasks) * 100)}% dos hábitos concluídos</h2>
                        )
                    }
                </DateAndHabitsPercentage>

                {todayTasks === null ? 
                    <Loader type="ThreeDots" color="#FFF"/>
                    : 
                    todayTasks.map((task) => {
                        return (
                            <Task onClick={() => toggleCheck(task)}>
                                <div>
                                    <h1>{task.name}</h1>
                                    <h2>Sequência atual: <span style={task.done ? {color: '#8FC549'} : {color: '#666666'}}>{task.currentSequence} {task.currentSequence > 1 ? 'dias' : 'dia'}</span></h2>
                                    <h2>Seu recorde: <span style={task.highestSequence !== 0 && task.currentSequence === task.highestSequence ? {color: '#8FC549'} : {color: '#666666'}}>{task.highestSequence} {task.highestSequence > 1 ? 'dias' : 'dia'}</span></h2>
                                </div>

                                <Checkbox
                                    color={task.done ? '#8FC549' : '#EBEBEB'}
                                    height="69px"
                                    width="69px"
                                    />
                            </Task>
                        );
                    })
                }
            </Container>
            <FooterBar />
        </>
    );
}

const Container = styled.main`
    box-sizing: border-box;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    min-height: 100%;
    padding: 100px 18px 115px 18px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    background-color: #E5E5E5;

    a {
        margin-top: 25px;

        font-family: Lexend Deca;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: center;

        color: #52B6FF;
    }
`;

const DateAndHabitsPercentage = styled.div`

    width: 100%;
    height: 70px;

    h1 {
        font-family: Lexend Deca;
        font-size: 23px;
        font-style: normal;
        font-weight: 400;
        line-height: 29px;
        letter-spacing: 0em;
        text-align: left;
        color: #126BA5;
        margin: 0;
    }

    h2 {
        font-family: Lexend Deca;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
        letter-spacing: 0em;
        text-align: left;
        color: #BABABA;
        margin: 0;
    }

`;

const Task = styled.div`
    box-sizing: border-box;

    width: 100%;
    height: 94px;
    background-color: #FFF;

    padding: 13px 15px;

    border-radius: 5px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    cursor: pointer;

    h1 {
        font-family: Lexend Deca;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: 25px;
        letter-spacing: 0em;
        text-align: left;
        
        color: #666666;
        margin: 0;
        margin-bottom: 7px;
    }

    h2 {
        font-family: Lexend Deca;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
        letter-spacing: 0em;
        text-align: left;

        color: #666666;
        margin: 0;
    }
`;
