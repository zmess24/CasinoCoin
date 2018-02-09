const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

console.log("Compiling contract and creating build folder...")

// Delete build folder
const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

// Read in campaign contract and compile it
const campaignPath = path.resolve(__dirname, 'contracts', 'Casino.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

// Recreate build folder
fs.ensureDirSync(buildPath);

// Iterate over contracts in output, create a json file with contract name, and write out the output of the contract 
for (let contract in output) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}
