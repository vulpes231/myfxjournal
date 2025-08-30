import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken } from "../constants";
import axios from "axios";

const initialState = {
	createTradeLoading: false,
	createTradeError: null,
	tradeCreated: false,
};

export const createTrade = createAsyncThunk(
	"trade/createtrade",
	async (formData, { rejectWithValue }) => {
		try {
			const token = getAccessToken();
			const url = `${devServer}/trade`;
			const response = axios.post(url, formData, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
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

const tradeSlice = createSlice({
	name: "trade",
	initialState,
	reducers: {
		resetCreateTrade(state) {
			state.createTradeError = null;
			state.createTradeLoading = false;
			state.tradeCreated = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createTrade.pending, (state) => {
				state.createTradeLoading = true;
			})
			.addCase(createTrade.fulfilled, (state) => {
				state.createTradeLoading = false;
				state.createTradeError = false;
				state.tradeCreated = true;
			})
			.addCase(createTrade.rejected, (state, action) => {
				state.createTradeLoading = false;
				state.createTradeError = action.error.message;
				state.tradeCreated = false;
			});
	},
});

export const selectTradeSlice = (state) => state.trade;

export const { resetCreateTrade } = tradeSlice.actions;
export default tradeSlice.reducer;
