import styled from "styled-components";
import { Label } from "../CommonTag";
import { Section, SectionCol, SectionRow } from "../SectionDirection";
import { useEffect, useRef, useState } from "react";
import InputWithEnter from "./InputWithEnter";
import StyledList from "./StyledList";

interface Prop {
  onChagneTeam: (isTeamProject: boolean, teamProjectMembers: string[]) => void;
}

const TeamInput = ({ onChagneTeam }: Prop) => {
  const memberRef = useRef<HTMLInputElement>(null);
  const [teamProj, setTeamProj] = useState<boolean>(true);
  const [members, setMembers] = useState<string[]>([]);

  function handleSelect(e: React.MouseEvent<HTMLInputElement>) {
    const value = (e.target as HTMLInputElement).value;
    setTeamProj(value === "true");
    value === "true" && setMembers([]);
  }
  const handleAddMember = (value: string) => {
    setMembers([...members, value]);
  };
  function handleRemoveMember(member: string) {
    setMembers(members.filter((c) => c !== member));
  }

  useEffect(() => {
    onChagneTeam(teamProj, members);
  }, [teamProj, members]);

  return (
    <>
      <Section>
        <Label>프로젝트 유형</Label>
        <SectionRow>
          <ButtonGroup>
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
              value="false"
              onClick={handleSelect}
            />
            <label htmlFor="select2">개인</label>
          </ButtonGroup>
          <SectionCol>
            <InputWithEnter
              placeholder="팀원을 추가하고 ENTER을 눌러주세요."
              onEnter={handleAddMember}
              ref={memberRef}
              disabled={!teamProj}
            />
            {members.length === 0 ? (
              <EmptyInfo>입력된 팀원이 없습니다.</EmptyInfo>
            ) : (
              <StyledList lists={members} handleRemove={handleRemoveMember} />
            )}
          </SectionCol>
        </SectionRow>
      </Section>
    </>
  );
};

export default TeamInput;

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
