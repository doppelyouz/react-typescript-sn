import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../../shared/types';

interface State {
  currentUser: User | null
}

const initialState: State = {
  currentUser: JSON.parse(localStorage.getItem('user') || "null")  
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User | null>) => {
        state.currentUser = action.payload
        localStorage.setItem('user', JSON.stringify(state.currentUser));
      },
    logout: (state) => {
        state.currentUser = null;
        localStorage.removeItem('user');
    },
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;