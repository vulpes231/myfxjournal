import axios from "axios";
import { devServer, getAccessToken } from "../constants";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
	user: null,
	getUserLoading: false,
	getUserError: null,
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
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserInfo.pending, (state) => {
				state.getUserLoading = true;
			})
			.addCase(getUserInfo.fulfilled, (state, action) => {
				state.getUserLoading = false;
				state.getUserError = null;
				state.user = action.payload;
			})
			.addCase(getUserInfo.rejected, (state, action) => {
				state.getUserLoading = false;
				state.getUserError = action.error.message;
				state.user = null;
			});
	},
});

export default userSlice.reducer;
