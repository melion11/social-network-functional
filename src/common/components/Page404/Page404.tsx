import React from 'react'
import error404 from './404.svg'
import styled from 'styled-components';


export const Page404 = () => {
    return (
        <Page404Container id="hw5-page-404">
            <Wrapper>
                <Error404Image src={error404} alt="404" />
            </Wrapper>
        </Page404Container>
    );
};


const Page404Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Error404Image = styled.img`
  width: 451px;
  height: auto;
`;