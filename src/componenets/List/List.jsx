import React, { createRef, useEffect, useState } from 'react'
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core'
import useStyles from './styles'
import PlaceDetails from '../PlaceDetails/PlaceDetails'

const List = ({places, childClicked, isLoading, type, setType, rating, setRating}) => {
  const classes = useStyles()
  
  const [elRefs, setElRefs] = useState([])

  useEffect(() => {
    setElRefs((refs) => Array(places?.length).fill().map((_, i) => createRef()));
  }, [places])  

  return (
    <div className={classes.container}>
      <Typography variant='h4'>Restaurants, Hotels, & Attractions near you!</Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size='5rem' />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value='restaurants'>Restaurants</MenuItem>
              <MenuItem value='hotels'>Hotels</MenuItem>
              <MenuItem value='attractions'>Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Ratings</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0.9}>All</MenuItem>
              <MenuItem value={4.4}>4.5+ Stars</MenuItem>
              <MenuItem value={3.9}>4+ Stars</MenuItem>
              <MenuItem value={2.9}>3+ Stars</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} item key={i} xs={12}>
                <PlaceDetails place={place} selected={Number(childClicked) === i} refProp={elRefs[i]} />
              </Grid>
            ))}
          </Grid>
        </>)}
    </div>
  )
}

export default List