import React from 'react';
import styled from 'styled-components';

type ProfileSectionType = {
    title: string
    section: string
}

export const ProfileSection = ({title,section}: ProfileSectionType) => {

    return (
        <Section>
            <SectionTitle>{title}</SectionTitle>
            <SectionContent>
                <p>
                    {section}
                </p>
            </SectionContent>
        </Section>
    );
};

const Section = styled.div`
  background-color: #343434;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SectionContent = styled.div`
  p {
    margin-bottom: 0.5rem;
    color: #858585;
  }
`;
