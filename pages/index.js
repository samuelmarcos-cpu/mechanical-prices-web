import React from 'react';
import styles from '../styles/Search.module.css'

import { Box, Grid, CircularProgress } from '@material-ui/core';

import SearchTextField from '../components/SearchTextField';
import MyCard from '../components/Card';

import useSWR from 'swr'
const fetcher = url => fetch(url).then(r => r.json())

function SearchProducts({ term }) {
  const { data } = useSWR('/api/search?term=' + term, fetcher) // tratar error

  if (!data) return <CircularProgress />

  if (Array.isArray(data) && data.length == 0) return 'NOT FOUND'

  const result = data.map(product => (
    <Grid item my={1}>
      <Box maxWidth="200px">
        <MyCard key={product.id} product={product}></MyCard>
      </Box>
    </Grid>
  ))

  return (
    <Grid container spacing={3}
      direction="row" justify="space-around" alignItems="center">
      {result}
    </Grid>
  )
}

import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Search() {
  const { term } = useRouter().query

  return (
    <div className={styles.container}>
      <Head>
        <title>Mechanical Prices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.searchTextField}> <SearchTextField term={term} /> </Box>

      <main className={styles.main}> <SearchProducts term={term} /> </main>

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
