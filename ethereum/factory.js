import web3 from './web3';
import Casino from './build/Casino.json';

const instance = new web3.eth.Contract(
    JSON.parse(Casino.interface), // Contract interface
    '0x2F05A8e3e131Ec5150d6f7AA1A6860B5a251a095' // Contract address on network
);

export default instance;