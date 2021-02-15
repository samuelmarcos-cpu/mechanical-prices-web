import React from 'react';
import styles from '../../styles/Search.module.css'

import { Box } from '@material-ui/core';
import SearchTextField from '../../components/SearchTextField';

// import useSWR from 'swr'
// const fetcher = url => fetch(url).then(r => r.json())

import Head from 'next/head'
import { useRouter } from 'next/router'

function GetProductID({ id }) {
    return <span>PRODUCT ID {id}</span>
}

export default function PageProductID() {
    const { id } = useRouter().query
    // const { data } = useSWR('/api/search?term=' + term, fetcher) // tratar error

    console.log('PRODUCT ID', id)

    return (
        <div className={styles.container}>
            <Head>
                <title>Mechanical Prices</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Box marginBottom="20px">
                    <SearchTextField />
                </Box>
                <GetProductID id={id} />
            </main>

            <footer className={styles.footer}>
                <a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank" rel="noopener noreferrer">
                    Powered by{' '}
                    <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
                </a>
            </footer>
        </div>
    )
}
