import styled from "styled-components";
import { Icategory, Imember } from "../../interfaces/IPost";
import { Item, List } from "../CommonTag";

// memo지혜: 선택된 카테고리와 맴버를 나열하는데 공통을 사용되는 컴포넌트

type ListItem = Icategory | Imember;

interface ListProps<T extends ListItem> {
  lists: T[];
  handleRemove: (list: T["id"]) => void;
}

const StyledList = ({ lists, handleRemove }: ListProps<ListItem>) => {
  return (
    <List>
      {lists.length > 0 && (
        <>
          {lists.map((list) => (
            <Item key={list.id}>
              <span>{"name" in list ? list.name : list.nickname}</span>
              <DeleteButton onClick={() => handleRemove(list.id)}>
                x
              </DeleteButton>
            </Item>
          ))}
        </>
      )}
    </List>
  );
};

export default StyledList;

const DeleteButton = styled.span`
  padding-left: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.2rem;
`;
