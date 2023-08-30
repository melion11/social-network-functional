import React, {useState} from 'react';
import styled from 'styled-components';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ClearIcon from '@mui/icons-material/Clear';
import {useAppDispatch} from '../../../../common/hooks';
import {profileActions} from '../../profileSlice';


type PostType = {
    id: string
    title: string
    like: boolean
}


export const Post = ({ title, like, id }: PostType) => {

    const [currentLike, setCurrentLike] = useState(like);
    const dispatch = useAppDispatch()


    const addLikeHandler = (newLike: boolean) => {
        setCurrentLike(newLike)
        dispatch(profileActions.addLike({id, like: newLike}))
    }

    const deletePostHandler = () => {
        dispatch(profileActions.deletePost(id))
    }

    return (
        <StyledPostItem>
            <PostTitle>{title}</PostTitle>
            <LikesContainer>
                <LikeButton $dislike={currentLike} onClick={() => addLikeHandler(!currentLike)}>
                        <LikeIcon className="like-icon" />
                </LikeButton>
            </LikesContainer>
            <DeleteButton onClick={deletePostHandler}>
                <DeleteIcon  className="delete-icon" />
            </DeleteButton>
        </StyledPostItem>
    );
};

const StyledPostItem = styled.div`
  width: 500px;
  background-color: #3b3b3b;
  color: #858585;
  padding: 30px 20px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const PostTitle = styled.h2`
  font-size: 16px;
  margin-bottom: 10px;
  overflow-wrap: break-word;
  max-width: 100%;
`;

const LikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: auto;
`;

const LikeButton = styled.button<{$dislike: boolean}>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 5px;
  position: absolute;
  bottom: 10px;
  right: 10px;

  .like-icon {
    color: ${props => (props.$dislike ? '#ff8f00' : '#575757')};
    transition: color 0.3s ease-in-out;

    &:hover {
      color: ${props => (props.$dislike ? '#575757' : '#ff8f00')};
    }
  }
`;

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  .delete-icon {
    color: #858585;
    transition: color 0.3s ease-in-out;

    &:hover {
      color: #282828;
    }
  }
`;

const DeleteIcon = styled(ClearIcon)`
  color: #858585;
`;

const LikeIcon = styled(FavoriteIcon)`
  color: #858585;
`;
