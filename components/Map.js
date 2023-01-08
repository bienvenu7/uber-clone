import { StyleSheet, Text, View, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

import MapView, {Marker} from 'react-native-maps'
import tw from 'tailwind-react-native-classnames'
import { useDispatch, useSelector } from 'react-redux'
import { selectDestination, selectOrigin, selectTravelTimeInfo, setTravelTimeInfo } from '../slices/navSlices'
import MapViewDirections from 'react-native-maps-directions'
import { GOOGLE_MAPS_API_KEYS } from '@env'

const Map = () => {

    const dispatch = useDispatch();

    const origin = useSelector(selectOrigin)
    const destination = useSelector(selectDestination)
    const mapRef = useRef(null)

    const [getMatrix, setGetMatrix] = useState({})

    useEffect(() => {
        if(!origin || !destination) return;
        mapRef.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: {top: 150, right: 50, bottom: 50, left: 150, animated: true}
        })
    }, [origin, destination]);

    // const traceRoute = (args) => {
    //     if(args) {
    //         dispatch(setTravelTimeInfo(args.legs[0]))
    //         // console.log(args.legs[0])
    //         // setGetMatrix(args?.legs[0])
    //     }
    // }

    useEffect(() => {
        
        if(!origin || !destination) return

        const getTravelTime = async () => {
            fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEYS}`)
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
                    // console.log(data.rows[0].elements[0])
                });
        };

        getTravelTime();
    }, [origin, destination, GOOGLE_MAPS_API_KEYS])
    
  return (
    <MapView
        ref={mapRef}
        style={tw`flex-1`}
        mapType="mutedStandard"
        initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        }}
    >
        {origin && destination && (
            <MapViewDirections
                origin={origin.description}
                destination={destination.description}
                apikey={GOOGLE_MAPS_API_KEYS}
                strokeWidth={4}
                strokeColor="black"
                // onReady={traceRoute}
            />
        )}

        {origin?.location && (
            <Marker
                coordinate={{
                    latitude: origin.location.lat,
                    longitude: origin.location.lng,
                }}
                title="Origin"
                description={origin.description}
                identifier="origin"
            />
        )}

        {destination?.location && (
            <Marker
                coordinate={{
                    latitude: destination.location.lat,
                    longitude: destination.location.lng,
                }}
                title="destination"
                description={destination.description}
                identifier="destination"
            />
        )}
    </MapView>
  )
}

export default Map

const styles = StyleSheet.create({})