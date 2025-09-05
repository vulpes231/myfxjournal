import api from "./interceptors";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	getAssetsLoading: false,
	getAssetsError: null,
	assets: null,
};

export const fetchAssets = createAsyncThunk(
	"assets/fetchAssets",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/asset");
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

const assetSlice = createSlice({
	name: "assets",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAssets.pending, (state) => {
				state.getAssetsLoading = true;
			})
			.addCase(fetchAssets.fulfilled, (state, action) => {
				state.getAssetsLoading = false;
				state.getAssetsError = null;
				state.assets = action.payload.data;
			})
			.addCase(fetchAssets.rejected, (state, action) => {
				state.getAssetsLoading = false;
				state.getAssetsError = action.payload.message || action.error.message;
				state.assets = null;
			});
	},
});

export const selectAssetsSlice = (state) => state.assets;

export default assetSlice.reducer;
