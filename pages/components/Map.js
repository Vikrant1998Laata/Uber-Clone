import React from 'react'
import tw from "tailwind-styled-components"
import mapboxgl from '!mapbox-gl';
import { useEffect } from 'react'


mapboxgl.accessToken = 'pk.eyJ1IjoidmlrcmFudHRsYWF0YSIsImEiOiJja3cwcGgwNGMxcTdwMm9waDhoejRuanU0In0.H_kr5POn3QCi48JruRJG7w';

const Map = (props) => {
    // console.log(props)

    useEffect(() => {
        console.log("Hello")
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-99.29011, 39.39172],
            zoom: 3,
        });


        // Adding PickupCoordinates and DropoffCoordinates to map on Screen
        if(props.pickupCoordinates){
          addToMap(map, props.pickupCoordinates);
        }
        
        if(props.dropoffCoordinates){
            addToMap(map, props.dropoffCoordinates)
        }
        

        // Adding auto zoom to coordinates, we can google the mapbox fitBounds
        if(props.pickupCoordinates && props.dropoffCoordinates){
            map.fitBounds([
                props.dropoffCoordinates,
                props.pickupCoordinates,
            ],{
                padding: 60,
            })
        }


         // Initially we will get data undefined because the data is not being loaded at that time, so for making it work we have these it values in [], which says that when the data get ready run it again to get the data
    }, [props.pickupCoordinates, props.dropoffCoordinates])

    // Creating a function to add to map and adding parameters to it
    const addToMap = (map, coordinates) => {
        // Create a default Marker and add it to the map.
        const marker1 = new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map);
    }


   




    return (
        <Wrapper id="map"></Wrapper>
    )
}

export default Map

const Wrapper = tw.div`
flex-1 h-1/2
`