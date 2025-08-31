import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptors";

const initialState = {
	registerUserLoading: false,
	registerUserError: null,
	userRegistered: false,
};

export const signupUser = createAsyncThunk(
	"register/signupUser",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.post("/signup", formData);
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

const registerSlice = createSlice({
	name: "register",
	initialState,
	reducers: {
		resetRegisterUser(state) {
			state.registerUserError = null;
			state.registerUserLoading = false;
			state.userRegistered = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signupUser.pending, (state) => {
				state.registerUserLoading = true;
			})
			.addCase(signupUser.fulfilled, (state) => {
				state.registerUserLoading = false;
				state.registerUserError = null;
				state.userRegistered = true;
			})
			.addCase(signupUser.rejected, (state, action) => {
				state.registerUserLoading = false;
				state.registerUserError = action.error.message;
				state.userRegistered = false;
			});
	},
});

export const { resetRegisterUser } = registerSlice.actions;
export default registerSlice.reducer;
