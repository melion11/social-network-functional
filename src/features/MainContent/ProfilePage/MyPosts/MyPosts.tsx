import React from 'react';
import styled from 'styled-components';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks/hooks';
import {Post} from './Post/Post';
import {AddForm} from '../../../../components/AddForm/AddForm';
import {addPost} from '../profileSlice';


export const MyPosts = () => {

    const dispatch = useAppDispatch()

    const posts = useAppSelector(state => state.profilePage.posts)

    const postsElements = posts.map((post, index) => (
        <Post key={index} title={post.title}/>
    ))

    const addPostHandler = (text: string) => {
        dispatch(addPost(text))
    }

    return (
        <>
            <AddForm title={'Add post'} onChange={addPostHandler}/>
            <PostListWrapper>
                {postsElements}
            </PostListWrapper>
        </>
    );
};


const PostListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

