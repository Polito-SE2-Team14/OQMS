const SERVER_URL = 'http://localhost:3001'


const getServiceInfo = async () => {
    const response = await fetch(SERVER_URL + '/api/serviceinfo', { credentials: 'include' })
        .catch(err => { throw err })
    if (response.ok) {
        const services = await response.json();
        console.log(services);
        return services;

    }
    else
        throw await response.text();
}

const getStats = async () =>{
    const response = await fetch(SERVER_URL + '/api/serviceinfo', { credentials: 'include' })
    .catch(err => { throw err })
}

const getQueue = async () =>{
    const response = await fetch(SERVER_URL + '/api/serviceinfo', { credentials: 'include' })
    .catch(err => { throw err })
}

const askForTicket = async (serviceID) =>{
    const response = await fetch(SERVER_URL + '/api/ticket', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(serviceID)

    });
}

const callNextCustomer = async (params) =>{
    const response = await fetch(SERVER_URL + '/api/next', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(params)

    });
}

const logIn = async (credentials) => {
    
}

const getUserInfo = async () => {
    
};

const logOut = async () => {
   
}

const API = {
    getServiceInfo, getStats, getQueue, askForTicket, callNextCustomer
}

export default API;
