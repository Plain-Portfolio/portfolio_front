import { useEffect, useState } from "react";
import styled from "styled-components";
import StyledList from "./SelectedStyledList";
import { Section, SectionCol, SectionRow } from "../SectionDirection";
import { Input, Label } from "../CommonTag";
import { Imember } from "../../interfaces/IPost";
import { LoginUser } from "../../interfaces/IUser";
import { getToken } from "../../utils/token";
import axios from "axios";
import TagStyledList from "./TagStyledList";
import { IgetMember } from "../../interfaces/IDetail";

type Props = {
  onChagneTeam: (isTeamProject: boolean, teamProjectMembers: Imember[]) => void;
  defaultIsTeam: boolean | undefined;
  defaultTeamMember: IgetMember[];
};

const TeamInput = ({
  onChagneTeam,
  defaultIsTeam,
  defaultTeamMember,
}: Props) => {
  //memo지혜: 팀프로젝트/ 개인 프로젝트
  const [teamProj, setTeamProj] = useState<boolean>(true);
  //memo지혜: 선택한 맴버배열 상태
  const [selectedMembers, setSelectedMembers] = useState<Imember[]>([]);
  //memo지혜: 모든 유저에 대한 배열 상태 ( 선택할 수 있는 맴버들)
  const [members, setMembers] = useState<LoginUser[]>([]);

  function handleSelect(e: React.MouseEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    const isTeam = value === "true";

    setTeamProj(isTeam);
    !isTeam && setSelectedMembers([]);
  }

  const handleAddMember = (id: number, nickname: string) => {
    // console.log(selectedMembers, id, nickname);
    const alreadySelected = selectedMembers.some((member) => member.id === id);

    //teamProj : true >  팀 > 맴버선택
    //         : false > 개인 > 맴버선택x
    if (teamProj) {
      //memo지혜: 선택된 맴버일 경우 선택하지 못함.
      if (alreadySelected) {
        alert(`이미 선택된 멤버입니다.`);
        return;
      }
      setSelectedMembers([...selectedMembers, { id, nickname }]);
    }
  };

  function handleRemoveMember(memberId: number) {
    setSelectedMembers(selectedMembers.filter((c) => c.id !== memberId));
  }

  // memo지혜: lifting up state
  useEffect(() => {
    onChagneTeam(teamProj, selectedMembers);
  }, [teamProj, selectedMembers]);

  // memo지혜: 전체 사용자 조회(맴버조회)
  useEffect(() => {
    async function featchData() {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/user/list`,
        { headers: { Authorization: `${getToken()}` } }
      );
      const result = res.data;
      const { userList } = result;
      if (userList) {
        const allMembers = userList.map(({ id, nickname }: Imember) => ({
          id,
          nickname,
        }));
        setMembers(allMembers);
      }
    }
    featchData();
  }, []);

  useEffect(() => {
    if (defaultTeamMember.length > 0) {
      const renameTeamMember = defaultTeamMember.map(
        ({ userId, nickname }) => ({
          id: userId,
          nickname,
        })
      );
      setSelectedMembers(renameTeamMember);
    }
  }, [defaultTeamMember, defaultIsTeam]);

  return (
    <>
      <Section>
        <Label>프로젝트 유형</Label>
        <SectionRow>
          <ButtonGroup>
            <>
              <TeamButton
                id="select1"
                name="type"
                type="radio"
                value="true"
                onClick={handleSelect}
                defaultChecked={defaultIsTeam}
              />
              <label htmlFor="select1">팀</label>
            </>
            <>
              <TeamButton
                id="select2"
                name="type"
                type="radio"
                value="false"
                onClick={handleSelect}
                defaultChecked={!defaultIsTeam}
              />
              <label htmlFor="select2">개인</label>
            </>
          </ButtonGroup>
          <TeamMember>
            {members.length > 0 && (
              <TagStyledList list={members} onSelect={handleAddMember} />
            )}
            <Input placeholder="팀원을 추가해 주세요." type="text" readOnly />
            {selectedMembers.length === 0 ? (
              <EmptyInfo>입력된 팀원이 없습니다.</EmptyInfo>
            ) : (
              <StyledList
                lists={selectedMembers}
                handleRemove={handleRemoveMember}
              />
            )}
          </TeamMember>
        </SectionRow>
      </Section>
    </>
  );
};

export default TeamInput;
const TeamMember = styled(SectionCol)`
  flex: 1;
`;
const EmptyInfo = styled.p`
  height: 3rem;
  margin-top: 0.5rem;
`;
const ButtonGroup = styled(SectionRow)`
  align-items: flex-start;
  flex-basis: 15rem;
  flex-grow: 0;
`;
const TeamButton = styled.input`
  display: none;

  & + label {
    font-size: 1.2rem;
    font-weight: 900;
    text-align: center;
    line-height: 4.5rem;
    flex-basis: 6.5rem;
    flex-shrink: 0;
    margin-right: 1rem;
    border: 1px solid ${({ theme }) => theme.color.mainGreen};
    border-radius: 1.5rem;
  }

  &[type="radio"]:checked + label {
    background-color: ${({ theme }) => theme.color.mainGreen};
    color: white;
  }
`;
