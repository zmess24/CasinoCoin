import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default props => {
    return (
        <div style={{ backgroundColor: '#eee' }}>
            <Head>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
            </Head>
            <Header />
            <Container>
                {props.children}
            </Container>
            <Footer />
        </div>
    )
}