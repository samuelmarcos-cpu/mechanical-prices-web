import React from 'react'
import styles from '../styles/Card.module.css'

import { Card, Chip, Grid } from '@material-ui/core'

import Router from 'next/router'
const openProductPage = id => _ => Router.push({ pathname: `/product/${id}` })

export default function MyCard({ product:
    { id, title, timeline, categories, images } }) {
    const image = images.pop()
    const hideTitle = title
    const category = categories.map(category => category.toUpperCase()).pop()

    const { price } = timeline.map(tl => ({
        date: new Date(tl.date),
        price: '$' + tl.price.toFixed(2)
    })).sort((tlA, tlB) => tlA.date > tlB.date).pop()

    return (
        <Card key={id}>
            <img
                className={styles.thumb}
                src={'https://' + image}
                onClick={openProductPage(id)} />
            <Grid className={styles.content} container
                direction="column" justify="space-between" alignItems="center" >
                <span className={styles.title} align="center" >
                    {hideTitle}
                </span>

                <Grid container
                    direction="row" justify="space-between" alignItems="flex-end" >
                    <span align="left" color="textPrimary"> {price} </span>
                    <Chip label={category} size="small" variant="outlined" />
                </Grid>
            </Grid>
        </Card>
    )
}