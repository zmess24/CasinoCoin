import web3 from './web3';
import Casino from './build/Casino.json';

const instance = new web3.eth.Contract(
    JSON.parse(Casino.interface), // Contract interface
    '0x4B44a5a93604ac52B7C749a1bC1678b2e77C1B6B' // Contract address on network
);

export default instance;