// import axios from 'axios';

// export const adminLogin = (loginData) => async (dispatch) => {
//   dispatch({ type: 'adminLoginPending' });
//   try {
//     const response = await axios.post('/api/admin/login', loginData);
//     dispatch({
//       type: 'adminLoginSuccess',
//       payload: {
//         adminInfo: response.data.admin, // Adjust according to your response structure
//         token: response.data.token,
//       },
//     });
//     localStorage.setItem('token', response.data.token); // Store token in localStorage
//   } catch (error) {
//     dispatch({
//       type: 'adminLoginFailure',
//       payload: { error: error.response.data.message || 'Login failed' },
//     });
//   }
// };

// export const adminLogout = () => (dispatch) => {
//   localStorage.removeItem('token'); // Remove token from localStorage
//   dispatch({ type: 'adminLogout' });
// };
