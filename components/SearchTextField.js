import React from 'react';

import { TextField, InputAdornment } from '@material-ui/core';
import { SearchSharp } from '@material-ui/icons';

import Router from 'next/router'
const searchTerm = term => Router.push({ pathname: '/', query: { term } })

export default function SearchTextField({ term }) {
    return (
        <TextField
            variant="outlined"
            label="Search" placeholder="Cherry MX" defaultValue={term}
            onKeyPress={e => e.key == 'Enter' && searchTerm(e.target.value)}
            InputProps={{
                startAdornment: <InputAdornment position="start">
                    <SearchSharp />
                </InputAdornment>
            }}
        />
    )
}
