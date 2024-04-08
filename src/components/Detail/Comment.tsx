import styled from "styled-components";
import { getComment } from "../../interfaces/IDetail";
import { useEffect, useState } from "react";
import CommentInput from "./CommentInput";
import { useCommentData } from "../../hooks/commenthooks";

type Props = { projectId: string | undefined };

interface Tree {
  [commentId: number]: number[] | null;
}

const Comment = ({ projectId }: Props) => {
  // memo지혜 : 전체 댓글 목록
  const [comments, setComments] = useState<getComment[]>([]);
  // memo지혜: 대댓글
  const [replyId, setReplyId] = useState<number | null>(null);

  const handleReply = (id: number) => {
    setReplyId(replyId === id ? null : id);
  };

  const { isLoading, data, isError, error } = useCommentData(projectId);

  useEffect(() => {
    if (data) {
      setComments(data.comments);
    }
  }, [data]);

  function commentTree(comments: getComment[]) {
    const tree: Tree = {};
    const commentMap = new Map(
      comments.map((comment) => [comment.id, comment])
    );

    const [rootComments, nonRootComments] = comments.reduce(
      (acc, comment) => {
        if (!comment.parentCommentOrderId) {
          acc[0].push(comment);
        } else {
          acc[1].push(comment);
        }
        return acc;
      },
      [[], []] as [getComment[], getComment[]]
    );

    if (rootComments.length > 0) {
      for (const comment of rootComments) {
        if (comment.childCommentCount)
          tree[comment.id] = Array(comment.childCommentCount).fill(0);
        else tree[comment.id] = null;
      }
    }

    for (const comment of nonRootComments) {
      if (comment.parentCommentOrderId) {
        const parentComment = commentMap.get(comment.parentCommentOrderId);

        if (comment.childCommentCount === 0) {
          tree[comment.id] = null;
        } else {
          tree[comment.id] = Array(comment.childCommentCount).fill(0);
        }

        if (parentComment && tree && tree[parentComment.id]) {
          console.log(parentComment.id);
          console.log(tree[parentComment.id]);
          // tree[parentComment.id][comment.commentOrder - 1] = comment.id
        }
      }
    }
  }

  return (
    <CommentContainer>
      <H3>댓글창</H3>
      <div>
        {comments.length > 0 &&
          comments.map((comment) => (
            <CommentItem key={comment.id}>
              <div>
                <CommentContext>{comment.context}</CommentContext>
                <Relply onClick={() => handleReply(comment.id)}>
                  댓글쓰기
                </Relply>
              </div>
              {replyId === comment.id && (
                <CommentInput
                  parentCommentOrderId={comment.id}
                  childCommentCount={comment.childCommentCount}
                  commentOrder={comment.commentOrder}
                />
              )}
            </CommentItem>
          ))}
      </div>
      <CommentParent>
        <CommentInput
          parentCommentOrderId={null}
          childCommentCount={0}
          commentOrder={comments.length}
        />
      </CommentParent>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = styled.div`
  flex-grow: 6;
  min-height: 20rem;
  background-color: white;
  flex-shrink: 0;
  padding: 1rem;
`;
const H3 = styled.h3`
  font-size: 1.7rem;
  font-weight: 900;
  padding: 1rem;
`;
const CommentItem = styled.div`
  & > div {
    border: 1px solid ${({ theme }) => theme.color.lightgray};
  }
`;
const CommentContext = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
`;
const Relply = styled.p`
  text-align: right;
  font-size: 1.2rem;
`;

const CommentParent = styled.div`
  margin-top: 5rem;
`;
