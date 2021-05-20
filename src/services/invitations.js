import fetch from 'node-fetch';
const url = 'https://candidate.hubteam.com/candidateTest/v3/problem/result?userKey=76d1f87164559ae4dabbaf752f14';

export default { 
    post:  async (data) => {
        try {
            const options = {
                method: 'post',
                body: JSON.stringify(data),
                headers: {'Content-Type': 'application/json'},
            };
            const response = await fetch(url, options);
            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }
}
