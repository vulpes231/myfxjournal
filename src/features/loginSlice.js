import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptors";

const initialState = {
	accessToken: null,
	loginLoading: false,
	loginError: null,
	statusCode: null,
	user: null,
};

export const loginUser = createAsyncThunk(
	"login/loginUser",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.post("/signin", formData);
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

const loginSlice = createSlice({
	name: "login",
	initialState,
	reducers: {
		resetLogin(state) {
			state.accessToken = null;
			state.loginError = null;
			state.loginLoading = false;
			state.user = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loginLoading = true;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loginLoading = false;
				state.loginError = null;
				state.accessToken = action.payload.token;
				state.user = action.payload.data;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loginLoading = false;
				if (action.payload) {
					state.loginError = action.payload.message || "Login failed";
					state.statusCode = action.payload.statusCode || null;
				} else {
					// fallback (e.g. network error)
					state.loginError = action.error.message;
					state.statusCode = null;
				}

				state.accessToken = null;
			});
	},
});

export const { resetLogin } = loginSlice.actions;
export default loginSlice.reducer;
