import React, { Component } from 'react';
// import factory from '../ethereum/factory.js'
import Layout from '../components/Layout';
// import web3 from '../ethereum/web3.js';
import { Table, Grid, Card, Divider, Form, Input, Button, Message, Loader, Dimmer, Segment } from 'semantic-ui-react';

class App extends Component {
    state = {
        bet: '',
        numberSelected: 0,
        errorMessage: '',
        loading: false,
    }

    static async getInitialProps(props) {
        // const numberOfBets = await factory.methods.numberOfBets().call();
        // const totalBet = await factory.methods.totalBet().call();
        // const minimumBet = await factory.methods.minimumBet().call();
        // const maxAmountofBets = await factory.methods.maxAmountOfBets().call();
        // const roundsWithOutWinner = await factory.methods.roundsWithOutWinner().call();
        
        return {
            // numberOfBets,
            // totalBet: web3.utils.fromWei(totalBet, 'ether'),
            // minimumBet: web3.utils.fromWei(minimumBet, 'ether'),
            // maxAmountofBets,
            // roundsWithOutWinner

            numberOfBets: 1,
            totalBet: 0,
            minimumBet: 0.1,
            maxAmountofBets: 10,
            roundsWithOutWinner: 1
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

        return <Card.Group items={items} itemsPerRow={5} />
    }


    renderNumbers() {
        const numbers = [
            '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'
        ]

        return (
            <div>
                {numbers.map(number => (
                    <Button animated="vertical" key={number} secondary onClick={event => this.setState({ numberSelected: parseInt(number) })}>
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

        this.setState({ loading: true, errorMessage: ''});

        // try {
        //     const accounts = await web3.eth.getAccounts();
        //     await factory.methods.bet(numberSelected).send({
        //         from: accounts[0],
        //         value: web3.utils.toWei(bet, 'ether'),
        //         gas: '1000000'  
        //     })
        // } catch (err) {
        //     this.setState({ errorMessage: err.message})
        // }

        this.setState({ loading: false, errorMessage: ''})
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
                        <Column>
                            <h2>Bet on the next number!</h2>
                        </Column>
                    </Row>
                    <Row>
                        <Column width={8}>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Field>
                                    <label>How much Ether do you want to bet?</label>
                                    <Input
                                        label="ether"
                                        labelPosition="right"
                                        value={this.state.bet}
                                        onChange={event => this.setState({ bet: event.target.value })}
                                    />
                                
                                </Form.Field>
                                {this.renderNumbers()}
                            </Form>
                            <Dimmer page={true} active={this.state.loading}>
                                <Loader inline active={this.state.loading}>Processing Bet...</Loader>
                            </Dimmer>
                        </Column>
                        <Column width={8}>
                            <Segment inverted color="grey">
                                <h2>How it Works:</h2>


                            </Segment>
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                            <Divider />
                        </Column>
                    </Row>

                    <Row>
                        <Column>
                        </Column>
                    </Row>
                    

                </Grid>
            </Layout>
        )
    }
}

export default App;