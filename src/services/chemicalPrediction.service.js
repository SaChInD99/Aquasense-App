import axios from 'axios';

const HOST = 'http://10.0.2.2:5000';

//api call to predict Ph value
export const predictForecastedPhValue = async payload => {
    try {
        const response = await axios.post(`${HOST}/predict/pH`, payload);
        return {
            ok: true,
            data: response?.data?.predicted_pH,
        };
    } catch (error) {
        throw new Error(error.message);

    }
};

//api call to predict chemical
export const predictChemical = async (payload) => {

    try {

        const response = await axios.post(`${HOST}/predict/chemical`, payload);
        return {
            ok: true,
            data: response?.data?.chemical_prediction,
        };

    } catch (error) {
        throw new Error(error.message);

    }
}