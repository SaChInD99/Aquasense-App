import axios from 'axios';

const HOST = 'http://10.0.2.2:5000';

export const predictForecastedDisease = async payload => {
  try {
    const response = await axios.post(`${HOST}/predict`, payload);
    return {
      ok: true,
      data: response?.data?.predicted_disease,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

export const predictDisease = async ({ temp, ph, turbidity }) => {
  const date = new Date();
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1; // Months start at 0!
  let dd = date.getDate();
  let mins = date.getMinutes();
  let hours = date.getHours();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const payload = {
    Temperature: parseFloat(temp).toFixed(2),
    pH: parseFloat(ph).toFixed(2),
    'Turbidity (NTU)': parseFloat(turbidity).toFixed(2),
    Hour: hours,
    Minute: mins,
    Day: dd,
    Month: mm,
    Year: yyyy,
  };

  try {
    const response = await axios.post(`${HOST}/predict/disease`, payload);
    return {
      ok: true,
      data: response?.data?.disease,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
