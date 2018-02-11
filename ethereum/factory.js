import web3 from './web3';
import Casino from './build/Casino.json';

const instance = new web3.eth.Contract(
    JSON.parse(Casino.interface), // Contract interface
    '0xf142b6C77d921d76C95D4EB4e1D1E8027E893041' // Contract address on network
);

export default instance;