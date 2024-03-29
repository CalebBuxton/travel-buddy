import React, {useEffect, useState} from "react";
import Header from "./componenets/Header/Header";
import List from "./componenets/List/List";
import Map from "./componenets/Map/Map";
import { CssBaseline, Grid } from '@material-ui/core'
import { getPlacesData,  } from "./api";

const App = () => {

    const [places, setPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildClicked] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState('restaurants')
    const [rating, setRating] = useState('')
    const [filteredPlaces, setFilteredPlaces] = useState([])

    useEffect(() => {
      navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}}) => {
        setCoordinates({lat: latitude, lng: longitude})
      })
    }, [])
    
    useEffect(() => {
      const filteredPlaces = places.filter((place) => place.rating > rating)
      setFilteredPlaces(filteredPlaces)
    }, [rating])
    

    useEffect(() => {
        
        if(bounds.sw && bounds.ne){
            setIsLoading(true)
            getPlacesData(type, bounds.sw, bounds.ne)
            .then((data) => {
                setPlaces(data?.filter((place) => place.name && place.num_reviews > 5 && place.rating > 0.9))
                setFilteredPlaces([])
                setIsLoading(false)
            })
        }
        
    }, [type, bounds])
    

    return (
        <>
            <CssBaseline/>
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <List 
                    places={filteredPlaces.length ? filteredPlaces : places} 
                    childClicked={childClicked} 
                    isLoading={isLoading} 
                    type={type}
                    setType={setType}
                    rating={rating}
                    setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map 
                    places={filteredPlaces.length ? filteredPlaces : places}  
                    setCoordinates={setCoordinates} 
                    setBounds={setBounds} 
                    coordinates={coordinates} 
                    setChildClicked={setChildClicked}
                    />
                </Grid>
            </Grid>
        </>
    )
}


export default App