// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async action for admin login
// export const adminLogin = createAsyncThunk('admin/login', async (loginData, { rejectWithValue }) => {
//   try {
//     const response = await axios.post('/api/admin/login', loginData); // Adjust the API endpoint as necessary
//     return response.data; // Return data, such as token or admin details
//   } catch (error) {
//     return rejectWithValue(error.response.data);
//   }
// });

// const adminSlice = createSlice({
//   name: 'admin',
//   initialState: {
//     adminInfo: null,
//     token: null,
//     loading: false,
//     error: null,
// //   }
//   reducers: {
//     logout: (state) => {
//       state.adminInfo = null;
//       state.token = null;
//       localStorage.removeItem('token'); // Remove token from localStorage
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(adminLogin.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(adminLogin.fulfilled, (state, action) => {
//         state.loading = false;
//         state.adminInfo = action.payload.admin; // Assuming `admin` is returned
//         state.token = action.payload.token;
//         localStorage.setItem('token', action.payload.token); // Store token in localStorage
//       })
//       .addCase(adminLogin.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || 'Something went wrong';
//       });
//   },
// });

// export const { logout } = adminSlice.actions;

// export default adminSlice.reducer;
