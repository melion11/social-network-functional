import {RootState} from '../../app/store/store';


export const selectFriendsData = (state: RootState) => state.friendsPage.friends
export const selectLoading = (state: RootState) => state.friendsPage.loading