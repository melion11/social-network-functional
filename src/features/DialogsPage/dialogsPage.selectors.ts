import {RootState} from '../../app/store/store';


export const selectMessages = (state: RootState) => state.dialogsPage.messages.items
export const selectDialogs = (state: RootState) => state.dialogsPage.dialogs
