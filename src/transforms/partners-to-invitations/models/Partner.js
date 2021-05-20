import moment from 'moment'; 

export default class Partner { 
    constructor({ availableDates, country, email }) { 
        this.availableDates = availableDates;
        this.country = country;
        this.email = email;
    }

    //Creates following DS: { "country1": { "date": ["email", "email"] } }
    populateStartDatesMap = (startDatesPerCountryMap) => {
        const { availableDates, country, email, hasFollowingDateAvailable } = this; 

        availableDates.forEach(availableDate => {
            if (hasFollowingDateAvailable(availableDate)) {
                if (!startDatesPerCountryMap[country]) startDatesPerCountryMap[country] = {};
                if (!startDatesPerCountryMap[country][availableDate]) startDatesPerCountryMap[country][availableDate] = [];
                startDatesPerCountryMap[country][availableDate].push(email);
            }
        });
    }

    hasFollowingDateAvailable = (date) => {
        const followingDay = moment(date, 'YYYY-MM-DD').add(1, 'days').format('YYYY-MM-DD');
        return this.availableDates.includes(followingDay);
    }
}