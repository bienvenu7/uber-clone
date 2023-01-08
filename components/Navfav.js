import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'


const data = [
    {
        id: "100",
        location: "Home",
        icon: "home",
        destination: "Code Street, London, UK"
    },
    {
        id: "200",
        location: "Work",
        destination: "London Eye, London, UK",
        icon: "briefcase"
    }
]

const Navfav = () => {
  return (
    <FlatList
        data={data}
        ItemSeparatorComponent={() => (
            <View style={[tw`bg-gray-200`, {height: 0.5}]}/>
        )}
        keyExtractor={(item) => item.id}
        renderItem={({item: {location, destination, icon}}) => (
            <TouchableOpacity style={tw`flex-row items-center p-5`}>
                <Icon
                    style={tw`mr-4 rounded-full bg-gray-300 p-3`}
                    name={icon}
                    type="ionicon"
                    color="white"
                    size={18}
                />
                <View>
                    <Text style={tw`font-semibold text-lg`}>{location}</Text>
                    <Text style={tw`text-gray-500`}>{destination}</Text>
                </View>
            </TouchableOpacity>
        )}
    />
  )
}

export default Navfav

const styles = StyleSheet.create({})