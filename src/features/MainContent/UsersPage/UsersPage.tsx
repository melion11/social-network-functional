import React, {useEffect} from 'react';
import {getUsers, setSelectedPage} from "./usersSlice";
import styled from "styled-components";
import {User} from "./User/User";
import {LinearIndeterminate} from "../../../components/Preloader/Preloader";
import {PaginationControlled} from "../../../components/Pagination/PaginationControlled";
import {useAppDispatch, useAppSelector} from "../../../app/hooks/hooks";
import {Search} from "../../../components/Search/Search";
import {useParams} from "react-router-dom";


export const UsersPage = () => {

    const {error, users, loading, totalCount, currentPage, pageSize} = useAppSelector(state => state.usersPage)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(getUsers({page: currentPage, pageSize}))
    }, [])


    const changeSelectedPage = (page: number) => {
        dispatch(setSelectedPage(page))
        dispatch(getUsers({page, pageSize}))
    }


    const getSearchFriend = (userName: string) => {
        dispatch(getUsers({userName}))
    }

    const param = useParams<'id'>()

    console.log(param)

    const usersElements = users.map((user) => (
        <User key={user.id} id={user.id} photos={user.photos} name={user.name} status={user.status}
              followed={user.followed}/>

    ))


    return (
        <>
            {loading && <LinearIndeterminate/>}

            <Container>
                <PaginationControlled onChange={changeSelectedPage}
                                      totalCount={totalCount}
                                      pageSize={pageSize}
                                      page={currentPage}/>
                <SearchContainer>
                    <Search placeholder={'Search new friends'} onChange={getSearchFriend}/>
                </SearchContainer>
                <UsersCardsContainer>
                    {usersElements}
                </UsersCardsContainer>
                <PaginationControlled onChange={changeSelectedPage}
                                      totalCount={totalCount}
                                      pageSize={pageSize}
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