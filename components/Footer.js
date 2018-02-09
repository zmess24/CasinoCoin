import React, { Component } from 'react';
import { Segment, Container, Grid } from 'semantic-ui-react';

class Footer extends Component {
    state = {  }
    render() {
        return (
            <Segment inverted textAlign="center">
                <Container>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <iframe src="https://ghbtns.com/github-btn.html?user=zmess24&repo=Ethereum-Casino&type=star&count=true" frameBorder="0" scrolling="0" width="90px" height="20px"></iframe>
                                <a href="https://twitter.com/zac_messinger?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-count="true">Follow @zac_messinger</a>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row style={{ marginTop: "-10px" }}>
                            <Grid.Column>
                                <div>Created and maintained by <a href="http://www.zmess.co">Zac Messinger</a>. Source code and examples released under the <a href="https://github.com/zmess24/Ethereum-Casino/blob/master/LICENSE">MIT</a> license.</div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

export default Footer;