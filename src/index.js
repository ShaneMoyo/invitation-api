import transformPartnersDataToInvitations from './transforms/partners-to-invitations/index.js';
import fetchPartners from "./services/partner.js"; 
import postInvitations from "./services/invitations.js"; 

export default async function app() {
    try {
        const partners = await fetchPartners();
        if(partners) {
            const invitations = transformPartnersDataToInvitations(partners);
            const response = await postInvitations(invitations);
            console.log('response: ', response); 
        }
    } catch(err) {
        console.log('error: ', err);
        return; 
    }
    
}

app();