import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {dialogsApi, DialogsType, MessagesType, MessageType} from './dialogsPage.api';
import {createAppAsyncThunk} from '../../common/utils';


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

const deleteMessage = createAppAsyncThunk('dialogs/deleteMessage',
    async (messageId: string, {rejectWithValue})=> {
            try {
        const response = await dialogsApi.deleteMessage(messageId)
            } catch (e: any) {
                return rejectWithValue(e.message)
            }
})

const sendMessage = createAppAsyncThunk('dialogs/sendMessage',
    async ({userId, body}: {userId: number, body: string}, {rejectWithValue})=> {
    try {
        const response = await dialogsApi.sendMessage(userId, body)
        return {message: response.data.data.message}
    } catch (e: any) {
        return rejectWithValue(e.message)
    }
})

const getStartChatting = createAppAsyncThunk('dialogs/startChatting',
    async (userId: number, {rejectWithValue}) => {
            try {
                const response = await dialogsApi.getStartChatting(userId)
            } catch (e: any) {
                return rejectWithValue(e.message)
            }
    })

const getUserMessages = createAppAsyncThunk('dialogs/getUserMessages',
    async (userId: number, {rejectWithValue}) => {
        try {
            const response = await dialogsApi.getUserMessages(userId)
            return {messages: response.data}
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    })


const getDialogs = createAppAsyncThunk('dialogs/getDialogs',
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

export const dialogsActions = slice.actions
export const dialogsThunks = {deleteMessage, sendMessage, getStartChatting, getUserMessages, getDialogs};
export const dialogsReducer = slice.reducer

//types
type InitialStateType = {
    dialogs: DialogsType[],
    messages: MessagesType,
    error: string,
    loading: boolean
}