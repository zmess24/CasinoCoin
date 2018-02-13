<h1>CasinoCoin</h1>

A simple decentralized Ethereum betting application built for educational purposes on the Rinkeby Network.

## How it Works

1. Allows users to bet test Ether on a number from one to 10.
2. After 10 bets have been placed, the smart contract randomly selectes a winning number and deposits the balance of the contract into the winner(s) account(s). The terms of the contract are then reset.
3. If no winners have been selected, the balance carries over into drawing (similar to the lottery).

## Get Started

1. **Clone the project**. `git clone https://github.com/zmess24/Ethereum-Casino.git`.
2. **Run the setup script**. `npm run install`
3. **Run the example app**. `npm run dev`

## Initial Machine Setup

1. **Install [Node 8.0.0 or greater](https://nodejs.org)**. Need to run multiple versions of Node? Use [nvm](https://github.com/creationix/nvm).
2. **Install [Git](https://git-scm.com/downloads)**. 

## Technologies

CasinoCoin is build using the following technologies:

| **Tech** | **Description** |
|----------|-------|
|  [React](https://facebook.github.io/react/)  |  Fast, composable client-side components. |
|  [Next](https://github.com/zeit/next.js/) |  Minimalistic framework for server-rendered React applications.     |
|  [Semantic UI React](https://github.com/Semantic-Org/Semantic-UI-React) |  Development framework that helps create beautiful, responsive layouts using human-friendly HTML.     |
|  [Solc](https://github.com/ethereum/solc-js) |  JavaScript bindings for the Solidity compiler.     |
|  [Ganache CLI](https://github.com/trufflesuite/ganache-cli) |  Command line version of Ganache, your personal blockchain for Ethereum development.     |
|  [Web3](https://github.com/ethereum/web3.js/) |  API that allows you to interact with a local or remote ethereum node, using a HTTP or IPC connection.     |
|  [Truffle Hdwallet Provider](https://github.com/trufflesuite/truffle-hdwallet-provider) |  HD Wallet-enabled Web3 provider. Use it to sign transactions for addresses derived from a 12-word mnemonic. |
|  [Mocha](https://github.com/mochajs/mocha) |  Feature-rich and asynchronous JavaScript test framework running on Node.js and in the browser   |

