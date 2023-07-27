import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        isLoading: null
    },
    reducers: {
        setCurrentUser: (state, action) => { state.currentUser = action.payload },
        setLoading: (state, action) => { state.isLoading = action.payload },
    }
})

export const { setCurrentUser, setLoading } = authSlice.actions
export default authSlice.reducer