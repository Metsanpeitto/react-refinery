import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import TimezoneSelect from "react-timezone-select"
import { addCalendarEvent } from "../components/Calendar"
import actions from "../redux/actions/actions"
import CalendarIcon from "../icons/calendar"

import '../App.scss';

function Dashboard() {
    const dispatch = useDispatch();
    const dates = useSelector((state) => state.datesReducer)
    const [selectedTimezone, setSelectedTimezone] = useState({})
    const [freeDates, setFreeDates] = useState(dates.freeDates)
    const [selectedDate, setSelectedDate] = useState({})
    const [formOpen, setFormOpen] = useState(null)
    var options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };

    useEffect(() => {
        if (!freeDates || freeDates.length === 0) {
            dispatch(actions.getDates());
        }
        if (dates.freeDates !== freeDates) {
            setFreeDates(dates.freeDates)
        }
    }, dates);


    const handleClick = (date) => {
        setSelectedDate(date);
        setFormOpen(true)
        console.log(date)
        addCalendarEvent(date, "Here", "The event")
    }


    return (
        <main className="app">
            <div className="card">
                <div className="carrousel">
                    <img className='carrousel-img' src='/images/office.png' alt="image" />
                </div>
                <div className="line"></div>
                <div className="timezone-selector">
                    <p>Your current timezone</p>
                    <div className="selector">
                        <TimezoneSelect
                            value={selectedTimezone}
                            onChange={setSelectedTimezone}
                        />
                    </div>
                </div>
                {freeDates[0] ?
                    (<div className="buttons">
                        <button className="btn btn-green" onClick={() => handleClick(freeDates[0][0])}><CalendarIcon />{freeDates[0][0]}</button>
                        <button className="btn btn-green" onClick={() => handleClick(freeDates[0][1])}><CalendarIcon />{freeDates[0][1]}</button>
                        <button className="btn btn-green" onClick={() => handleClick(freeDates[0][2])}><CalendarIcon />{freeDates[0][2]}</button>
                    </div>)
                    :
                    null
                }


                <div className="button-all">
                    <button className="btn btn-more"><i className="fa fa-CalendarIcon" aria-hidden="true"></i>Show all</button>
                </div>
                <div className="fine-line"></div>
                <div className="bottom-group">
                    <div className="left">
                        <div className="left-top">
                            <CalendarIcon />
                            <h6 className="left-top-count">
                                20
                            </h6>
                        </div>
                        <h6 className="left-text">BOOKED</h6>
                    </div>
                    <div className="right">
                        <img className='circle-img' src='/images/stevie.jpg' alt="user" />
                        <p className="right-text">Co-Founder | Co-CEO (ecommerce company) took a <a className="green-link" href="#">spot</a></p>
                        <p className="right-text bold gray">from Penjamo</p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Dashboard;
