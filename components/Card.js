import React from 'react'
import { Box, Card, CardContent, CardActions, Button } from '@material-ui/core'

import Router from 'next/router'
const openProductPage = id => _ => Router.push({ pathname: `/product/${id}` })

const hideText = (s, end, sglEnd = '...') => s.substring(0, end) + sglEnd

export default function MyCard({ product: { id, title, timeline, categories } }) {
    const hideTitle = hideText(title, 30)
    const category = categories.pop()

    const { price } = timeline.
        map(tl => ({ date: new Date(tl.date), price: tl.price })).
        sort((tlA, tlB) => tlA.date > tlB.date).pop()

    const linkButton = <Button size="small" onClick={openProductPage(id)}>Detalhes</Button>

    return (
        <Box width={300} marginY={1}>
            <Card key={id}>
                <CardContent>
                    <h3>{hideTitle}</h3>
                    <span>{category}</span><br />
                    <span>R$ {price}</span><br />
                </CardContent>
                <CardActions> {linkButton} </CardActions>
            </Card>
        </Box >
    )
}