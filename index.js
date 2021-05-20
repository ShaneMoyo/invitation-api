import fetch from 'node-fetch';
import moment from 'moment';

const get = async() => {
    try {
        const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=76d1f87164559ae4dabbaf752f14");
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

const post =  async (data) => {
    const options = {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'},
    }

    try {
        const response = await fetch('https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=76d1f87164559ae4dabbaf752f14',
            options);
        return response.json();
    } catch (error) {
        console.log(error);
    }
}

class Partner { 
    constructor({ availableDates, country, email }) { 
        this.availableDates = availableDates;
        this.country = country;
        this.email = email;
    }

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

class Country { 
    constructor(countryName) { 
        this.name = countryName;
        this.attendeeCount = 0,
        this.attendees = [], 
        this.startDate = null
    }
}

// Main transform logic lives here. 
function transform(partners) { 
    const countries = {};
    const startDates = {};

    partners.forEach(partner => {
        const { country, populateStartDatesMap  } = new Partner(partner); 
        if (!countries[country]) countries[country] = new Country(country);

        populateStartDatesMap(startDates); 
    });

    return Object.values(countries).map((country) => {
        Object.entries(startDates[country.name]).forEach(([startDate, attendees]) => {
            const shouldUpdateStartDate = attendees.length == country.attendeeCount && moment(country.startDate).isAfter(startDate); 
            const shouldUpdateAttendeeCount = attendees.length > country.attendeeCount; 
            if (shouldUpdateAttendeeCount || shouldUpdateStartDate) {
                country = {
                    ...country, 
                    attendees, 
                    startDate, 
                    attendeeCount: attendees.length
                }
            }
        });
        return country;
    });
}

function createInvitations(partners) {
    if(!partners) return null; 
    const countries = transform(partners);
    return { countries };
}


async function app() {
    try {
        const { partners } = await get();
        if(partners) {
            const invitations = createInvitations(partners);
            //console.log('invitations: ', invitations)
            const response = await post(invitations); 
            console.log('response: ', response); 
        }
    } catch(err) {
        console.log('error: ', err);
        return; 
    }
    
}

app(); 