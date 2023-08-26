import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {User} from "../UsersPage/User/User";
import {selectFriendsData, selectLoading} from './friendsPage.selectors';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {friendsThunks} from './friendsSlice';
import {LinearPreloader, Search} from '../../common/components';


export const FriendsPage = () => {

    const friendsData = useAppSelector(selectFriendsData)
    const loading = useAppSelector(selectLoading)
    const dispatch = useAppDispatch()

    useEffect(()=> {
        dispatch(friendsThunks.getFriends())
    },[])

    const [filter, setFilter] = useState<RegExp>(new RegExp('', 'gi'));

    const changeFilter = (value: string): void => {
        const regExp = new RegExp(`${value}`, 'gi');
        setFilter(regExp);
    };

    const filteredFriends = friendsData.filter((friend) => filter.test(friend.name));

    const friendsElements = filteredFriends.map(friend => (
            <User key={friend.id} id={friend.id} photos={friend.photos} name={friend.name} status={friend.status} followed={friend.followed}/>
        ))

    return (
        <>
            {loading && <LinearPreloader/>}

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



