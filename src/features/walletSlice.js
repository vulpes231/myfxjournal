import axios from "axios";
import { devServer, getAccessToken } from "../constants";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	userWallets: null,
	getUserWalletLoading: false,
	getUserWalletError: null,
};

export const getUserWallets = createAsyncThunk(
	"wallet/getUserWallets",
	async (_, { rejectWithValue }) => {
		try {
			const url = `${devServer}/wallet`;
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
				state.getUserWalletError = action.error.message;
				state.userWallets = null;
			});
	},
});

export const selectWalletSlice = (state) => state.wallet;
export const selectUserWallets = (state) => state.wallet.userWallets;

export default walletSlice.reducer;
