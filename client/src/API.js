const SERVER_URL = 'http://localhost:3001'


const getServiceInfo = async () => {
    const response = await fetch(SERVER_URL + '/api/serviceinfo', { credentials: 'include' })
        .catch(err => { throw err })
    if (response.ok) {
        const services = await response.json();
        // console.log(services);
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

    if(response.ok) {
        let queue = await response.json();
        return queue;
    }
}

const askForTicket = async (serviceID) =>{
    const response = await fetch(SERVER_URL + '/api/ticket', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({"serviceID" : serviceID})
    });
    if (response.ok){
        const ticket = await response.json();
        return ticket;
    }else{
        const errDetail = await response.json();
        throw errDetail;
    }
}

const callNextCustomer = async (params) =>{
    const response = await fetch(SERVER_URL + '/api/next', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(params)

    });

    if(response.ok){
        const ticket = await response.json();
        return ticket;
    }
}

const logIn = async (credentials) => {
    return { name: "Mario Rossi", desk: 2 };
}

const getUserInfo = async () => {
    
};

const logOut = async () => {
   
}

const API = {
    getServiceInfo, getStats, getQueue, askForTicket, callNextCustomer, logIn,
}

export default API;
