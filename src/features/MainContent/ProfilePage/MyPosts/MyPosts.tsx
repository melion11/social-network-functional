import React from 'react';
import styled from 'styled-components';
import {useAppSelector} from '../../../../app/hooks/hooks';
import {Post} from './Post/Post';






export const MyPosts = () => {

    const posts = useAppSelector(state => state.profilePage.posts)

    const postsElements = posts.map((post, index) => (
        <Post key={index} title={post.title}/>
    ))

    return (
        <>
            <AddPostButtonWrapper>
                <PostInput value={'newPost'} onChange={() => {
                }} placeholder="Write a post..."/>
                <AddButton onClick={() => {
                }}>Add Post</AddButton>
            </AddPostButtonWrapper>
            <PostListWrapper>
                {postsElements}
            </PostListWrapper>
        </>
    );
};

const AddPostButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;
`;

const PostInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  outline: none;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #4c75a3;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const PostListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

