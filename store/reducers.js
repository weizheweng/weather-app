// store/reducers.js
import { createSlice } from "@reduxjs/toolkit";

const menuKeySlice = createSlice({
    name: "menuKey",
    initialState: { menuKey: "/weather" },
    reducers: {
        setMenuKey: (state, action) => {
            state.menuKey = action.payload;
        },
    },
});

const weatherDataSlice = createSlice({
    name: "weatherData",
    initialState: { weatherData: {} },
    reducers: {
        setWeatherData: (state, action) => {
            state.weatherData = action.payload;
        },
    },
});

export const { setMenuKey } = menuKeySlice.actions;
export const { setWeatherData } = weatherDataSlice.actions;

const rootReducer = {
    menuKey: menuKeySlice.reducer,
    weatherData: weatherDataSlice.reducer,
};

export default rootReducer;
