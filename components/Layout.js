import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default props => {
    return (
        <div style={{ backgroundColor: '#eee' }}>
            <Head>
                
                <title>CrowdCoin</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="author" content="Zac Messinger"/>
                <meta name="keywords" content="Ethereum, DAPP, Zac, Messinger, zmess, zmess24, Ether"/>
                <meta http-equiv="content-type" content="text/html;charset=UTF-8"/>

                <meta name="description" content="Decentralized application built on Ethereum using the Rinkeby Network that allows users to bet on a number to win Ether."/>
                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"></link>
                <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </Head>
            <Header />
            <Container>
                {props.children}
            </Container>
            <Footer />
        </div>
    )
}