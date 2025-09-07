import api from "./interceptors";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	getAnalyticsLoading: false,
	getAnalyticsError: null,
	tradeAnalytics: null,
};

export const getTradeAnalytics = createAsyncThunk(
	"analytics/getTradeAnalytics",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/analytics");
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

const analyticSlice = createSlice({
	name: "analytics",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getTradeAnalytics.pending, (state) => {
				state.getAnalyticsLoading = true;
			})
			.addCase(getTradeAnalytics.fulfilled, (state, action) => {
				state.getAnalyticsLoading = false;
				state.getAnalyticsError = false;
				state.tradeAnalytics = action.payload.data;
			})
			.addCase(getTradeAnalytics.rejected, (state, action) => {
				state.getAnalyticsLoading = false;
				state.getAnalyticsError =
					action.payload?.message || action.error.message;
				state.tradeAnalytics = null;
			});
	},
});

export const selectAnalyticSlice = (state) => state.analytics;

export default analyticSlice.reducer;
