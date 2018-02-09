import Web3 from 'web3';

let web3;

// check if runnig code in the server or the browser
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // We are in the browser and metamask is running.
    web3 = new Web3(window.web3.currentProvider);
} else {
    // We are on the server *OR* the user is not running metamask.
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/2KgE38uh5rYNDiH8nwzY'
    )
    web3 = new Web3(provider);
}

export default web3;