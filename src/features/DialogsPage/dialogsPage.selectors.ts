import {RootState} from '../../app/store/store';


export const selectLoading = (state: RootState) => state.dialogsPage.loading
export const selectMessages = (state: RootState) => state.dialogsPage.messages.items
export const selectDialogs = (state: RootState) => state.dialogsPage.dialogs
