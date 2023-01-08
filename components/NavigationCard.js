import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import tw from 'tailwind-react-native-classnames'
import {GOOGLE_MAPS_API_KEYS} from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { setDestination } from '../slices/navSlices'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Navfav from './Navfav'
import { Icon } from 'react-native-elements'

const NavigationCard = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`bg-white flex-1 pl-2 pr-2`}>
      <Text style={tw`text-center py-0 pt-0 text-xl`}>NavigationCard</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
            <GooglePlacesAutocomplete
                placeholder='where to?'
                styles={input}
                onPress={(data, details = null) => {
                    dispatch(setDestination({
                        location: details.geometry.location,
                        description: data.description,
                    }))
                    navigation.navigate('RideOptionsCard')
                }}
                fetchDetails={true}
                minLength={2}
                enablePoweredByContainer={false}
                debounce={400}
                nearbyPlacesAPI="GooglePlacesSearch"
                query={{
                    key: GOOGLE_MAPS_API_KEYS,
                    language: 'en',
                }}
            />
        </View>
        <Navfav/>
      </View>
      <View style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}>
        <TouchableOpacity style={tw`flex-row justify-between bg-black w-24 px-4 py-3 rounded-full`}
            onPress={() => navigation.navigate("RideOptionsCard")}
        >
            <Icon
                name='car'
                type='font-awesome'
                color="white"
                size={16}
            />
            <Text style={tw`text-center text-white`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Icon
                name='fast-food-outline'
                type='ionicon'
                color="black"
                size={16}
            />
            <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default NavigationCard

const input = StyleSheet.create({
    container: {
        backgroundColor: "white",
        paddingTop: 20,
        flex: 0,
    },
    textInput: {
        backgroundColor: '#DDDDDF',
        borderRadius: 0,
        fontSize: 18,
    },
    texInputContainer: {
        paddingHorizontal: 20,
        paddingBottom: 0,
    }
})