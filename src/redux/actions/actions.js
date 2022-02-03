import axios from 'axios';
import api from "../../api/api";

import * as types from "../constants/action-types";

let CALENDAR_ID = process.env.REACT_APP_CALENDAR_ID;

const receiveBusyDates = (data) => ({
    type: types.RECEIVE_BUSY_DATES,
    data,
});



export const getDates = () => (dispatch) => {
    api.postJWT(api.getJWT(), async function (response) {
        let token = JSON.parse(response).access_token;
        const url = `https://www.googleapis.com/calendar/v3/freeBusy`;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const date = new Date();
        const dateToday = new Date(date.setDate(date.getDate()));
        const dateAfterTomorrow = new Date(date.setDate(date.getDate() + 2));

        const bodyParameters = {
            "timeMin": dateToday,
            "timeMax": dateAfterTomorrow,
            "timeZone": "Asia/Jerusalem",
            "groupExpansionMax": 10,
            "calendarExpansionMax": 10,
            "items": [
                {
                    "id": CALENDAR_ID
                }
            ]
        }
        let res = await axios.post(
            url,
            bodyParameters,
            config
        )
        if (res.status == 200) {
            // test for status you want, etc
            let arr = res.data.calendars['refinerycaltask@gmail.com']
            // Don't forget to return something 
            dispatch(receiveBusyDates(arr))
            return arr
        }
        return res.data
    });
};

export default { getDates }
