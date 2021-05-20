import fetch from 'node-fetch';

const get = async() => {
    try {
        const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=76d1f87164559ae4dabbaf752f14");
        return await response.json();
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

    partners.forEach(partnerData => {
        const partner = new Partner(partnerData); 
        if (!countries[partner.country]) countries[partner.country] = new Country(partner.country);
        console.log('partner: ', partner); 
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
            console.log('partners: ', partners); 
            const invitations = createInvitations(partners);
            //TODO: Post created invitations to api  
        }
    } catch(err) {
        console.log('error: ', err);
        return; 
    }
    
}

app(); 