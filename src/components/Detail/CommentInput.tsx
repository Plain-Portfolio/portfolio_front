import React from "react";
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

  const { createCommentMutate } = useCommentData(projectId);

  const handleCommentSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      currentTarget: { content },
    } = event;

    console.log(!parentCommentOrderId && commentOrder && childCommentCount);
    console.log(!parentCommentOrderId, commentOrder, childCommentCount);

    if (parentCommentOrderId === null) {
      const data: Icomment = {
        context: content.value,
        projectId: Number(projectId),
        parentCommentOrderId,
        commentOrder,
        childCommentCount,
        isDeleted: true,
      };
      console.log(data);
      createCommentMutate(data);
    }
  };

  return (
    <Form onSubmit={handleCommentSubmit}>
      <input type="hidden" name="commentId" />
      <Input type="text" name="content" placeholder="댓글을 입력하세요" />
      <CommentSubmitBtn type="submit" value="댓글" />
    </Form>
  );
};

export default CommentInput;

const Form = styled.form`
  display: flex;
`;
const CommentSubmitBtn = styled(FillButton)``;
