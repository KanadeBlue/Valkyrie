import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import guildsService from './guildsService';

export const getAllGuilds = createAsyncThunk('guilds/getAllGuilds', async (_, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await guildsService.getAllGuilds(token) }
    catch (Error) { console.log(Error) };
});

export const createGuild = createAsyncThunk('guilds/createGuild', async (guildData, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try { return await guildsService.createGuild(token, guildData) }
    catch (Error) { console.log(Error) };
});

const guildsSlice = createSlice({
    name: 'guilds',
    initialState: {
        guilds: [],
        isLoading: false,
    },
    reducers: {
        reset: (state) => {
            state.guilds = [];
            state.isLoading = false;
        }
    },
    extraReducers: builder => {
        builder
            // Fetch guilds
            .addCase(getAllGuilds.pending, (state) => { state.isLoading = true })
            .addCase(getAllGuilds.fulfilled, (state, action) => { state.guilds = action.payload; state.isLoading = false })
            .addCase(getAllGuilds.rejected, (state) => { state.isLoading = false })

            // Create guild
            .addCase(createGuild.pending, (state) => { state.isLoading = true })
            .addCase(createGuild.fulfilled, (state, action) => { state.guilds = [...state.guilds, action.payload] })
            .addCase(createGuild.rejected, (state) => { state.isLoading = false })
    }
});

export const { reset } = guildsSlice.actions;
export default guildsSlice.reducer;