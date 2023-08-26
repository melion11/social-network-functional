import {RootState} from '../../app/store/store';

export const selectLoading = (state: RootState) => state.profilePage.loading


//MyPosts
export const selectPosts = (state: RootState) => state.profilePage.posts

//ProfileEdit
export const selectProfile = (state: RootState) => state.profilePage.profile
export const selectContacts = (state: RootState) => state.profilePage.profile.contacts

//ProfileInfo
export const selectStatus = (state: RootState) => state.profilePage.status
export const selectPhotos = (state: RootState) => state.profilePage.profile.photos