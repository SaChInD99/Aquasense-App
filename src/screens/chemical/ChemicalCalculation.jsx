

import { View, Text, Dimensions, PermissionsAndroid, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../../core/theme';
import { DatePickerInput } from 'react-native-paper-dates';
import Button from '../../components/Button'
import TextInput from '../../components/TextInput';
import { Switch } from 'react-native-paper';
import { inputValidator } from '../../helpers/inputValidator';

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height

export default function ChemicalCalculation({ navigation, route }) {



    const [currentPhValue, setCurrentPhValue] = useState("12.3")
    const [inputDate, setInputDate] = useState(undefined)
    const [volume, setVolume] = useState({ value: '', error: '' });
    const [requiredAmount, setRequiredAmount] = useState(null)
    const CONVERSIOAL_FACTOR = 0.0038
    const TREATMENT_RATE = 2
    // const [isSwitchOn, setIsSwitchOn] = useState(false)
    // const [measuringValue, setMesasuringValue] = useState('')


    // const onToggleSwitch = () => {
    //     setIsSwitchOn(!isSwitchOn)
    //     changeVolumeMeasuringValue()
    // };

    // const changeVolumeMeasuringValue = () => {
    //     console.log(isSwitchOn ? "liters" : "galoons")
    //     if (isSwitchOn) {
    //         setMesasuringValue("liters")
    //     } else {
    //         setMesasuringValue('galoons')
    //     }
    // }

    //calculation 
    const calculation = () => {

        const volumeError = inputValidator(volume.value)
        if (volumeError) {
            setVolume({ ...volume, error: volumeError });
            return;
        }

        let answer = volume.value * CONVERSIOAL_FACTOR * TREATMENT_RATE
        setRequiredAmount(answer)

    }

    return (
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
            }}>Chemical Dosage Calculation</Text>
            <View style={{ padding: 20, gap: 10 }}>
                <View style={{ gap: 10, width: '100%' }}>
                    {/* <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.inputLabel}>
                            Change :
                        </Text>
                        <Text style={styles.phLabel}>

                            <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
                        </Text>

                    </View> */}
                    <View style={{ gap: -10, width: '100%' }}>
                        <Text style={styles.inputLabel}>Enter Number of Gallons</Text>
                        <TextInput
                            label=""
                            returnKeyType="next"
                            value={volume.value}
                            onChangeText={text => setVolume({ value: text, error: '' })}
                            error={!!volume.error}
                            errorText={volume.error}
                            autoCapitalize="none"
                            autoCompleteType="username"
                            textContentType="username"
                            keyboardType="default"
                        />
                    </View>
                    <Button mode="contained" style={{ marginTop: 40 }} onPress={() => calculation()}>
                        <Text style={{ ...styles.textBtn, color: '#FFF' }} >Calculate</Text>
                    </Button>
                    {requiredAmount ? <View style={{ gap: 20, width: '100%', flexDirection: 'column', textAlign: 'center', marginTop: 40 }}>
                        <Text style={styles.predictionLabel}>
                            Amount of {route.params.data} Chemical Required
                        </Text>
                        <Text style={styles.predictionPhLabel}>
                            {requiredAmount} g
                        </Text>

                    </View>
                        :
                        <View style={{ gap: 20, width: '100%', flexDirection: 'column', textAlign: 'center', marginTop: 40 }}>
                            <Text style={styles.predictionLabel}>
                                Calculate {route.params.data} requirement for number of gallons
                            </Text>
                            {/* <Text style={styles.predictionPhLabel}>
                            {requiredAmount} g
                        </Text> */}

                        </View>
                    }


                </View>

            </View>
        </View >
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
    textBtn: {
        fontWeight: '400',
        fontSize: 20,
    },
    inputLabel: {
        fontSize: 18,
        fontWeight: '400',
        color: theme.colors.black,
    },
    predictionLabel: {
        fontSize: 20,
        fontWeight: '900',
        color: theme.colors.black,
        textAlign: 'center'
    },
    predictionPhLabel: {
        fontSize: 25,
        fontWeight: '900',
        color: theme.colors.black,
        textAlign: 'center'
    },
    phLabel: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.black,
        textAlign: 'right',
        paddingLeft: 150
    },
    dropdownBtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdownBtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdownDropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdownRowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdownRowTxtStyle: { color: '#444', textAlign: 'left' },

})