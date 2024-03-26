import styled from "styled-components";

interface ListProps {
  lists: string[];
  handleRemove: (list: string) => void;
}
const StyledList = ({ lists, handleRemove }: ListProps) => {
  return (
    <List>
      {lists.length > 0 && (
        <>
          {lists.map((list) => (
            <Item key={list}>
              <span>{list}</span>
              <DeleteButton onClick={() => handleRemove(list)}>x</DeleteButton>
            </Item>
          ))}
        </>
      )}
    </List>
  );
};

export default StyledList;

const List = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  height: 3rem;
`;
const Item = styled.div`
  display: inline-block;
  height: 2.8rem;
  border-radius: 2rem;
  margin-right: 0.8rem;
  padding: 0.5rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.darkgry};
  line-height: 1.5rem;
`;
const DeleteButton = styled.span`
  margin-left: 1rem;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.2rem;
`;
