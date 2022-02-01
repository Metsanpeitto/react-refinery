import React, { useState } from "react"
import TimezoneSelect from "react-timezone-select"
import Calendar from "../icons/calendar"
import '../App.scss';

function Dashboard() {
    const [selectedTimezone, setSelectedTimezone] = useState({})
    const [selectedDate, setSelectedDate] = useState({})
    const [formOpen, setFormOpen] = useState(null)

    var options = { weekday: 'short', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
    const date = new Date();
    const dateToday = new Date(date.setDate(date.getDate()));
    const dateTomorrow = new Date(date.setDate(date.getDate() + 1));
    const dateAfterTomorrow = new Date(date.setDate(date.getDate() + 2));

    const handleClick = (date) => {
        setSelectedDate(date);
        setFormOpen(true)
        console.log(date)
    }

    const cardMain = (<div className="card">
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
        <div className="buttons">
            <button className="btn btn-green" onClick={() => handleClick(dateToday)}><Calendar />{dateToday.toLocaleTimeString('en-US', options)}</button>
            <button className="btn btn-green" onClick={() => handleClick(dateTomorrow)}><Calendar />{dateTomorrow.toLocaleTimeString('en-US', options)}</button>
            <button className="btn btn-green" onClick={() => handleClick(dateAfterTomorrow)}><Calendar />{dateAfterTomorrow.toLocaleTimeString('en-US', options)}</button>
        </div>
        <div className="button-all">

            <button className="btn btn-more"><i className="fa fa-calendar" aria-hidden="true"></i>Show all</button>
        </div>
        <div className="fine-line"></div>
        <div className="bottom-group">
            <div className="left">
                <div className="left-top">
                    <Calendar />
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
    </div>)

    const cardForm = (<div className="card">

    </div>)

    return (
        <main className="app">
            {
                formOpen ?
                    cardForm : cardMain}


        </main>
    );
}

export default Dashboard;
