import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the type for the session state
interface SessionState {
  id: string;
  sellerId: string;
  shop: string;
  state: string;
  isOnline: boolean;
  scope?: string;
  expires?: string | null;
  accessToken: string;
}

const initialState: SessionState = {
  id: '',
  sellerId: '',
  shop: '',
  state: '',
  isOnline: false,
  scope: undefined,
  expires: null,
  accessToken: '',
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<SessionState>) {
      // Set the session details
      return { ...state, ...action.payload };
    },
    setSessionOnlineStatus(state, action: PayloadAction<boolean>) {
      // Update the session's online status
      state.isOnline = action.payload;
    },
    setSessionExpiry(state, action: PayloadAction<string | null>) {
      // Update the session's expiry time
      state.expires = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      // Update the session's access token
      state.accessToken = action.payload;
    },
    clearSession(state) {
      // Clear the session data (e.g., on logout)
      return initialState;
    },
  },
});

export const sessionActions = sessionSlice.actions;
export default sessionSlice;
