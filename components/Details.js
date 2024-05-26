import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import {Picker} from '@react-native-picker/picker';
import { useLayoutEffect } from 'react';
import axios from 'axios';
import * as Location from 'expo-location';

const Details = ({ navigation, route, }) => {

    // const [coord, setCoord] = useState({});
    const [data, setData] = useState([]);
    const [selectedValue, setSelectedValue] = useState("location"); 
    const { commodity } = route.params;
    const {coord} = route.params;

    useEffect(() => {
        (async () => {
            await getdata(commodity);
            console.log(coord);

        })();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: commodity
        });
    }, [navigation]);

    async function getdata(commodity = "", limit = 30) {
        let url = 'https://api.data.gov.in/catalog/6141ea17-a69d-4713-b600-0a43c8fd9a6c?api-key=579b464db66ec23bdd0000019eaed1ae95144f925f630f26665d3a02&format=json';
        if (commodity !== "") {
            url = url + '&filters[commodity]=' + commodity;
        }
        if (limit > 0) {
            url = url + '&limit=' + limit;
        }
        try {
            let res = await axios.get(url);
            let records = res.data.records;

            for (let i = 0; i < records.length; i++) {
                dis = await getdistance(records[i].market, records[i].district, records[i].state);
                records[i].distance = dis;
            }

            records.sort((a, b) => {
                return a.distance - b.distance;
            }
            );
            setData(records);
            console.log(records.length);
        }
        catch (err) {
            console.error(err);
        }

    }

    async function getdistance(market, district, state) {
        // console.log(coord);
        // if(coord == null){
        //     return 99999;
        // }
        let url2 = 'http://api.positionstack.com/v1/forward?access_key=50b6212e95f574839bb5cc27d3ddc85f';
        let url3 = url2 + '&query=' + market + ', ' + district + ', ' + state + ' India';
        let latitude1 = 0, longitude1 = 0;
        try {
            let res = await axios.get(url3);
            if (res.data.data.length > 0) {
                latitude1 = res.data.data[0].latitude;
                longitude1 = res.data.data[0].longitude;
                console.log(latitude1 + " " + longitude1);
            } else {
                let url4 = url2 + '&query=' + district + ', ' + state + ', India';

                let res2 = await axios.get(url4);
                if (res2.data.data.length > 0) {
                    latitude1 = res2.data.data[0].latitude;
                    longitude1 = res2.data.data[0].longitude;
                    console.log(latitude1 + " " + longitude1);
                }
            }
        console.log(coord.latitude + " " + coord.longitude);
        }
        catch (err) {
            console.log(err);
        }
        let distance = calculateDistance(coord.latitude, coord.longitude, latitude1, longitude1);
        console.log(distance);
        return distance;
    }

    async function calculateDistance(lat1, lon1, lat2, lon2) {
        const earthRadius = 6371; // Earth's radius in kilometers (you can use 3959 for miles)

        // Convert latitude and longitude from degrees to radians
        const lat1Rad = toRadians(lat1);
        const lon1Rad = toRadians(lon1);
        const lat2Rad = toRadians(lat2);
        const lon2Rad = toRadians(lon2);

        // Haversine formula
        const dLat = lat2Rad - lat1Rad;
        const dLon = lon2Rad - lon1Rad;
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1Rad) * Math.cos(lat2Rad) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = earthRadius * c;

        return distance.toFixed(2);
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    
    function sortData(itemValue) {
        setSelectedValue(itemValue);
        if (itemValue == 'price') {
            data.sort((a, b) => {
                return b.modal_price - a.modal_price;
            });
        } else {
            data.sort((a, b) => {
                return a.distance - b.distance;
            });
        }
    }

    return (
        <View>
            <Text>Details</Text>
            {/* <text>{coord.latitude}</text> */}
            <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => sortData(itemValue)}>
                <Picker.Item label="Sort distance" value="location" />
                <Picker.Item label="Sort Price" value="price" />
                
            </Picker>
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.flexstyle}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.market}</Text>
                            <Text>Rs. {item.modal_price}/Quintal </Text>
                        </View>
                        <View style={styles.flexstyle}>
                            <Text>{item.district + ', ' + item.state}</Text>
                        </View>
                        <View style={styles.flexstyle}>
                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{item.distance + ' km'}</Text>
                            <Text>updated on {item.arrival_date}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'space-between',
        padding: 10,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5
    },
    flexstyle: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default Details