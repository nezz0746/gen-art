import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { SnackProps } from '../components/Snackbar';

interface AppState {
  count: number;
  snack: SnackProps;
}

const initialState: AppState = {
  count: 0,
  snack: {
    open: false,
    message: 'SNACK !',
    severity: 'success',
  },
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    handleSnackbar: (state, action: PayloadAction<SnackProps>) => {
      state.snack = action.payload;
    },
  },
  extraReducers: () => {},
});

export const { handleSnackbar } = appSlice.actions;

export default appSlice.reducer;
