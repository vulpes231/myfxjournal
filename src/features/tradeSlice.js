import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "./interceptors";

const initialState = {
	createTradeLoading: false,
	createTradeError: null,
	tradeCreated: false,
	getTradesLoading: false,
	getTradesError: null,
	userTrades: [],
	tradeInfoLoading: false,
	tradeInfoError: null,
	tradeInfo: [],
	tradesPagination: null,
	updateTradeLoading: false,
	updateTradeError: null,
	tradeUpdated: false,
	closeTradeLoading: false,
	closeTradeError: null,
	tradeClosed: false,
};

export const createTrade = createAsyncThunk(
	"trade/createTrade",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.post("/trade", formData);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data?.message || {
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
			const response = await api.get("/trade");
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

export const updateTrade = createAsyncThunk(
	"trade/updateTrade",
	async (formData, { rejectWithValue }) => {
		try {
			const { tradeId } = formData;
			const response = await api.put(`/trade/${tradeId}`, formData);
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

export const closeTrade = createAsyncThunk(
	"trade/closeTrade",
	async (formData, { rejectWithValue }) => {
		try {
			const { tradeId } = formData;
			const response = await api.post(`/trade/${tradeId}`, formData);
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

export const getTradeInfo = createAsyncThunk(
	"trade/getTradeInfo",
	async (tradeId, { rejectWithValue }) => {
		try {
			const response = await api.get(`/trade/${tradeId}`);
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
		resetUpdateTrade(state) {
			state.updateTradeError = null;
			state.updateTradeLoading = false;
			state.tradeUpdated = false;
		},
		resetCloseTrade(state) {
			state.closeTradeError = null;
			state.closeTradeLoading = false;
			state.tradeClosed = false;
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
				state.getTradesError = action.payload?.message || action.error.message;
				state.userTrades = [];
				state.tradesPagination = null;
			});
		builder
			.addCase(updateTrade.pending, (state) => {
				state.updateTradeLoading = true;
			})
			.addCase(updateTrade.fulfilled, (state) => {
				state.updateTradeLoading = false;
				state.updateTradeError = false;
				state.tradeUpdated = true;
			})
			.addCase(updateTrade.rejected, (state, action) => {
				state.updateTradeLoading = false;
				state.updateTradeError =
					action.payload?.message || action.error.message;
				state.tradeUpdated = false;
			});
		builder
			.addCase(closeTrade.pending, (state) => {
				state.closeTradeLoading = true;
			})
			.addCase(closeTrade.fulfilled, (state) => {
				state.closeTradeLoading = false;
				state.closeTradeError = false;
				state.tradeClosed = true;
			})
			.addCase(closeTrade.rejected, (state, action) => {
				state.closeTradeLoading = false;
				state.closeTradeError = action.payload?.message || action.error.message;
				state.tradeClosed = false;
			});
		builder
			.addCase(getTradeInfo.pending, (state) => {
				state.tradeInfoLoading = true;
			})
			.addCase(getTradeInfo.fulfilled, (state, action) => {
				state.tradeInfoLoading = false;
				state.tradeInfoError = false;
				state.tradeInfo = action.payload.data;
			})
			.addCase(getTradeInfo.rejected, (state, action) => {
				state.tradeInfoLoading = false;
				state.tradeInfoError = action.payload?.message || action.error.message;
				state.tradeInfo = false;
			});
	},
});

export const selectTradeSlice = (state) => state.trade;
export const selectUserTrades = (state) => state.trade.userTrades;

export const { resetCreateTrade, resetUpdateTrade, resetCloseTrade } =
	tradeSlice.actions;
export default tradeSlice.reducer;
