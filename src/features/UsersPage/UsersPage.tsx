import React, {useEffect} from 'react';
import styled from 'styled-components';
import {User} from './User/User';
import {usersActions, usersThunks} from './usersSlice';
import {LinearPreloader, PaginationControlled, Search} from '../../common/components';
import {useAppDispatch, useAppSelector} from '../../common/hooks';
import {selectLoading, selectPages, selectUsers} from './usersPage.selectors';


export const UsersPage = () => {

    const loading = useAppSelector(selectLoading)
    const users = useAppSelector(selectUsers)
    const {totalCount, currentPage, pageSize} = useAppSelector(selectPages)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(usersThunks.getUsers({page: currentPage, pageSize}))
    }, [currentPage, pageSize, dispatch])

    const changeSelectedPage = (page: number) => {
        dispatch(usersActions.setSelectedPage(page))
        dispatch(usersThunks.getUsers({page, pageSize}))
    }

    const getSearchFriend = (userName: string) => {
        dispatch(usersThunks.getUsers({userName}))
    }

    const usersElements = users.map((user) => (
        <User key={user.id} id={user.id} photos={user.photos} name={user.name} status={user.status}
              followed={user.followed}/>
    ))

    return (
        <>
            {loading && <LinearPreloader/>}

            <Container>
                <PaginationControlled onChange={changeSelectedPage} totalCount={totalCount} pageSize={pageSize}
                                      page={currentPage}/>
                <SearchContainer>
                    <Search placeholder={'Search new friends'} onChange={getSearchFriend}/>
                </SearchContainer>
                <UsersCardsContainer>
                    {usersElements}
                </UsersCardsContainer>
                <PaginationControlled onChange={changeSelectedPage} totalCount={totalCount} pageSize={pageSize}
                                      page={currentPage}/>
            </Container>
        </>
    );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  padding: 15px;
  min-width: 100%;

`;

const UsersCardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const SearchContainer = styled.div`
  display: flex;
  padding: 15px;
`