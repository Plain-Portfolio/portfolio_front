import { useEffect, useRef, useState } from "react";
import { Section, SectionCol } from "../SectionDirection";
import { Label } from "../CommonTag";
import StyledList from "./SelectedStyledList";
import TagStyledList from "./TagStyledList";
import InputWithEnter from "./InputWithEnter";
import { Icategory } from "../../interfaces/IPost";
import { getToken } from "../../utils/token";
import styled from "styled-components";
import axios from "axios";

type Props = {
  onChangeCategory: (categories: Icategory[]) => void;
  defaultCategories: Icategory[] | undefined;
};

const CategoryInput = ({ onChangeCategory, defaultCategories }: Props) => {
  const categoryRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<Icategory[]>();
  const [selectedCategories, setSelectedCategories] = useState<Icategory[]>([]);

  // memo지혜: 사용자 카테고리 생성
  const handleAddCategory = async (name: string) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/category/create`,
      { name },
      {
        headers: {
          Authorization: `${getToken()}`,
          "Content-Type": "application/json;charset=UTF-8",
        },
      }
    );
    const createdId = res.data.id;
    setSelectedCategories([...selectedCategories, { id: createdId, name }]);
  };
  // memo지혜: 카테고리 선택해제
  function handleRemoveCategory(categoryId: number) {
    setSelectedCategories(
      selectedCategories.filter((c) => c.id !== categoryId)
    );
  }

  //memo지혜: lifting state up
  useEffect(() => {
    onChangeCategory(selectedCategories);
  }, [selectedCategories]);

  // memo지혜: 카테고리 조회
  useEffect(() => {
    async function featchData() {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/category/list`
      );
      const result = res.data.categories;
      if (result.length > 0) {
        setCategories(result);
      }
    }
    featchData();
  }, []);

  // memo지혜: 카테고리 선택
  function selectCategory(categoryId: number, categoryName: string) {
    setSelectedCategories((prev) => [
      ...prev,
      { id: categoryId, name: categoryName },
    ]);
  }

  //memo지혜: lifting state up
  useEffect(() => {
    onChangeCategory(selectedCategories);
  }, [selectedCategories]);

  // memo지혜: 카테고리 조회
  useEffect(() => {
    if (defaultCategories) {
      setSelectedCategories(defaultCategories);
    }
  }, [defaultCategories]);

  return (
    <Section>
      <Label>카테고리</Label>
      <SectionCol>
        {categories && (
          <TagStyledList list={categories} onSelect={selectCategory} />
        )}
        <InputWithEnter
          placeholder="카테고리를 입력하고 ENTER을 눌러주세요."
          onEnter={handleAddCategory}
          ref={categoryRef}
        />
        {selectedCategories.length === 0 ? (
          <EmptyInfo>입력된 카테고리가 없습니다.</EmptyInfo>
        ) : (
          <StyledList
            lists={selectedCategories}
            handleRemove={handleRemoveCategory}
          />
        )}
      </SectionCol>
    </Section>
  );
};

export default CategoryInput;

const EmptyInfo = styled.p`
  height: 3rem;
  margin-top: 0.5rem;
`;
