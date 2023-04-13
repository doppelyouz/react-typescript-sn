import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../shared/types';

interface State {
  currentUser: User | null
}

const initialState: State = {
  currentUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User | null>) => {
        state.currentUser = action.payload
      },
    logout: (state) => {
        state.currentUser = null;
    },
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;