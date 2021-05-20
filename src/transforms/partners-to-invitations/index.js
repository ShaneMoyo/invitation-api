import moment from 'moment';
import Partner from './models/Partner.js';
import Country from './models/Country.js';

const transform = (partners) => {
    const countries = {};
    const startDates = {};

    partners.forEach(partner => {
        const { country, populateStartDatesMap  } = new Partner(partner); 
        if (!countries[country]) countries[country] = new Country(country);

        populateStartDatesMap(startDates); 
    });

    const processCountry = (country) => {
        Object.entries(startDates[country.name] || []).forEach(([startDate, attendees]) => {
            const attendeeCount = attendees.length; 
            const shouldUpdateStartDate = attendeeCount == country.attendeeCount && moment(country.startDate).isAfter(startDate); 
            const shouldUpdateAttendeeCount = attendeeCount > country.attendeeCount; 
            if (shouldUpdateAttendeeCount || shouldUpdateStartDate) {
                country = {
                    ...country, 
                    attendees, 
                    startDate, 
                    attendeeCount
                }
            }
        });
        return country;
    }

    return Object.values(countries).map(processCountry); 
}

export default function createInvitations({ partners }) {
    if(!partners) return null; 
    const countries = transform(partners);
    return { countries };
}