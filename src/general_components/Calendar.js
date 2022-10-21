import { Temporal } from '@js-temporal/polyfill';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import arrow from '../svgs/arrowup.svg';


//styles and at line 130

const StyledFlexContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 67%;
`

const StyledCalendarBox = styled.div`
    aspect-ratio: 10 / 10;
    height: ${props => props.theme.boxHeight};
    border: 0.07cm solid ${props => props.theme.tc};
    margin: 1cm;

`
const StyledCalendarBoxBody = styled.div`
height: 100%;
width: 100%;
display: grid;
grid-template-columns: repeat(7, 1fr);
grid-template-rows: repeat(8, 1fr);
`
const StyledCalendarBoxHeader = styled.div`
    border-bottom: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: ${props => props.theme.ic4};
    grid-column: 1 / -1;
    grid-row: 1 / 2;
`
const StyledMonthName = styled.div`
    font-size: 1.8rem;
    font-weight: 500;
    justify-self: left;
    margin-left: 2rem;
`
const StyledArrowWrapper = styled.div`
    width: 3cm;
    height: 0.9cm;
    display: flex;
    justify-content: center;
    align-items: center;


    img{
        height: 80%;
        aspect-ratio: 1 / 1;
        cursor: pointer;
        border-radius: 50%;
        margin: 0.03cm;
        padding: 0.03cm;
    }
    img:hover{
        background-color: grey; 
    }
    .down{
        transform: rotate(180deg)
    }
`
const StyledDay = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    cursor: pointer;
    background-color: ${props => props.state  ?  props.theme.hc5 : `rgba(160, 235, 199, ${Math.sqrt(props.appointmentsOnDate * 0.3)})`};

    &:hover{
        background-color: ${props => props.state  ? props.theme.hc5 : props.theme.hc3};
    }
    span{
        font-size: 1rem;
        margin: 0;
        font-weight: 500;
    }
`
const StyledDayName = styled.div`
    width: 100%;
    height: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 1;
    border-bottom: 0.06cm solid ${props => props.theme.tc};
    span{
        font-size: 1.2em;
        font-weight: 500;
        margin: 0;
        color: ${props => props.theme.tc2};
    }
`
const StyledBlankBox = styled.div`
    height: 100%;
    width: 100%;

`


const StyledAppointment = styled.div`
    height: 1cm;
    width: 80%;
    border: 0.07cm solid ${props => props.theme.tc};
    display: flex;
    align-items: center;
    justify-content: right;
    span{
        width: 5cm;
        height: 1cm;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    span > span{
        display: inline;
        font-size: 1.4rem;
    }
    div{
        width: 1cm;
        aspect-ratio: 1 / 1;
        border-left: 0.07cm solid ${props => props.theme.tc};
        display: flex;
        align-items: center;
        justify-content: center;
    }
    img{
        height: 60%;
        aspect-ratio: 1 / 1;
    }
`

const Calendar = ({ parentISODate, setDateForParent, appointments}) => {
    const now = Temporal.Now.plainDateISO()

    const [daysArray, setDaysArray] = useState([])
    const [sn, setsn] = useState([])

    useEffect(() => {
        let arr = []
        for(let i = 1 ; i <= parentISODate.daysInMonth ; i +=1 ){
            arr.push(parentISODate.with({day: i}))
        }
        setDaysArray(arr)

    }, [parentISODate.month])
    useEffect(() => {
        setDateForParent(prev => parentISODate)
    }, [parentISODate])

    const decrementMonth = () => {
        if(now.month < parentISODate.month || now.year < parentISODate.year){setDateForParent(prev => prev.subtract({months: 1}))} 
    }
    const incrementMonth = () => {
        
        if(now.month !== parentISODate.month ||  now.year === parentISODate.year){setDateForParent(prev=> prev.add({months : 1}))}
    }
    
    const dayNames = [null, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const monthNames = [null, 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    
    
    useEffect(() => {
        if(daysArray.length !== 0){
        }
        try {
            setsn([1, 2, 3, 4 ,5 ,6 ,7].slice(0, daysArray[0].dayOfWeek - 1))
        } catch (error) {
        }



    }, [parentISODate.month, daysArray])


    //TODO set up a calendar upper limit prop
    return(
        <>
        <StyledCalendarBox>
        
        <StyledCalendarBoxBody>
        <StyledCalendarBoxHeader>
            <StyledMonthName>{monthNames[parentISODate.month]} {parentISODate.year}</StyledMonthName>
            <StyledArrowWrapper>
            <img className='down' src={arrow} alt='down' onClick={decrementMonth} />
            <img src={arrow} alt='up' onClick={incrementMonth} />
            </StyledArrowWrapper>
        </StyledCalendarBoxHeader>
        {
            dayNames.filter(e => e !== null).map(
                dayName => (
                    <StyledDayName 
                    key={dayName}>
                        <span>
                            {dayName.substring(0, 3)}
                        </span>
                    </StyledDayName>
                )
            )
        }
        {
            sn.map(e=> (<StyledBlankBox key={uuidv4()}/>))
        }
        {daysArray.map(calendarDay => 
            
            (<StyledDay 
                appointmentsOnDate={appointments.filter(e => e.date.dateAsString === calendarDay.toString()).length} 
                state={parentISODate.equals(calendarDay)} 
                day={calendarDay}  
                key={calendarDay.day} 
                onClick={() => setDateForParent(calendarDay)} >
                <span>{calendarDay.day}</span>
            </StyledDay>))
        
        }
             
        </StyledCalendarBoxBody>
        </StyledCalendarBox>
        </>
    )
}
export default Calendar