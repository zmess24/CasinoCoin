import React, { Component } from 'react';
import factory from '../ethereum/factory.js'
import Layout from '../components/Layout';
import web3 from '../ethereum/web3.js';
import Router from 'next/router';
import { Table, Grid, Card, Divider, Form, Input, Label, Button, Message, Loader, Dimmer, Segment, Icon } from 'semantic-ui-react';

class App extends Component {
    state = {
        bet: '',
        numberSelected: 0,
        loading: false,
        inputError: false,
        statusHeader: "Ready",
        statusMessage: "Ready to accept transaction.",
        success: false,
        error: false
    }

    static async getInitialProps(props) {
        const numberOfBets = await factory.methods.numberOfBets().call();
        const totalBet = await factory.methods.totalBet().call();
        const minimumBet = await factory.methods.minimumBet().call();
        const maxAmountofBets = await factory.methods.maxAmountOfBets().call();
        const roundsWithOutWinner = await factory.methods.roundsWithOutWinner().call();
        
        return {
            numberOfBets,
            totalBet: web3.utils.fromWei(totalBet, 'ether'),
            minimumBet: web3.utils.fromWei(minimumBet, 'ether'),
            maxAmountofBets,
            roundsWithOutWinner

            // numberOfBets: 1,
            // totalBet: 0,
            // minimumBet: 0.1,
            // maxAmountofBets: 10,
            // roundsWithOutWinner: 1
        }
    }

    renderCards() {
        const {
            numberOfBets,
            roundsWithOutWinner,
            totalBet,
            minimumBet,
            maxAmountofBets
        } = this.props;

        const items = [
            {
                header: numberOfBets,
                meta: 'Number of Bets',
                description: 'The number of users who have placed a bet.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: roundsWithOutWinner,
                meta: 'Streak',
                description: 'The number of games that have been played since a winner was picked.'
            },
            {
                header: totalBet,
                meta: 'Ether',
                description: 'The total amount of Ether currently in the pot.'
            },
            {
                header: minimumBet,
                meta: 'Minimum Bet',
                description: 'The minimum of Ether bet.'
            },
            {
                header: maxAmountofBets,
                meta: 'Max Amount of Bets',
                description: 'Number of bets allowed before a winner is drawn.'
            }
        ];

        return <Card.Group stackable items={items} itemsPerRow={5} />
    }


    renderNumbers() {
        const numbers = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
        ]

        return (
            <div>
                {numbers.map(number => (
                    <Button disabled={this.state.loading} animated="vertical" key={number} secondary onClick={event => this.setState({ numberSelected: parseInt(number), success: false })}>
                        <Button.Content visible>{number}</Button.Content>
                        <Button.Content hidden>Bet</Button.Content>
                    </Button>
                ))}
            </div>
        )
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const { bet, numberSelected } = this.state;

        this.setState({ loading: true });

        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.bet(numberSelected).send({
                from: accounts[0],
                value: web3.utils.toWei(bet, 'ether'),
                gas: '1000000'  
            })

            this.setState({
              loading: false,
              statusMessage: 'Ready to accept transaction.',
              statusHeader: "Ready",
              success: true,
              bet: ''
            })

            Router.push('/', {
              shallow: true
            });

        } catch (err) {
            let error = err.message

            if (error === "while converting number to string, invalid number value '', should be a number matching (^-?[0-9.]+).") {
                this.setState({
                  loading: false,
                  error: true,
                  statusHeader: "Error",
                  statusMessage: "Please enter an amount of ether to bet."
                })
            } else if (error.includes("Returned error: Error: MetaMask Tx Signature: User denied transaction signature")) {
                this.setState({
                  loading: false,
                  error: true,
                  statusHeader: "Error",
                  statusMessage: "User denied transaction."
                })
            } else {
                this.setState({
                  loading: false,
                  error: true,
                  statusHeader: "Error",
                  statusMessage: error
                })
            }
        }

    }

    render() {
        const { Row, Column } = Grid;
        return (
            <Layout>
                <Grid>
                    <Row>
                        <Column>
                            <h1>Bet on a number to win huge amounts of Ether!</h1>
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            {this.renderCards()}
                        </Column>
                    </Row>
                    <Row>
                        <Column>
                            <Divider />
                        </Column>
                    </Row>
                    <Row>
                        <Column width={8}>
                            <h2>Place a bet:</h2>
                            <Row>
                                <Column>
                                    <Form onSubmit={this.onSubmit}>
                                        <Form.Field>
                                            <label>How much Ether do you want to bet?</label>
                                            <Input
                                                size="small"
                                                type="number"
                                                label="ether"
                                                disabled={this.state.loading}
                                                labelPosition="right"
                                                error={this.state.inputError}
                                                placeholder="0.1"
                                                value={this.state.bet}
                                                onChange={event => this.setState({ bet: event.target.value, success: false })}
                                            >
                                            </Input>

                                        </Form.Field>
                                        <Form.Field>
                                            <label>Select a Number:</label>
                                        </Form.Field>
                                        {this.renderNumbers()}
                                    </Form>

                                    <Message hidden={this.state.loading} negative={this.state.error}>
                                        <Message.Header>Status: {this.state.statusHeader}</Message.Header>
                                        <p>{this.state.statusMessage}</p>
                                    </Message>

                                    <Message success hidden={!this.state.success} icon>
                                        <Icon name="checkmark"/>
                                        <Message.Content>
                                            <Message.Header>Status: Success!</Message.Header>
                                            <p>Transaction had been processed.</p>
                                        </Message.Content>
                                    </Message>

                                    <Message color="yellow" hidden={!this.state.loading} icon>
                                        <Icon name='circle notched' loading/>
                                        <Message.Content>
                                            <Message.Header>Status: Processing Bet</Message.Header>
                                            <p>Transaction is currently bieng mined. Average transaction takes 15 seconds to process</p>
                                        </Message.Content>
                                    </Message>

                                </Column>
                            </Row>
                        </Column>
                        <Column width={8}>
                            <Segment>
                                <h2>How to Play:</h2>
                                <ol>
                                    <li>Download the <strong><a target="_blank" href="https://metamask.io/">MetaMask Chrome Extension</a></strong>.</li>
                                    <li>Create an account on the Rinkeby Network (Test Network).
                                        <ul>
                                            <li>The Rinkeby option is in the top left dropdown with the yellow square when you open MetaMask.</li>
                                        </ul>
                                    </li>
                                    <li>Recieve test Ether for your account <strong><a target="_blank" href="https://faucet.rinkeby.io/">here</a></strong>.
                                        <ul>
                                            <li>You can copy your Ethereum address by clicking on the "..." dropdown in MetaMask</li>
                                            <li>I recommend using Google Plus for grabbing the post url per the instructions</li>
                                            <li>It's completly safe, don't worry :) Ether's on test accounts don't hold actual value</li>
                                        </ul>
                                    </li>
                                    <li>Place a bet!</li>
                                </ol>
                            </Segment>
                        </Column>
                    </Row>

                    <Row style={{ marginBottom: '20px' }}>
                        <Column>
                            <Divider />
                            <div style={{ fontWeight: "bold" }}>**This application runs on the Ethereum Rinkeby Test Network and is purely for educational purposes.</div>
                        </Column>
                    </Row>
                    
                </Grid>
            </Layout>
        )
    }
}

export default App;