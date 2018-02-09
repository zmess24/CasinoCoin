const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const web3 = new Web3(provider);

const compiledCasino = require('../ethereum/build/Casino.json');

let accounts, casino;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    casino = await new web3.eth.Contract(JSON.parse(compiledCasino.interface))
        .deploy({ data: compiledCasino.bytecode })
        .send({ from: accounts[0], gas: '1000000' });

    casino.setProvider(provider);
})

describe('Casino', () => {
    it('deploys a Casino', () => {
        assert.ok(casino.options.address);
    });

    it('has the maxAmountOfBets set to 5', async () => {
        const maxAmountOfBets = await casino.methods.maxAmountOfBets().call();
        assert.equal(10, maxAmountOfBets);
    })

    it('has minimumBet set to 0.1 ether', async () => {
        const minimumBet = await casino.methods.minimumBet().call();
        assert.equal(0.1, web3.utils.fromWei(minimumBet, 'ether'));
    });

    it('wont allow a player to make a bet twice', async () => {
        await casino.methods.bet(1).send({
            from: accounts[0],
            value: web3.utils.toWei('0.1', 'ether'),
            gas: '1000000'
        })

        try {
            await casino.methods.bet(1).send({
                from: accounts[0],
                value: web3.utils.toWei('0.1', 'ether'),
                gas: '1000000'
            });
            assert(false)
        } catch (err) {
            assert(err)
        }
    })

    it('wont allow a player to make a bet below 0.1 ether', async () => {
        try {
            await casino.methods.bet(1).send({
                from: accounts[0],
                value: web3.utils.toWei('0.01', 'ether'),
                gas: '1000000'
            })
            assert(false)
        } catch (err) {
            assert(err)
        }
    })

    it('wont allow a player to bet on a number outside of 1-10', async () => {
        try {
            await casino.methods.bet(15).send({
                from: accounts[0],
                value: web3.utils.toWei('0.1', 'ether'),
                gas: '1000000'
            })
            assert(false)
        } catch (err) {
            assert(err)
        }
    })

    it('allows a player to place a bet', async () => {
        await casino.methods.bet(1).send({
            from: accounts[0],
            value: web3.utils.toWei('0.1', 'ether'),
            gas: '1000000'  
        })

        const numberOfBets = await casino.methods.numberOfBets().call();
        const totalBet = await casino.methods.totalBet().call();

        assert.equal(1, numberOfBets);
        assert.equal(0.1, web3.utils.fromWei(totalBet, 'ether'));
    });

    it('allows multiple plays to place a bet', async () => {
        await casino.methods.bet(1).send({
            from: accounts[0],
            value: web3.utils.toWei('0.1', 'ether'),
            gas: '1000000'  
        })

        await casino.methods.bet(1).send({
            from: accounts[1],
            value: web3.utils.toWei('0.1', 'ether'),
            gas: '1000000'  
        })

        const numberOfBets = await casino.methods.numberOfBets().call();
        const totalBet = await casino.methods.totalBet().call();

        assert.equal(2, numberOfBets);
        assert.equal(0.2, web3.utils.fromWei(totalBet, 'ether'));
    });

    it('will pick a winner after 10 bets have been placed', async () => {
        let balanceArray = new Array();
        let winnerPicked;

        for (let i=0; i<10; i++) {
            await casino.methods.bet(i+1).send({
                from: accounts[i],
                value: web3.utils.toWei('5', 'ether'),
                gas: '1000000'
            })
        }
        
        for (let i=0; i<10; i++) {
            let balance = await web3.eth.getBalance(accounts[i]);
            balance = web3.utils.fromWei(balance, 'ether');
            balance = parseFloat(balance);
            balanceArray.push(balance);
        }

        for (let i=0; i<10; i++) {
            if (balanceArray[i] > 140) {
                winnerPicked = true;
                break;
            } else {
                winnerPicked = false;
            }
        }

        assert.equal(true, winnerPicked);
    });

    it('can pick multiple winners', async () => {
        let balanceArray = new Array();
        let winnersPicked = 0;

        for (let i=0; i<9; i++) {
            await casino.methods.bet(i+1).send({
                from: accounts[i],
                value: web3.utils.toWei('5', 'ether'),
                gas: '1000000'
            })
        }

        await casino.methods.bet(1).send({
            from: accounts[9],
            value: web3.utils.toWei('5', 'ether'),
            gas: '1000000'
        })
        
        for (let i=0; i<10; i++) {
            let balance = await web3.eth.getBalance(accounts[i]);
            balance = web3.utils.fromWei(balance, 'ether');
            balance = parseFloat(balance);
            balanceArray.push(balance);
        }

        for (let i=0; i<10; i++) {
            if (balanceArray[i] > 124) {
                winnersPicked++;
            }
        }

        assert.equal(2, winnersPicked);
    })

    it('resets the contract after a winner is drawn', async () => {
        for (let i=0; i<10; i++) {
            await casino.methods.bet(i+1).send({
                from: accounts[i],
                value: web3.utils.toWei('5', 'ether'),
                gas: '1000000'
            })
        }

        const numberOfBets = await casino.methods.numberOfBets().call();
        const totalBet = await casino.methods.totalBet().call();

        assert.equal(0, numberOfBets);
        assert.equal(0, totalBet);

    })

})