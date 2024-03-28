import { Container } from "../components/CommonTag";
import styled from "styled-components";
import { SectionCol, SectionRow } from "../components/SectionDirection";

type Props = {};
const poster = {
  title: "포트폴리오 제목",
};

const Detail = (props: Props) => {
  return (
    <Container>
      <ReadBorder>
        <ReadTitle>{poster.title}</ReadTitle>
        <ButtonGruop>
          <button type="button">수정하기</button>
          <button type="button">삭제하기</button>
        </ButtonGruop>
        <ReadContent>
          <SectionLeft>
            <ImageContainer>image</ImageContainer>
            <LikeInfo>
              <Ul>
                <Li>LIKT</Li>
                <Li>email 작성자</Li>
              </Ul>
            </LikeInfo>
            <Comment>댓글</Comment>
          </SectionLeft>
          <SectionRight>
            <ul>
              <Li>팀/개인 , 맴버</Li>
              <Li>카테고리</Li>
              <Li>깃링크</Li>
              <Li>
                <span>줄글</span>
                <textarea></textarea>
              </Li>
            </ul>
          </SectionRight>
        </ReadContent>
      </ReadBorder>
    </Container>
  );
};

export default Detail;

const ButtonGruop = styled(Container)``;
const ReadBorder = styled.div`
  width: 119.6rem;
  min-height: 91.5rem;
  padding: 4.9rem 4.7rem;
  border: 1px solid ${({ theme }) => theme.darkgray};
  border-radius: 2.5rem;
  background-color: ${({ theme }) => theme.darkgray};
`;

const ReadTitle = styled.h1`
  background-color: white;
  padding: 2rem;
  font-size: 3.2rem;
`;
const ReadContent = styled(SectionRow)`
  height: 90%;
  padding-top: 5rem;
  margin-bottom: 5rem;
  justify-content: space-between;
`;
const SectionLeft = styled(SectionCol)`
  flex-grow: 4;
  margin-right: 2rem;

  & > div:not(:first-child) {
    margin-top: 2rem;
  }
`;
const SectionRight = styled(SectionCol)`
  flex-grow: 6;
  justify-content: flex-start;
  padding: 2rem;
  background-color: white;
`;
const LikeInfo = styled.div`
  flex-grow: 0;
  padding: 1rem 0;
  background-color: white;
`;
const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  background-color: white;
`;
const Li = styled.li`
  font-size: 1.3rem;
  font-weight: 900;
  margin: 1rem 0;
`;
const ImageContainer = styled.div`
  flex-grow: 3;
  background-color: white;
`;
const Comment = styled.div`
  flex-grow: 6;
  background-color: white;
`;
