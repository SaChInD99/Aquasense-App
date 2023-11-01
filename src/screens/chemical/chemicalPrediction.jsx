import { View, Text, Dimensions, PermissionsAndroid, Image, StyleSheet, Keyboard } from 'react-native'
import React, { useState, useEffect } from 'react'
import { theme } from '../../core/theme';
import { DatePickerInput, TimePickerModal } from 'react-native-paper-dates';
import Button from '../../components/Button'
import TextInput from '../../components/TextInput';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';
import { Snackbar } from 'react-native-paper';
import { predictForecastedPhValue, predictChemical } from '../../services/chemicalPrediction.service';
import Modal from "react-native-modal";
import FAIcon from 'react-native-vector-icons/FontAwesome5';

const width = Dimensions.get("screen").width
const height = Dimensions.get("screen").height


export default function ChemicalPredictionScreen({ navigation }) {

    const [currentPhValue, setCurrentPhValue] = useState("12.3")
    const [inputDate, setInputDate] = useState(undefined)
    const [time, setTime] = useState({ value: '', error: '' });
    const [predictedPh, setPredictedPh] = useState(null)
    const [predictedChemical, setPredictedChemical] = useState('')
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState('Oops... Something went wrong');
    const [isModalVisible, setModalVisible] = useState(false);
    const [visibleTime, setVisibleTime] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [chemicalImage, setChemicalImage] = useState('')

    useEffect(() => {
        readRDB();

    }, []);

    const onDismiss = React.useCallback(() => {
        setVisibleTime(false);
    }, [setVisibleTime]);

    const onConfirm = React.useCallback(
        ({ hours, minutes }) => {
            setVisibleTime(false);
            setTime({ ...time, value: `${hours}:${minutes}` });
        },
        [setVisibleTime],
    );

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);

    //backend calls
    const findTheChemical = async () => {

        const CHEMICAL_ONE = "https://i.ibb.co/Fw9BrWJ/Potassium-permanganate-sample.jpg"
        const CHEMICAL_TWO = "https://i.ibb.co/rHqpQ2J/sodium-carbonate-1533821209-4181100.jpg"
        const GOOD = "https://i.ibb.co/mCCzsVf/clipart624281-2.png"
        const yyyy = inputDate.getFullYear();
        let mm = inputDate.getMonth() + 1; // Months start at 0!
        let dd = inputDate.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        const formattedToday = mm + '/' + dd + '/' + yyyy;

        const payload = {
            date_time: `${formattedToday} ${time.value}`,
        }

        //find the predicted Ph value
        let response = await predictForecastedPhValue(payload)
        setPredictedPh(response.data)
        if (response.ok) {
            let payload = {
                pH: response.data
                // Day: dd,
                // Month: mm,
                // Year: yyyy
            }
            //find the predicted chemical
            let response2 = await predictChemical(payload)
            console.log(response2)
            if (response2.ok) {
                if (response2.data === 'Potassium Permanganate') {
                    setPredictedChemical('Potassium Permanganate')
                    setChemicalImage(CHEMICAL_ONE)
                } else if (response2.data === 'Sodium Carbanate') {
                    setPredictedChemical('Sodium Carbanate')
                    setChemicalImage(CHEMICAL_TWO)
                } else if (response2.data === 'Good') {

                    setPredictedChemical('Good')
                    setChemicalImage(GOOD)
                }
                return response.data
            } else {
                setMsg("Something Went Wrong")
                onToggleSnackBar()
            }
        }
        else {
            setMsg("Something Went Wrong")
            onToggleSnackBar()
        }



    }

    //calling strat prediction
    const startPrediction = async () => {


        if (!inputDate) {
            setMsg("Please add future date.")
            onToggleSnackBar()
        } else if (!time.value) {
            setMsg("Please add future Time.")
            onToggleSnackBar()
        } else {
            //calling for backend functions to find the chemical
            let chemicalresponse = await findTheChemical()

            if (chemicalresponse) {

                //save to DB 
                firestore()
                    .collection('chemicals')
                    .add({
                        predictedPhValue: chemicalresponse.toFixed(2),
                        predictedChemical: predictedChemical,
                        timestamp: inputDate,
                    })
                    .then(() => {
                        setMsg('predicted information added ');
                        onToggleSnackBar();

                    })
                    .catch(error => {

                        setMsg('Oops... Something went wrong...');
                        onToggleSnackBar();
                    });
            }
            toggleModal()
        }
    }

    //close open modal
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    //read DB to get current Ph value
    const readRDB = () => {
        database()
            .ref('/test/stream/data/json')
            .once('value')
            .then(snapshot => {
                const { ph, temp, turbidity } = snapshot.val();



                setCurrentPhValue(parseFloat(ph).toFixed(2));

            })
            .catch(err => {
                setMsg(err.message);
                onToggleSnackBar();
                console.log(
                    'error while reading data from the IOT device : ',
                    err.message,
                );
            });
    };



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
            }}>Chemical Prediction</Text>
            <View style={{ padding: 20, gap: 10 }}>
                <View style={{ gap: 10, width: '100%' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.inputLabel}>
                            Current Ph Value:
                        </Text>
                        <Text style={styles.phLabel}>
                            {currentPhValue}
                        </Text>

                    </View>
                    <View style={{ gap: 5, width: '100%', marginTop: 20 }}>
                        <Text style={styles.inputLabel}>
                            Select a future date:
                        </Text>
                        <DatePickerInput
                            locale="en"
                            label="Date"
                            value={inputDate}
                            onChange={(d) => setInputDate(d)}
                            inputMode="start"
                            style={{ backgroundColor: '#FFF', borderWidth: 1, borderRadius: 10, borderColor: theme.colors.inactive }}
                        />

                    </View>
                    <View style={{ gap: 5, width: '100%', marginTop: 20 }}>
                        <Text style={styles.inputLabel}>
                            Select a future Time:
                        </Text>
                        <TextInput
                            label="Time"
                            returnKeyType="next"
                            value={time.value}
                            onChangeText={text => setTime({ value: text, error: '' })}
                            error={!!time.error}
                            errorText={time.error}
                            autoCapitalize="none"
                            keyboardType="numeric"
                            onPressIn={() => setVisibleTime(true)}
                        />
                        <TimePickerModal
                            visible={visibleTime}
                            onDismiss={onDismiss}
                            onConfirm={onConfirm}
                            hours={12}
                            minutes={14}
                        />
                    </View>
                    <Button mode="contained" style={{ marginTop: 40 }} onPress={() => startPrediction()}>
                        <Text style={{ ...styles.textBtn, color: '#FFF' }}>Start Prediction</Text>
                    </Button>

                    <View style={{ marginTop: 30 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} onPress={() => navigation.navigate('chemicalDetails', { screen: 'LocationScreen' })}>
                            <FAIcon name={'history'} color={'#696969'} size={18} />
                            &nbsp; Show History
                        </Text>
                    </View>


                </View>

            </View>
            <Modal isVisible={isModalVisible}
                backdropColor="#B4B3DB"
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}

            >

                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: theme.colors.primary }}>
                    <View style={styles.imageChem}>
                        <Image source={{ uri: chemicalImage ? chemicalImage : 'https://i.ibb.co/mCCzsVf/clipart624281-2.png' }} width={100} height={100} style={styles.image} />
                    </View>

                    <View style={{ gap: 20, width: '100%', flexDirection: 'column', textAlign: 'center', marginTop: 40 }}>
                        <Text style={styles.predictionLabel}>
                            Predicted Ph Value : {predictedPh?.toFixed(2)}
                        </Text>
                        <Text style={styles.predictionLabel}>
                            {predictedChemical === 'Good' ? 'Water Quality is Good' : 'We suggest'}
                        </Text>
                        <Text style={styles.predictionChemicalLabel}>
                            {predictedChemical === 'Good' ? 'No need to add chemicals' : predictedChemical}
                        </Text>

                    </View>

                    <Button mode="contained" style={{ marginTop: 40 }} onPress={toggleModal} >
                        <Text style={{ ...styles.textBtn, color: '#FFF' }}>Close</Text>
                    </Button>
                </View>
            </Modal>


            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                action={{
                    label: 'Dismiss',
                    onPress: () => {
                        onDismissSnackBar();
                    },
                }}>
                {msg}
            </Snackbar>

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
    predictionChemicalLabel: {
        fontSize: 25,
        fontWeight: '900',
        color: theme.colors.error,
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
    imageChem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30


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