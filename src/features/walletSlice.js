import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./interceptors";

const initialState = {
	userWallets: null,
	getUserWalletLoading: false,
	getUserWalletError: null,
	balanceUpdated: false,
	updateBalanceLoading: false,
	updateBalanceError: null,
};

export const getUserWallets = createAsyncThunk(
	"wallet/getUserWallets",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/wallet");
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

export const updateBalance = createAsyncThunk(
	"wallet/updateBalance",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.put("/wallet", formData);
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

const walletSlice = createSlice({
	name: "wallet",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(getUserWallets.pending, (state) => {
				state.getUserWalletLoading = true;
			})
			.addCase(getUserWallets.fulfilled, (state, action) => {
				state.getUserWalletLoading = false;
				state.getUserWalletError = null;
				state.userWallets = action.payload.data;
			})
			.addCase(getUserWallets.rejected, (state, action) => {
				state.getUserWalletLoading = false;
				state.getUserWalletError =
					action.payload?.message || action.error.message;
				state.userWallets = null;
			});
		builder
			.addCase(updateBalance.pending, (state) => {
				state.updateBalanceLoading = true;
			})
			.addCase(updateBalance.fulfilled, (state, action) => {
				state.updateBalanceLoading = false;
				state.updateBalanceError = null;
				state.balanceUpdated = true;
			})
			.addCase(updateBalance.rejected, (state, action) => {
				state.updateBalanceLoading = false;
				state.updateBalanceError =
					action.payload?.message || action.error.message;
				state.balanceUpdated = false;
			});
	},
});

export const selectWalletSlice = (state) => state.wallet;
export const selectUserWallets = (state) => state.wallet.userWallets;

export default walletSlice.reducer;
