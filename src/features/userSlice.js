import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./interceptors";

export const initialState = {
	user: null,
	getUserLoading: false,
	getUserError: null,
	logoutLoading: false,
	logoutError: null,
	loggedOut: false,
	modifyUserLoading: false,
	modifyUserError: null,
	userModified: false,
	updatePassLoading: false,
	updatePassError: null,
	passUpdated: false,
};

export const getUserInfo = createAsyncThunk(
	"user/getUserInfo",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get("/user");
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

export const changePassword = createAsyncThunk(
	"user/changePassword",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.post("/user/update-password", formData);
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

export const editUserInfo = createAsyncThunk(
	"user/editUserInfo",
	async (formData, { rejectWithValue }) => {
		try {
			const response = await api.put("/user", formData);
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

export const logoutUser = createAsyncThunk(
	"user/logoutUser",
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.post("/user/logout");
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
	reducers: {
		resetLogout(state) {
			state.loggedOut = false;
			state.logoutError = null;
			state.logoutLoading = false;
		},
		resetUserAction(state) {
			state.userModified = false;
			state.modifyUserError = null;
			state.modifyUserLoading = false;
			state.passUpdated = false;
			state.updatePassError = null;
			state.updatePassLoading = false;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUserInfo.pending, (state) => {
				state.getUserLoading = true;
			})
			.addCase(getUserInfo.fulfilled, (state, action) => {
				state.getUserLoading = false;
				state.getUserError = null;
				state.user = action.payload.data;
				localStorage.setItem("user", JSON.stringify(action.payload.data));
			})
			.addCase(getUserInfo.rejected, (state, action) => {
				state.getUserLoading = false;
				state.getUserError = action.payload?.message || action.error.message;
				state.user = null;
				localStorage.removeItem("user");
			});
		builder
			.addCase(logoutUser.pending, (state) => {
				state.logoutLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.logoutLoading = false;
				state.logoutError = null;
				state.loggedOut = true;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.logoutLoading = false;
				state.logoutError = action.payload?.message || action.error.message;
				state.loggedOut = false;
			});
		builder
			.addCase(editUserInfo.pending, (state) => {
				state.modifyUserLoading = true;
			})
			.addCase(editUserInfo.fulfilled, (state) => {
				state.modifyUserLoading = false;
				state.modifyUserError = null;
				state.userModified = true;
			})
			.addCase(editUserInfo.rejected, (state, action) => {
				state.modifyUserLoading = false;
				state.modifyUserError = action.payload?.message || action.error.message;
				state.userModified = false;
			});
		builder
			.addCase(changePassword.pending, (state) => {
				state.updatePassLoading = true;
			})
			.addCase(changePassword.fulfilled, (state) => {
				state.updatePassLoading = false;
				state.updatePassError = null;
				state.passUpdated = true;
			})
			.addCase(changePassword.rejected, (state, action) => {
				state.updatePassLoading = false;
				state.updatePassError = action.payload?.message || action.error.message;
				state.passUpdated = false;
			});
	},
});

export const selectUserSlice = (state) => state.user; // full slice
export const selectCurrentUser = (state) => state.user.user;
export const selectUserLoading = (state) => state.user.getUserLoading;
export const selectUserError = (state) => state.user.getUserError;
export const selectIsLoggedIn = (state) => Boolean(state.user.user);

// Derived selectors
export const selectUsername = (state) => state.user.user?.username ?? "Guest";
export const selectUserEmail = (state) => state.user.user?.email ?? null;

export const { resetLogout, resetUserAction } = userSlice.actions;
export default userSlice.reducer;
