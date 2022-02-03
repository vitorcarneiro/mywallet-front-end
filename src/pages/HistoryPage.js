import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import dayjs from "dayjs";
import 'dayjs/locale/pt-br';

import { getHistoryDailyHabits } from '../services/API.js';
import UserContext from "../contexts/UserContext";

import HeaderBar from '../components/HeaderBar.js';
import FooterBar from '../components/FooterBar.js';

export default function HistoryPage() {

    const { user } = useContext(UserContext);
    const [history, setHistory] = useState([]);
    const [daysWithHabits, setDaysWithHabits] = useState([]);


    useEffect(() => {
        const promise = getHistoryDailyHabits(user.token);
       
        promise.then((historyApi) => {
            setHistory(historyApi.data);
            
            let habitDays = [];
            historyApi.data.forEach(day => {
                habitDays.push(day.day);
            });
    
            setDaysWithHabits(habitDays);
        });

        promise.catch((error) => {
            console.log(error.response);
            alert(`STATUS: ${error.response.status}
            
                ${error.response.data.message}
                ${(error.response.data.details) ? error.response.data.details : ""}
            `);
        });

    }, [user.token])
    
    function checkDay(date) {
        const day = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
        
        return daysWithHabits.includes(day);    
    }
    
    function checkDayCompleted(date) {
        const day = `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth() + 1)).slice(-2)}/${date.getFullYear()}`;
        
        let isDayCompleted = 'day-completed';

        history.forEach(date => {
            if(date.day === day){
                date.habits.forEach(habit => {
                    
                    if(!habit.done) {
                        isDayCompleted = 'day-uncompleted';
                    }
                });   
            }
        });

        return isDayCompleted;
    }
    return (
        <>
            <HeaderBar />
            <Container>
                <HistoryTitle>
                    <h1>Histórico</h1>
                </HistoryTitle>

                <Calendar
                    locale={'pt-br'}
                    calendarType={'US'}
                    formatDay={(locale, date) => dayjs(date).format('DD')}


                    tileClassName={({ activeStartDate, date, view }) => view === 'month' &&
                        checkDay(date) ?
                        checkDayCompleted(date) :
                        null}                    
                />
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
    padding: 70px 18px 115px 18px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;

    background-color: #E5E5E5;

    .react-calendar {
        width: 335px;
        height: 402px;
        
        font-family: Lexend Deca;
        background: white;
        border: 1px solid #FFF;
        border-radius: 10px;

    }

    .react-calendar__month-view__weekNumbers .react-calendar__tile {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.75em;
      font-weight: bold;
      padding: calc(0.75em / 0.75) calc(0.5em / 0.75);
    }

    .react-calendar__month-view__days__day {
      font-size: 0.9em;
    }

    .react-calendar__tile {
      width: 45px !important;
      height: 45px !important;
      text-align: center;
      padding: 0.75em 0.5em;
      background: none;
    }
    
    .react-calendar__tile--now {
      background: #ffff76 !important;
      &::after {
        content: "";
        background-color: transparent !important;
      }
    }  

    .react-calendar__tile--active {
    background: #1087ff !important;
    color: #000 !important;
    }


    .day-completed {
        position: relative;
        background: transparent;
        z-index: 2;

        &::after {
            content: "";
            position: absolute;
            width: 2.5em;
            height: 2.5em;
            left: 0.38em;
            top: 0.35em;
            border-radius:100%;
            background-color: #8FC549;
            z-index: -1; 
        }
    }

    .day-uncompleted{
        position: relative;
        background: transparent;
        z-index: 2;

        &::after {
            content: "";
            position: absolute;
            width: 2.5em;
            height: 2.5em;
            left: 0.38em;
            top: 0.35em;
            border-radius:100%;
            background-color: #E75766;;
            z-index: -1; 
        }
    }
`;

const HistoryTitle = styled.div`
    width: 100%;
    height: 70px;

    display: flex;
    justify-content: space-between;
    align-items: center;

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
`;
