import React, { useRef } from "react";
import { useCommentData } from "../../hooks/commenthooks";
import { Icomment } from "../../interfaces/IDetail";
import { FillButton, Input } from "../CommonTag";
import { useParams } from "react-router-dom";
import styled from "styled-components";

type Props = {
  parentCommentOrderId: number | null;
  childCommentCount: number;
  commentOrder: number;
};

const CommentInput = ({
  parentCommentOrderId,
  childCommentCount,
  commentOrder,
}: Props) => {
  const params = useParams();
  const projectId = params.id;

  const inputRef = useRef<HTMLInputElement>(null);

  const { createCommentMutate } = useCommentData(projectId);

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      currentTarget: { content },
    } = event;

    // console.log(!parentCommentOrderId && commentOrder && childCommentCount);
    // console.log(!parentCommentOrderId, commentOrder, childCommentCount);
    // console.log("댓글 생성 parentCommentOrderId", parentCommentOrderId);
    // memo:지혜 최상단 컴포넌트
    if (parentCommentOrderId === null) {
      const data: Icomment = {
        context: content.value,
        projectId: Number(projectId),
        parentCommentOrderId,
        commentOrder,
        childCommentCount,
        isDeleted: false,
      };
      // console.log("postform comment", data);
      createCommentMutate(data);
    }

    //memo 지혜: 대댓글 (reply)
    else {
      const data: Icomment = {
        context: content.value,
        projectId: Number(projectId),
        parentCommentOrderId,
        commentOrder: childCommentCount, // index!
        childCommentCount: 0,
        isDeleted: false,
      };

      console.log("postform reply", data);
      createCommentMutate(data);
    }
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <Form onSubmit={handleCommentSubmit}>
      <input type="hidden" name="commentId" />
      <CInput
        type="text"
        name="content"
        placeholder="댓글을 입력하세요"
        ref={inputRef}
      />
      <CommentSubmitBtn type="submit" value="댓글" />
    </Form>
  );
};

export default CommentInput;

const Form = styled.form`
  display: flex;
`;
const CommentSubmitBtn = styled(FillButton)`
  margin-left: 0.7rem;
`;
const CInput = styled(Input)`
  padding-right: 1rem;
  background-color: white;
`;
