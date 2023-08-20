import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {getFriends} from "./friendsSlice";
import {User} from "../UsersPage/User/User";
import {LinearIndeterminate} from "../../../components/Preloader/Preloader";
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";
import {Search} from "../../../components/Search/Search";




export const FriendsPage = () => {

    const friendsData = useAppSelector(state => state.friendsPage.friends)
    const loading = useAppSelector(state => state.friendsPage.loading)

    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(getFriends())
    },[])

    const [filter, setFilter] = useState<RegExp>(new RegExp('', 'gi'));

    const changeFilter = (value: string): void => {
        const regExp = new RegExp(`${value}`, 'gi');
        setFilter(regExp);
    };

    const filteredFriends = friendsData.filter((friend) => filter.test(friend.name));


    const friendsElements = filteredFriends.map(friend => (
            <User id={friend.id} photos={friend.photos} name={friend.name} status={friend.status} followed={friend.followed}/>
        ))

    return (
        <>
            {loading && <LinearIndeterminate/>}

            <FriendsPageContainer>
                <SearchContainer>
                    <Search onChange={changeFilter} placeholder={"Search your friends"}/>
                </SearchContainer>
                <FriendsListContainer>
                    {friendsElements}
                </FriendsListContainer>
            </FriendsPageContainer>

        </>

    );
};

const FriendsPageContainer = styled.div`
  padding: 15px;
`

// Компонент поиска друзей
const SearchContainer = styled.div`
  display: flex;
  padding: 15px;
`

// Контейнер списка друзей
const FriendsListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;



