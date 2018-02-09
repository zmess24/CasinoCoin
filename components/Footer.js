import React, { Component } from 'react';
import { Segment, Container, Grid } from 'semantic-ui-react';

class Footer extends Component {
    state = {  }
    render() {
        return (
            <Segment inverted>
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <div>Created and maintained by <a href="http://www.zmess.co">Zac Messinger</a>. Source code and examples released under the MIT license.</div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

export default Footer;