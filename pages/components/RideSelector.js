import React, {useState, useEffect} from 'react'
import tw from "tailwind-styled-components";
import { carList } from '../data/carList';


const RideSelector = ({pickupCoordinates, dropoffCoordinates }) => {
    // Calculating the Ride Duration 
    const [rideDuration, setRideDuration] = useState(0);

   // Get ride duration from MAPBOX API
   // 1. pickupCoordinates.
   // 2. dropoffCoordinates.
   // we need two pickCoordinates because we need to calculate the x-axis and y-axis to get the exact pin of the location.
   
   useEffect(() => {
       // We have it the access_token otherwise we will get errorr of Failed to fetch
      rideDuration = fetch(`https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates[0]}, ${pickupCoordinates[1]};${dropoffCoordinates[0]}, ${dropoffCoordinates[1]}?access_token=pk.eyJ1IjoidmlrcmFudHRsYWF0YSIsImEiOiJja3cwcGgwNGMxcTdwMm9waDhoejRuanU0In0.H_kr5POn3QCi48JruRJG7w`).then(res => res.json()).then(data =>{
           setRideDuration(data.routes[0].duration / 100)
       })
       // The above  setRideDuration(data.routes[0].duration / 100) is used to say that give us specific route only
   }, [pickupCoordinates, dropoffCoordinates])
   // we are giving this dependencies here because if the pickup and dropoff coordinates changes then we want refresh whole page data to be updated according to that

    return (
        <Wrapper>
         <Title>
             Choose a ride, or swipe up for more
         </Title>

         <CarList>
{/* Learn Command click */}
{carList.map((car, index)=>(
  <Car key={index}>
  <CarImage src={car.imgUrl}/>
   <CarDetails>
       <Service>{car.service}</Service>
       <Time>5 min away</Time>
   </CarDetails>
   <Price>{'$' + (rideDuration * car.multiplier).toFixed(2)}</Price>
   {/* In this price we have written this code to get the price according to the multiplier of the different car defined in carList and toFixed function is used to get only two decimal places. */}
</Car>
))}
        

         </CarList>

        </Wrapper>
    )
}

export default RideSelector

const Car = tw.div`
flex p-4  items-center
`
 
const CarImage = tw.img`
h-14 mr-4
`
const CarDetails = tw.div`
flex-1
`
const Service = tw.div`
font-medium
`

const Time = tw.div`
text-xs text-blue-500
`
const Price =tw.div`
text-sm font-medium
`



const Wrapper = tw.div`
flex-1 overflow-y-scroll flex flex-col
`
const Title = tw.div`
text-center text-gray-500 text-xs py-2 border-b font-semibold
`

const CarList = tw.div`
overflow-y-scroll
`