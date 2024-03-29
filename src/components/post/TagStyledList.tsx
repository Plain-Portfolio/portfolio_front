import { Icategory, Imember } from "../../interfaces/IPostFormData";
import { Item, List } from "../CommonTag";

// memo지혜: 조회해 온 맴버 또는 카테고리를 나열하는 컴포넌트

type Props = {
  list: Icategory[] | Imember[];
  onSelect: (id: number, name: string) => void;
};

const TagStyledList = ({ list, onSelect }: Props) => {
  return (
    <List>
      {list &&
        list.map((item) => (
          <Item
            key={item.id}
            onClick={() =>
              onSelect(
                item.id,
                (item as Icategory).name || (item as Imember).nickname
              )
            }
            color="mainGreen"
          >
            {(item as Icategory).name || (item as Imember).nickname}
          </Item>
        ))}
    </List>
  );
};

export default TagStyledList;
