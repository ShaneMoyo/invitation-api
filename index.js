import fetch from 'node-fetch';

const get = async() => {
    try {
        const response = await fetch("https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=76d1f87164559ae4dabbaf752f14");
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Main transform logic lives here. 
function transform(partners) { 
    //TODO: Return correctly trasfromed array of countries
    return; 
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