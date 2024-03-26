import { useRef, useState } from "react";
import { Section, SectionCol } from "../SectionDirection";
import InputWithEnter from "./InputWithEnter";
import { Label } from "../CommonTag";
import StyledList from "./StyledList";
import styled from "styled-components";

const CategoryInput = () => {
  const categoryRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState<string[]>([]);

  const handleAddCategory = (newcategory: string) => {
    setCategories([...categories, newcategory]);
  };

  function handleRemoveCategory(category: string) {
    setCategories(categories.filter((c) => c !== category));
  }

  return (
    <Section>
      <Label>카테고리</Label>
      <SectionCol>
        <InputWithEnter
          placeholder="카테고리를 입력하고 ENTER을 눌러주세요."
          onEnter={handleAddCategory}
          ref={categoryRef}
        />
        {categories.length === 0 ? (
          <EmptyInfo>입력된 카테고리가 없습니다.</EmptyInfo>
        ) : (
          <StyledList lists={categories} handleRemove={handleRemoveCategory} />
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
