import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {dialogsApi, DialogsType, MessagesType, MessageType} from "../../../api/social-network-api";


type InitialStateType = {
    dialogs: DialogsType[],
    messages: MessagesType,
    error: string,
    loading: boolean
}

const initialState: InitialStateType = {
    dialogs: [],
    messages: {
        error: null,
        items: [],
        totalCount: 0
    },
    error: '',
    loading: false
}


export const deleteMessage = createAsyncThunk('dialogs/deleteMessage',
    async (messageId: string, {rejectWithValue})=> {
            try {
        const response = await dialogsApi.deleteMessage(messageId)
            } catch (e: any) {
                return rejectWithValue(e.message)
            }
})


export const sendMessage = createAsyncThunk('dialogs/sendMessage',
    async ({userId, body}: {userId: number, body: string}, {rejectWithValue})=> {
    try {
        const response = await dialogsApi.sendMessage(userId, body)
        return {message: response.data.data.message}
    } catch (e: any) {
        return rejectWithValue(e.message)
    }
})


export const getStartChatting = createAsyncThunk('dialogs/startChatting',
    async (userId: number, {rejectWithValue}) => {
            try {
                const response = await dialogsApi.getStartChatting(userId)
            } catch (e: any) {
                return rejectWithValue(e.message)
            }
    })


export const getUserMessages = createAsyncThunk('dialogs/getUserMessages',
    async (userId: number, {rejectWithValue}) => {
        try {
            const response = await dialogsApi.getUserMessages(userId)
            return {messages: response.data}
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })


export const getDialogs = createAsyncThunk('dialogs/getDialogs',
    async (_, {rejectWithValue}) => {
        try {
            const response = await dialogsApi.getDialogs()
            return {dialogs: response.data}
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })


const slice = createSlice(({
    name: 'dialogs',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDialogs.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getDialogs.fulfilled, (state, action: PayloadAction<{ dialogs: DialogsType[] }>) => {
            state.dialogs = action.payload.dialogs
            state.loading = false
        })
        builder.addCase(getDialogs.rejected, (state, action) => {
            state.error = action.error.message ?? ''
            state.loading = false
        })
        builder.addCase(getUserMessages.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getUserMessages.fulfilled, (state, action: PayloadAction<{ messages: MessagesType }>) => {
            state.messages.items = action.payload.messages.items
            state.loading = false
        })
        builder.addCase(getUserMessages.rejected, (state, action) => {
            state.error = action.error.message ?? ''
            state.loading = false
        })
        builder.addCase(getStartChatting.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getStartChatting.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(getStartChatting.rejected, (state, action) => {
            state.error = action.error.message ?? ''
            state.loading = false
        })
        builder.addCase(sendMessage.pending, (state) => {
            state.loading = true
        })
        builder.addCase(sendMessage.fulfilled, (state,action:PayloadAction<{message: MessageType}>) => {
            state.messages.items.push(action.payload.message)
            state.loading = false
        })
        builder.addCase(sendMessage.rejected, (state, action) => {
            state.error = action.error.message ?? ''
            state.loading = false
        })
        builder.addCase(deleteMessage.pending, (state) => {
            state.loading = true
        })
        builder.addCase(deleteMessage.fulfilled, (state) => {
            state.loading = false
        })
        builder.addCase(deleteMessage.rejected, (state, action) => {
            state.error = action.error.message ?? ''
            state.loading = false
        })
    }
}))

export const {} = slice.actions

export const dialogsReducer = slice.reducer