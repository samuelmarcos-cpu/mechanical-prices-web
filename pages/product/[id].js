import React from 'react';
import styles from '../../styles/Product.module.css'

import { Box, Grid, Typography, Chip, Button, CircularProgress }
  from '@material-ui/core';
import SearchTextField from '../../components/SearchTextField';

import useSWR from 'swr'
const fetcher = url => fetch(url).then(r => r.json())

import Head from 'next/head'
import { useRouter } from 'next/router'

function GetProductID({ id }) {
  const { data } = useSWR('/api/product?id=' + id, fetcher) // tratar error

  if (!data) return <CircularProgress />

  if (Array.isArray(data) && data.length == 0) return 'NOT FOUND'

  const { images, title, timeline, link, categories } = data

  const image = images.pop()

  const { price } = timeline.map(tl => ({
    date: new Date(tl.date),
    price: '$' + tl.price.toFixed(2)
  })).sort((tlA, tlB) => tlA.date > tlB.date).pop()

  const category = categories.map(category => category.toUpperCase()).pop()

  return (
    <Grid className={styles.content} container direction="column" justify="space-between" alignItems="center">
      <Grid container spacing={10}
        direction="row" justify="space-around" alignItems="center">
        <Grid item>
          <img src={'https://' + image} width="300px" />
        </Grid>
        <Grid item>
          <Grid container spacing={10}
            direction="column" justify="space-between" alignItems="center">
            <Grid item>
              <Typography align="center">
                {title}
              </Typography>
            </Grid>
            <Grid container direction="row" justify="space-around" alignItems="center">
              <Grid item>
                <Chip label={category} size="small" variant="outlined" />
              </Grid>
              <Grid item> {price} </Grid>
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary"
                href={'https://' + link} size="large" target="_blank">
                Visit
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default function PageProductID() {
  const { id } = useRouter().query

  return (
    <div className={styles.container}>
      <Head>
        <title>Mechanical Prices</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box className={styles.searchTextField}> <SearchTextField /> </Box>

      <main className={styles.main}> <GetProductID id={id} /> </main>

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
