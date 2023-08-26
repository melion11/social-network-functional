import React from 'react';
import styled from 'styled-components';
import {Post} from './Post/Post';
import {useAppDispatch, useAppSelector} from '../../../common/hooks';
import {AddForm} from '../../../common/components';
import {profileActions} from '../profileSlice';
import {selectPosts} from '../profilePage.selectors';


export const MyPosts = () => {

    const dispatch = useAppDispatch()
    const posts = useAppSelector(selectPosts)

    const postsElements = posts.map((post, index) => (
        <Post key={index} title={post.title}/>
    ))

    const addPostHandler = (text: string) => {
        dispatch(profileActions.addPost(text))
    }

    return (
        <PostsContainer>
            <PostsTitle>Posts</PostsTitle>
            <AddForm title={'Add post'} onChange={addPostHandler}/>
            <PostListWrapper>
                {postsElements}
            </PostListWrapper>
        </PostsContainer>
    );
};


const PostListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const PostsContainer = styled.div`
  background-color: #343434;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const PostsTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
