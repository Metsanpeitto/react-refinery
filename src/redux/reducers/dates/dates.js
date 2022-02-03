import {
    RECEIVE_BUSY_DATES
} from '../../constants/action-types';


function getBusinessDatesCount(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}
const populate = (d, busyDates) => {
    const dates = []
    let date = d;
    for (let i = 9; i <= 16; i++) {
        date = d;
        date.setHours(0);
        date.setHours(date.getHours() + i);
        if (!checkIfFree(date, busyDates)) {
            var string_copy = (' ' + date).slice(1);
            dates.push(string_copy)
        }
    }

    return dates
}

function checkIfFree(d, busyDates) {
    let response = false;
    busyDates.forEach(b => {
        let { start, end } = b
        const startDate = new Date(start);
        if (d.getDay() === startDate.getDay() && d.getHours() === startDate.getHours()) {
            response = true;
        }
    })
    return response;
}

const initialState = {
    busyDates: [],
    freeDates: []
};

const datesReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_BUSY_DATES: {
            const { busy } = action.data;
            const busyDates = busy;
            const freeDates = [];
            // Since today to 4 days in the future
            const date = new Date();
            let dateToday = new Date(date.setDate(date.getDate()));
            let dateAfterTomorrow = new Date(date.setDate(date.getDate() + 2));
            let startDate = new Date(dateToday.toLocaleDateString("en-US"));
            let endDate = new Date(dateAfterTomorrow.toLocaleDateString("en-US"));
            // work days only
            let days = getBusinessDatesCount(startDate, endDate);

            if (days < 2) {
                dateToday = new Date(date.setDate(date.getDate() + 2));
                dateAfterTomorrow = new Date(date.setDate(date.getDate() + 4));
            }
            // from 09:00 to 16:00 && excluding busyDates
            freeDates.push(populate(dateToday, busyDates));
            freeDates.push(populate(dateAfterTomorrow, busyDates));
            console.log(freeDates)
            return {
                busyDates, freeDates
            };
        }
        default:
            return state;
    }
};

export default datesReducer;