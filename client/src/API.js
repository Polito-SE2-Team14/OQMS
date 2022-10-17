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




const logIn = async (credentials) => {
    
}

const getUserInfo = async () => {
    
};

const logOut = async () => {
   
}

const API = {
    getServiceInfo
}

export default API;
