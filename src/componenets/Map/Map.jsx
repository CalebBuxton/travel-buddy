import React, { useState } from 'react'
import GoogleMapReact from 'google-map-react'
import { Paper, Typography, useMediaQuery } from '@material-ui/core'
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined'
import Rating from '@material-ui/lab/Rating'
import useStyles from './styles'
import mapStyles from './mapStyles'

const Map = ({places, setCoordinates, setBounds, coordinates, setChildClicked}) => {
  const classes = useStyles()
  const isMobile = useMediaQuery('(max-width:600px)')
  
  // if (!coordinates.lat) {
  //   coordinates = {lat:33.74, lng: -84.4 }
  // }

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
      bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
      defaultCenter= {{lat: 33.74, lng: -84.40}}
      center={coordinates}
      defaultZoom={14}
      margin={[50,50,50,50]}
      options={{disableDefaultUI: true, zoomControl: true, styles: mapStyles}}
      onChange={(e) => {
        setCoordinates({lat: e.center.lat, lng: e.center.lng})
        setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw})
      }}
      onChildClick={(child) => { setChildClicked(child) }}
      >
        {
          places?.map((place, i) => (
            <div 
            key={i}
            className={classes.markerContainer}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            >
              {isMobile ? (
                <LocationOnOutlinedIcon color='primary' fontSize='large' />
              ) : (
                <Paper elevation={3} className={classes.paper} >
                  <Typography className={classes.typography} variant='subtitle2' gutterBottom >
                    {place.name}
                  </Typography>
                  <img
                  className={classes.pointer}
                  src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'} 
                  alt={place.name} />
                  <Rating size='small' value={Number(place.rating)} readOnly />
                </Paper>
              )}
            </div>
          ))
      }

      </GoogleMapReact>
    </div>
  )
}

export default Map