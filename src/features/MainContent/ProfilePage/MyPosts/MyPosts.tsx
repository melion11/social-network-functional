import React from 'react';
import styled from 'styled-components';
import {useAppSelector} from '../../../../app/hooks/hooks';
import {Post} from './Post/Post';
import TextField from "@mui/material/TextField";






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

const PostInput = styled(TextField)`
  flex-grow: 1;
  padding: 20px;
  border-radius: 8px;
  outline: none;
  color: #858585;

  //.MuiOutlinedInput-root {
  //  &:hover fieldset {
  //    border-color: #3a3a3a; /* Цвет границы при наведении */
  //  }
  .MuiOutlinedInput-root {
    &.Mui-focused fieldset {
      border-color: #bd5629; /* Цвет границы при фокусе */
    }
  }

  .MuiFormLabel-root {
    &.Mui-focused {
      color: #bd5629; /* Цвет лейбла при фокусе */
    }
  }


`;

const AddButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #f38550;
  color: #fff;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #b45328;
  }

`;

const PostListWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
`;

