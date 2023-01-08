import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import NavOptions from '../components/NavOptions'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {GOOGLE_MAPS_API_KEYS} from '@env'
import { useDispatch } from 'react-redux';
import {setOrigin, setDestination} from '../slices/navSlices'
import Navfav from '../components/Navfav';

const HomeScreens = () => {

    const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
            style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
            }}
            source={{
                uri: "https://links.papareact.com/gzs"
            }}
        />
        <GooglePlacesAutocomplete
            placeholder="where From?"
            styles={{
                container: {
                    flex: 0,
                },
                textInput: {
                    fontSize: 18,
                }
            }}
            onPress={(data, details = null) => {
                dispatch(setOrigin({
                    location: details.geometry.location,
                    description: data.description,
                }))
                dispatch(setDestination(null))
            }}
            fetchDetails={true}
            enablePoweredByContainer={false}
            minLength={2}
            query={{
                key: GOOGLE_MAPS_API_KEYS,
                language: 'en',
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
        />
        <NavOptions/>
        <Navfav/>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreens

const styles = StyleSheet.create({})