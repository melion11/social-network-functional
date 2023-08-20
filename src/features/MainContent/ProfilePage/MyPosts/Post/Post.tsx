import React from 'react';
import styled from 'styled-components';


type PostType = {
    title: string
}


export const Post = ({title}: PostType) => {
    return (
        <PostItem>
            {title}
        </PostItem>
    );
};

const PostItem = styled.li`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;