import fetch from 'node-fetch';
const url = "https://candidate.hubteam.com/candidateTest/v3/problem/dataset?userKey=76d1f87164559ae4dabbaf752f14";

export default { 
    get: async() => {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
}