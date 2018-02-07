import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';

export default props => {
    return (
        <Container style={{ marginTop: '20px'}}>
            <Head>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
            </Head>
            {props.children}
        </Container>
    )
}