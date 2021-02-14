import React from 'react';
import styles from '../styles/Home.module.css'

import { Grid, TextField, InputAdornment } from '@material-ui/core';
import { SearchSharp } from '@material-ui/icons';

import Head from 'next/head'
import MyCard from '../components/Card';

import useSWR from 'swr'
const fetcher = url => fetch(url).then(r => r.json())

import Router from 'next/router'
const searchTerm = term => Router.push({ pathname: '/', query: { term } })

function SearchProducts({ term }) {
  const { data } = useSWR('/api/search?term=' + term, fetcher) // tratar error

  if (!data) return 'LOADING...'

  return (
    <Grid container direction="column" justify="flex-start" alignItems="center">
      <TextField fullWidth label="Search" placeholder="Cherry MX"
        defaultValue={term}
        onKeyPress={e => e.key === 'Enter' && searchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"> <SearchSharp /> </InputAdornment>
          )
        }} />
      <Grid container direction="row" justify="space-around" alignItems="center">
        {data && data.map((product, i) =>
          <MyCard key={product._id} product={product}></MyCard>)}
      </Grid>
    </Grid>
  )
}

import { useRouter } from 'next/router'

export default function Home() {
  const { term } = useRouter().query

  return (
    <div className={styles.container}>
      <Head>
        <title>Mechanical Prices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}> <SearchProducts term={term} /> </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank" rel="noopener noreferrer" >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}