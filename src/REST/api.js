
export const api = Object.freeze({
    get :  async (token) => {
        const response = await fetch('https://survey-api-test.volia.com/v1/testing-test/'+token,
            {
                method: 'GET'
            }
        );
        return await response.json();
    },
    send : async (answers) => {
            let data = new FormData;

            data.append('answers_list', JSON.stringify(answers));

            // data.append(JSON.stringify(answers));
            const response = await fetch('https://survey-api-test.volia.com/v1/testing-test/'+api.getToken(),
                {
                    method: 'POST',
                    body: data
                }
            );
            return await response.json();
            },
    getToken: function () {
        const parseGetQuery = new URLSearchParams(window.location.search);
        console.log('token', parseGetQuery);
        return parseGetQuery.has('token') ? parseGetQuery.get('token') : false;
    },

});
