import React, { useRef, useState } from "react";
import styled from "styled-components";
import { SectionCol, SectionRow } from "../components/SectionDirection";
import { Input } from "../components/CommonTag";
import ImageFiles from "../components/ImageFiles";

const Post = () => {
  const categoryRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [teamProj, setTeamProj] = useState<boolean>(true);

  function onClearInput() {
    if (categoryRef.current) categoryRef.current.value = "";
  }

  function handleSelect(e: React.MouseEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    setTeamProj(Boolean(value));
  }

  function handleOnKeyPress(e: React.KeyboardEvent) {
    if (
      e.key === "Enter" &&
      categoryRef.current &&
      categoryRef.current.value !== ""
    ) {
      e.preventDefault();
      setCategories([...categories, categoryRef.current.value]);
      onClearInput();
    }
  }

  function handleRemoveCategory(category: string) {
    setCategories(categories.filter((c) => c !== category));
  }

  return (
    <PostContainer>
      <PostForm>
        <PostContent>
          <PostTitle placeholder="프로젝트 제목을 입력하세요." />
          <PostDiscription placeholder="프로젝트에 대한 설명을 입력하세요." />
          <div>
            <Section>
              <Label>이미지</Label>
              <ImageFiles></ImageFiles>
            </Section>
            <Section>
              <Label>프로젝트 유형</Label>
              <SectionRow>
                <TeamButton
                  id="select1"
                  name="type"
                  type="radio"
                  value="true"
                  onClick={handleSelect}
                  defaultChecked={teamProj}
                />
                <label htmlFor="select1">팀</label>
                <TeamButton
                  id="select2"
                  name="type"
                  type="radio"
                  onClick={handleSelect}
                  value="false"
                />
                <label htmlFor="select2">개인</label>
                <Input placeholder="팀원을 추가해주세요." type="text" />
              </SectionRow>
            </Section>
            <Section>
              <Label>카테고리</Label>
              <SectionCol>
                <Input
                  type="text"
                  placeholder="카테고리를 입력하고 ENTER을 눌러주세요."
                  onKeyDown={handleOnKeyPress}
                  ref={categoryRef}
                />
                <Categories>
                  {categories.length === 0
                    ? "입력된 카테고리가 없습니다"
                    : categories.map((category) => {
                        return (
                          <Category key={category}>
                            <span>{category}</span>
                            <DeleteCateory
                              onClick={() => handleRemoveCategory(category)}
                            >
                              x
                            </DeleteCateory>
                          </Category>
                        );
                      })}
                </Categories>
              </SectionCol>
            </Section>
            <Section>
              <Label>GITHUB</Label>
              <SectionRow>
                <Input placeholder="https://github.com/..." type="text" />
              </SectionRow>
            </Section>
          </div>
        </PostContent>
        <PostButton>게시하기</PostButton>
      </PostForm>
    </PostContainer>
  );
};

const PostContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const PostForm = styled.form`
  margin: 7.2rem 0;
`;
const PostContent = styled.div`
  width: 119.6rem;
  border: 1px solid ${({ theme }) => theme.darkgray};
  min-height: 91.5rem;
  border-radius: 2.5rem;
  padding: 4.9rem 4.7rem;

  // 스크롤바 숨기기
  -ms-overflow-style: none;
  scrollbar-width: none;
  & {
    ::-webkit-scrollbar {
      display: none; /* 크롬, 사파리, 오페라, 엣지 */
    }
  }
`;

const PostTitle = styled.input`
  width: 100%;
  border: none;
  border-bottom: 0.2rem solid ${({ theme }) => theme.darkgray};
  padding: 1rem;
  font-size: 2.5rem;
  font-weight: 900;
  &:hover,
  &:focus {
    outline: none;
  }

  &:hover,
  &:focus {
    border-color: black;
  }
`;
const PostDiscription = styled.textarea`
  width: 100%;
  height: 57.9rem;
  border: 1px solid ${({ theme }) => theme.darkgray};
  border-radius: 2.5rem;
  margin: 6.42rem 0;
  padding: 3.3rem 2.2rem;
  font-size: 1.8rem;
  resize: none;
  outline: none;
`;

const Section = styled.div`
  display: flex;
  justify-content: space-between;

  &:not(:last-child) {
    margin-bottom: 2.7rem;
  }
`;

const Label = styled.label`
  font-size: 1.8rem;
  font-weight: 900;
  flex-basis: 20rem;
  flex-shrink: 0;
`;

const TeamButton = styled.input`
  display: none;

  & + label {
    font-size: 1.2rem;
    font-weight: 900;
    text-align: center;
    line-height: 4.5rem;
    flex-basis: 10rem;
    margin-right: 1rem;
    border: 1px solid ${({ theme }) => theme.mainGreen};
    border-radius: 1.5rem;
  }
  &[type="radio"]:checked + label {
    background-color: ${({ theme }) => theme.mainGreen};
    color: white;
  }
`;
const Categories = styled.p`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  height: 3rem;
`;
const Category = styled.div`
  display: inline-block;
  height: 2.8rem;
  border-radius: 2rem;
  margin-right: 0.8rem;
  padding: 0.5rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.darkgry};
  line-height: 1.5rem;
`;

const DeleteCateory = styled.span`
  margin-left: 1rem;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.2rem;
`;

const PostButton = styled.button`
  width: 100%;
  border-radius: 2.5rem;
  font-size: 2.5rem;
  font-weight: 900;
  padding: 2rem;
  margin-top: 4.2rem;
  background-color: ${({ theme }) => theme.mainGreen};
  color: white;
`;

export default Post;
