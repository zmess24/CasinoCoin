import React, { Component } from 'react';
import Layout from '../components/Layout';
import { Table, Grid, Card, Divider, Form, Input, Button, Message, Loader, Dimmer, Segment } from 'semantic-ui-react';

class App extends Component {
    state = {
        bet: '',
        numberSelected: 0,
        errorMessage: '',
        loading: false,
    }

    static async getInitialProps(props) {
        return {
            numberOfBets: 0,
            lastNumberWinner: 1,
            totalBet: 0,
            minimumBet: 0,
            maxAmountofBets: 10
        }
    }

    renderCards() {
        const {
            numberOfBets,
            lastNumberWinner,
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
                header: lastNumberWinner,
                meta: 'Last Winning Number',
                description: 'The winning number from the last game.'
            },
            {
                header: totalBet,
                meta: 'Current Total Bet',
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
                    <Button animated="vertical" key={number} primary onClick={event => this.setState({ numberSelected: number })}>
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
                            <Dimmer page="true" active={this.state.loading}>
                                <Loader indeterminate inline active={this.state.loading}>Processing Bet...</Loader>
                            </Dimmer>
                        </Column>
                        <Column width={8}>
                            <Segment inverted color="grey">
                                <h2>How it Works:</h2>


                            </Segment>
                        </Column>
                    </Row>

                </Grid>
            </Layout>
        )
    }
}

export default App;