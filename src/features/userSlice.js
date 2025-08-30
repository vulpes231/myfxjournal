import axios from "axios";
import { devServer, getAccessToken } from "../constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const initialState = {
	user: null,
	getUserLoading: false,
	getUserError: null,
	logoutLoading: false,
	logoutError: null,
	loggedOut: false,
};

export const getUserInfo = createAsyncThunk(
	"user/getUserInfo",
	async (_, { rejectWithValue }) => {
		try {
			const url = `${devServer}/user`;
			const token = getAccessToken();
			const response = await axios.get(url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			// console.log(response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || {
					message: error.message,
					statusCode: error.statusCode,
				}
			);
		}
	}
);

export const logoutUser = createAsyncThunk(
	"user/logoutUser",
	async (_, { rejectWithValue }) => {
		try {
			const url = `${devServer}/user/logout`;
			const token = getAccessToken();
			const response = await axios.post(
				url,
				{},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response.data);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || {
					message: error.message,
					statusCode: error.statusCode,
				}
			);
		}
	}
);

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetLogout(state) {
			state.loggedOut = false;
			state.logoutError = null;
			state.logoutLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserInfo.pending, (state) => {
				state.getUserLoading = true;
			})
			.addCase(getUserInfo.fulfilled, (state, action) => {
				state.getUserLoading = false;
				state.getUserError = null;
				state.user = action.payload.data;
				localStorage.setItem("user", JSON.stringify(action.payload.data));
			})
			.addCase(getUserInfo.rejected, (state, action) => {
				state.getUserLoading = false;
				state.getUserError = action.error.message;
				state.user = null;
				localStorage.removeItem("user");
			});
		builder
			.addCase(logoutUser.pending, (state) => {
				state.logoutLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.logoutLoading = false;
				state.logoutError = null;
				state.loggedOut = true;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.logoutLoading = false;
				state.logoutError = action.error.message;
				state.loggedOut = false;
			});
	},
});

export const selectUserSlice = (state) => state.user; // full slice
export const selectCurrentUser = (state) => state.user.user;
export const selectUserLoading = (state) => state.user.getUserLoading;
export const selectUserError = (state) => state.user.getUserError;
export const selectIsLoggedIn = (state) => Boolean(state.user.user);

// Derived selectors
export const selectUsername = (state) => state.user.user?.username ?? "Guest";
export const selectUserEmail = (state) => state.user.user?.email ?? null;

export const { resetLogout } = userSlice.actions;
export default userSlice.reducer;
