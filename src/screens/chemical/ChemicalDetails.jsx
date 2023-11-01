import { View, Text, Dimensions, PermissionsAndroid, Image, StyleSheet, FlatList, ScrollView } from 'react-native'
import { theme } from '../../core/theme';
import React, { useState, useEffect } from 'react'
import { Button } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

export default function ChemicalDetails({ navigation }) {

    const [chemicalDetails, setChemicalDetails] = useState([])

    const items = [{
        id: 1,
        date: "12",
        Ph: 14,
        Chemical: "potassim"
    },
    {
        id: 2,
        date: "12",
        Ph: 14,
        Chemical: "Uria"
    },
    {
        id: 3,
        date: "12",
        Ph: 14,
        Chemical: "NH3"
    }, {
        id: 4,
        date: "12",
        Ph: 14,
        Chemical: "HCL"
    }, {
        id: 5,
        date: "12",
        Ph: 14,
        Chemical: "H2SO4"
    },
    {
        id: 6,
        date: "12",
        Ph: 14,
        Chemical: "H20"
    }
    ]

    useEffect(() => {

        //read data from DB
        let index = 1
        const unsubscribe = firestore()
            .collection('chemicals')
            .onSnapshot(snapshot => {
                const chemicalDataList = [];
                let index = 1
                snapshot.forEach(doc => {

                    const {
                        timestamp,
                        predictedChemical,
                        predictedPhValue
                    } = doc.data();

                    const secs = timestamp.seconds;
                    const output = new Date(secs * 1000);
                    const date = new Date(output);

                    const day = date.getUTCDate();
                    const month = date.getUTCMonth() + 1; // Months are zero-indexed, so add 1
                    const year = date.getUTCFullYear();

                    const formattedDate = `${day}/${month}/${year}`;


                    const uniqueId = `${index}-${secs}`

                    chemicalDataList.push({
                        id: uniqueId,
                        formattedDate,
                        predictedChemial: predictedChemical ? predictedChemical : 'potasium permangnate',
                        predictedPhValue
                    });
                });
                setChemicalDetails(chemicalDataList)

            });

        return () => unsubscribe();
    }, []);





    return (
        <ScrollView>
            <View style={styles.content}>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, width: width, height: height, backgroundColor: theme.colors.primary, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, zIndex: -1 }} >
                    <Image source={{ uri: "https://i.ibb.co/JkCMvpQ/0fc05777d3c5b33c0f08e4fdda51c3ea.jpg" }} width={width} height={height} style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} />
                </View>
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, width: width, height: height, backgroundColor: theme.colors.white, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, zIndex: -1, opacity: 0.7 }} />
                <Text style={{
                    fontSize: 24,
                    alignSelf: 'center',
                    paddingTop: 20,
                    color: theme.colors.black,
                    fontWeight: '500'
                }}>Predicted Chemical Details</Text>
                <View style={{ padding: 20, gap: 10 }}>
                    <View style={{ gap: 10, width: '100%' }}>


                        {chemicalDetails.map((chemicaldetail, index) => {
                            return (
                                <View style={styles.item} key={index}>

                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginTop: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.tableHeaders}>
                                                {chemicaldetail.predictedChemial == "Good" ? 'No need to add chemicals' : 'Chemical Name :'}
                                            </Text>
                                            <Text style={styles.tableData}>

                                                {chemicaldetail.predictedChemial}
                                            </Text>

                                        </View>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.tableHeaders}>
                                                Date :
                                            </Text>
                                            <Text style={styles.tableData}>

                                                {chemicaldetail.formattedDate}
                                            </Text>

                                        </View>

                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={styles.tableHeaders}>
                                                Ph Value :
                                            </Text>
                                            <Text style={styles.tableData}>

                                                {chemicaldetail.predictedPhValue}
                                            </Text>

                                        </View>




                                    </View>
                                    <View style={{ padding: 20 }}>
                                        {chemicaldetail.predictedChemial != "Good" ? <Button mode="contained"
                                            onPress={() => navigation.navigate('chemicalCalc', { data: chemicaldetail.predictedChemial })}
                                        >
                                            Calculate
                                        </Button>
                                            :
                                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={{ uri: "https://i.ibb.co/mCCzsVf/clipart624281-2.png" }} width={40} height={40} style={styles.image} />
                                            </View>
                                        }
                                    </View>

                                </View>
                            )
                        })}

                    </View>
                </View>
            </View>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        width: '100%',
        backgroundColor: "#FFFFFF",
        gap: 20,
        position: 'relative'
    },
    tableHeaders: {
        fontSize: 16,
        fontWeight: '900',
        color: theme.colors.black,
    },
    tableData: {
        fontSize: 16,
        fontWeight: '400',
        color: theme.colors.black,
    },
    item: {
        backgroundColor: '#98d0e9',
        paddingTop: 10,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        marginVertical: 8,

        // marginHorizontal: 16,
        borderRadius: 10,
        // flexDirection: 'row',
        // justifyContent: 'space-between'
        shadowColor: '#000',           // Color of the shadow
        shadowOffset: { width: 30, height: 30 },  // Change the offset as needed
        shadowOpacity: 4,            // Opacity of the shadow
        shadowRadius: 2,               // Radius of the shadow blur
        elevation: 10,
    },
    title: {
        fontSize: 32,
        color: theme.colors.black,
    },
    textBtn: {
        fontWeight: '400',
        fontSize: 20,
    },
    button: {
        width: '100%',
        marginVertical: 10,
        paddingVertical: 2,
    },
    text: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 26,
    },
    image: {
        borderRadius: 50,
        shadowColor: '#000',           // Color of the shadow
        shadowOffset: { width: 50, height: 50 },  // Change the offset as needed
        shadowOpacity: 0.5,            // Opacity of the shadow
        shadowRadius: 10,               // Radius of the shadow blur
        // elevation: 1,
    }
})