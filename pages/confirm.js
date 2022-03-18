import {useEffect, useState} from 'react';
import tw from "tailwind-styled-components";
import Map from './components/Map';
import RideSelector from './components/RideSelector';
// Importing useRouter to bring our data url data into the map
import { useRouter } from 'next/router';
import Link from 'next/link';

const confirm = () => {
     const router = useRouter()

     // we got our data in console, now we have use it on the map
     const {pickup, dropoff } = router.query
    //    console.log("Pickup",pickup)
    //    console.log("Dropoff",dropoff)

    // In these useStates we are giving [0,0 ] because we can get the error of undefined, this is like north pole or something like that.
    const [ pickupCoordinates, setPickupCoordinates] = useState([0,0]);
    const [ dropoffCoordinates, setDropoffCoordinates] = useState([0,0]);

    const getPickupCoordinates= (pickup)=>{
    //  const pickup = "Santa Monica";
     // Creating a Fetch function to get the data from the Coordinates
     // Note: We use ? in last of json so that the browser knows that its a create parameter
     fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${pickup}.json?` +
      new URLSearchParams({
          access_token: "pk.eyJ1IjoidmlrcmFudHRsYWF0YSIsImEiOiJja3cwcGgwNGMxcTdwMm9waDhoejRuanU0In0.H_kr5POn3QCi48JruRJG7w",
          // We are adding limit so that we can limit data we are getting
          limit:1,
      })
     ).then(response => response.json()).then(data => {
         // This console is used to get the coordinates
        //  console.log(data.features[0].center)

         // Using useState to hold the data
         setPickupCoordinates(data.features[0].center)
     })
    }

    // geting Dropof Coordinates
    const getDropoffCoordinates = (dropoff) =>{
        // const dropoff = "Los Angeles";
        // Creating a Fetch function to get the data from the Coordinates
        // Note: We use ? in last of json so that the browser knows that its a create parameter
        fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${dropoff}.json?` +
         new URLSearchParams({
             access_token: "pk.eyJ1IjoidmlrcmFudHRsYWF0YSIsImEiOiJja3cwcGgwNGMxcTdwMm9waDhoejRuanU0In0.H_kr5POn3QCi48JruRJG7w",
             // We are adding limit so that we can limit data we are getting
             limit:1,
         })
        ).then(response => response.json()).then(data => {
            // This console is used to get the coordinates
            // console.log('dropoff')
            // console.log(data.features[0].center)

             // Using useState to hold the data
             setDropoffCoordinates(data.features[0].center)
        })
    }

    // Calling the function
    useEffect(() => {
      getPickupCoordinates(pickup);
      getDropoffCoordinates(dropoff);
      
    }, [pickup, dropoff])

    return (
        <Wrapper>
            {/* Adding a back button */}
         <ButtonContainer>
             <Link href="/search">
             <BackButton src='https://img.icons8.com/ios-filled/50/000000/left.png' />
             </Link>
         </ButtonContainer>
            <Map pickupCoordinates={pickupCoordinates} 
            dropoffCoordinates={dropoffCoordinates}/>
            <RideContainer>
                {/* Creatng a component for RideSelector */}
             <RideSelector pickupCoordinates={pickupCoordinates} 
            dropoffCoordinates={dropoffCoordinates}/>
            
             <ConfirmButtonContainer>
                 <ConfirmButton>
                 Confirm UberX
                 </ConfirmButton>
              
             </ConfirmButtonContainer>
            </RideContainer>
        </Wrapper>
    )
}

export default confirm;

const Wrapper = tw.div`
flex flex-col h-screen
`
const RideContainer = tw.div`
flex-1 flex flex-col h-1/2
`

const ConfirmButtonContainer = tw.div`
border-t-2

`
const ConfirmButton = tw.div`
bg-black text-white my-4 mx-4 py-4 text-center text-xl
`
const ButtonContainer = tw.div`
rounded-full absolute top-4 left-4 z-10 bg-white shadow-md cursor-pointer 
`
const BackButton = tw.img`
h-full object-contain
`