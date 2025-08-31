import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { devServer, getAccessToken } from "../constants";
import axios from "axios";

const initialState = {
	createTradeLoading: false,
	createTradeError: null,
	tradeCreated: false,
	getTradesLoading: false,
	getTradesError: null,
	userTrades: [],
	tradesPagination: null,
};

export const createTrade = createAsyncThunk(
	"trade/createTrade",
	async (formData, { rejectWithValue }) => {
		try {
			const token = getAccessToken();
			const url = `${devServer}/trade`;
			const response = await axios.post(url, formData, {
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

export const getUserTrades = createAsyncThunk(
	"trade/getUserTrades",
	async (_, { rejectWithValue }) => {
		try {
			const token = getAccessToken();
			const url = `${devServer}/trade`;
			const response = await axios.get(url, {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			});
			// console.log(url, response.data);
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
		builder
			.addCase(getUserTrades.pending, (state) => {
				state.getTradesLoading = true;
			})
			.addCase(getUserTrades.fulfilled, (state, action) => {
				state.getTradesLoading = false;
				state.getTradesError = false;
				state.userTrades = action.payload.data;
				state.tradesPagination = action.payload.pagination;
			})
			.addCase(getUserTrades.rejected, (state, action) => {
				state.getTradesLoading = false;
				state.getTradesError = action.error.message;
				state.userTrades = [];
				state.tradesPagination = null;
			});
	},
});

export const selectTradeSlice = (state) => state.trade;
export const selectUserTrades = (state) => state.trade.userTrades;

export const { resetCreateTrade } = tradeSlice.actions;
export default tradeSlice.reducer;
