import axios from 'axios';

const HOST = 'http://10.0.2.2:5000/predict/future';

export const predictWaterQuality = async payload => {
  try {
    const response = await axios.post(`${HOST}/pH`, payload);
    const response1 = await axios.post(`${HOST}/temperature`, payload);
    const response2 = await axios.post(`${HOST}/turbidity`, payload);

    const pH = parseFloat(response?.data).toFixed(2);
    const temperature = parseFloat(response1?.data).toFixed(2);
    const turbidity = parseFloat(response2?.data).toFixed(2);
    return {
      ok: true,
      data: { pH, temperature, turbidity },
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
