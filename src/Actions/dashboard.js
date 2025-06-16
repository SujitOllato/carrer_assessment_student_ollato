
import axios from 'axios'
import constants from '../Shared/Types/constants'
const apiUrl = import.meta.env.VITE_AXIOS_BASE_URL_DEV;
/* Get Dashboard Count */
export const getDashboardCount = (token) => (dispatch) => {
  dispatch({ type: constants.CLEAR_DASHBOARD_COUNT })
  axios.get(`${apiUrl}/api/v1/student/dashboard`, { headers: { Authorization: token } }).then((response) => {
    dispatch({
      type: constants.DASHBOARD_COUNT,
      payload: {
        resStatus: true,
        resMessage: response.data.message,
        dashboardData: response.data.data
      }
    })
  }).catch((error) => {
    dispatch({
      type: constants.DASHBOARD_COUNT,
      payload: {
        resStatus: false,
        resMessage: error?.response?.data?.message
      }
    })
  })
}
