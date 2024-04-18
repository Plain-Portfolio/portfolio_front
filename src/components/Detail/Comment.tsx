import styled from "styled-components";
import { getComment } from "../../interfaces/IDetail";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import CommentInput from "./CommentInput";
import { useCommentData } from "../../hooks/commenthooks";
import { Input } from "../CommonTag";
import { AuthContext } from "../Context/AuthContext";

type Props = { projectId: string | undefined };

interface Tree {
  [commentId: number]: number[] | null;
}

const Comment = ({ projectId }: Props) => {
  // memo지혜 : 댓글 트리
  const [tree, setTree] = useState<Tree>();
  // memo지혜 : 댓글 맵 (키 : id, value: comment)

  // memo지혜 : 루트 코멘트 배열
  const [rootComments, setRootComments] = useState<getComment[]>();
  // memo지혜 : 댓글 context 참조
  const contextRef = useRef<null[] | HTMLInputElement[]>([]);
  // memo지혜 : 전체 댓글 목록
  const [comments, setComments] = useState<getComment[]>([]);
  // memo지혜: 대댓글
  const [replyId, setReplyId] = useState<number | null>(null);
  // memo지혜: 수정모드 인풋
  const [edit, setEdit] = useState(Array(comments.length).fill(false));
  // memo지혜: 수정모드 임시 context
  const [tempContext, setTempContext] = useState<string>();
  const { userInfo } = useContext(AuthContext);
  const {
    isLoading,
    data,
    isError,
    error,
    updateCommentMutate,
    delteCommentMutate,
  } = useCommentData(projectId);

  //memo지혜: 댓글의 id를 replyId로 두어 선택된 댓글의 대댓글 input을 여는 기능 수행
  const handleReply = (id: number) => {
    setReplyId(replyId === id ? null : id);
  };

  //memo지혜: 선택된 하나의 input에 한하여(commentId) disabled를 toggle하여 input을 수정/읽기 모드로 변경
  const hanleEditId = (commentId: number) => {
    setEdit((prevEdit) => {
      const newEdit = [...prevEdit];
      newEdit[commentId] = !prevEdit[commentId];
      return newEdit;
    });
  };

  //memo지혜: 수정모드에서 댓글이 입력될때 마다 값을 즉시 반영하여 임시 context에 담아둠
  const commentOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTempContext(value);
  };

  //memo지혜: 댓글 삭제
  const handleRemoveComment = (id: number) => {
    delteCommentMutate(id);
  };

  //memo지혜: 댓글 수정
  const handleUpdateComment = (comment: getComment) => {
    console.log(tempContext);
    const {
      id: commentId,
      parentCommentOrderId,
      commentOrder,
      childCommentCount,
    } = comment;

    const data = {
      commentId,
      context: tempContext as string,
      parentCommentOrderId,
      commentOrder,
      childCommentCount,
    };
    // console.log(data);
    updateCommentMutate(data);
    setTempContext("");
  };

  useEffect(() => {
    if (data) {
      setComments(data.comments);
    }
  }, [data]);

  // memo지혜: id를 key로 comment를 value로 가지는 map. 의존성 comments를 갖는다.
  // id로 코멘트정보를 빠르게 찾을 수 있게 하는 걸 목적으로 함
  const commentMap = useMemo(
    () => new Map(comments.map((comment) => [comment.id, comment])),
    [comments]
  );

  useEffect(() => {
    // memo지혜: 모든 댓글에 대해 수정모드 off로 set ( true: 수정모드 , false: 읽기 모드 )
    setEdit(Array(comments.length).fill(false));
  }, [comments]);

  useEffect(() => {
    // memo지혜 : 댓글 트리.
    // rootComments : 최상단 댓글을 모아둔 배열
    // tree 예시 : { 부모id : [ 자식1 id, 자식2 id], 자식1 id : null, 자식2 id : null}
    const { rootComments, tree } = commentTree(comments);
    setTree(tree);
    setRootComments(rootComments);
  }, [commentMap]);

  //  memo지혜 : 댓글 렌더링
  function renderComments(commentId: number, depth = 0) {
    if (tree && commentMap) {
      if (commentId) {
        const comment = commentMap.get(commentId) as getComment;
        // memo지혜 :자식댓글 배열
        const children = tree[commentId];

        return (
          <CommentItem key={comment.id} indent={depth}>
            <div>
              <div>
                <p>{commentId}번 댓글</p>
                <CommentContext>
                  {comment.isDeleted ? (
                    <ReadCommentDeleteMsg>
                      삭제된 댓글입니다.
                    </ReadCommentDeleteMsg>
                  ) : (
                    <ReadComment
                      disabled={!edit[commentId]}
                      onInput={commentOnInput}
                      ref={(el) => (contextRef.current[commentId] = el)}
                      defaultValue={comment.context}
                    />
                  )}
                  <Author>{comment.userDto.nickname}</Author>
                  {edit[commentId] && (
                    <CommentUpdateButtonGrop>
                      <span onClick={() => handleUpdateComment(comment)}>
                        수정완료
                      </span>
                      <span onClick={() => hanleEditId(comment.id)}>취소</span>
                    </CommentUpdateButtonGrop>
                  )}
                </CommentContext>
                {comment.userDto.userId === Number(userInfo?.user.userId) && (
                  <CommentButton>
                    <span onClick={() => hanleEditId(comment.id)}>
                      수정하기
                    </span>
                    <span onClick={() => handleRemoveComment(comment.id)}>
                      삭제하기
                    </span>
                  </CommentButton>
                )}
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
            </div>
            {children?.map((child) => renderComments(child, depth + 1))}
          </CommentItem>
        );
      }
    }
  }
  function getCommentsByParent(comments: getComment[]) {
    // 최상단 부모를 판단하는 기준 : parentCommentOrderId === null
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
    return { rootComments, nonRootComments };
  }

  // memo지혜: comment tree
  function commentTree(comments: getComment[]) {
    const tree: Tree = {};

    // memo지혜: 최상단 부모 댓글과 그외의 모든 댓글을 배열로 분리
    const { rootComments, nonRootComments } = getCommentsByParent(comments);

    // memo지혜: 최상단 부모 댓글이 있다면
    if (rootComments.length > 0) {
      for (const comment of rootComments) {
        // memo지혜: 자식댓글수의 값이 1이상이면 그 값만큼 0으로 배열을 채워 tree을 세팅
        // memo지혜: 그렇지 않다면(자식이 없다면) null로 tree을 세팅
        tree[comment.id] = comment.childCommentCount
          ? Array(comment.childCommentCount).fill(0)
          : null;
      }
    }
    // memo지혜: 자식댓글이 있다면
    if (nonRootComments.length > 0) {
      for (const comment of nonRootComments) {
        // memo지혜 : parentCommentOrderId(부모댓글 id)가 존재하고, commentMap이 완성되었다면
        if (comment.parentCommentOrderId && commentMap) {
          // memo지혜: 부모 comment 가져오기
          const parentComment = commentMap.get(
            comment.parentCommentOrderId
          ) as getComment;

          // memo지혜: 주석 201줄 동일
          tree[comment.id] = comment.childCommentCount
            ? Array(comment.childCommentCount).fill(0)
            : null;

          // memo지혜: parentComment이 있고, tree에 parentComment의 id를 key를 가진 value가 있다면
          if (parentComment && tree[parentComment.id]) {
            // memo지혜: tree에 parentComment의 id를 key를 가진 value배열에 commentOrder index에 comment의 id를 할당
            // 즉, commentOrder순서에 따라 value배열의 0 대신에 자식 id를 commentOrder인덱스 위치에 할당
            tree[parentComment.id]![comment.commentOrder] = comment.id;
          }
        }
      }
    }
    return { rootComments, tree };
  }

  return (
    <CommentContainer>
      <H3>댓글창{comments.length}</H3>
      <CommentList>
        {comments.length === 0 && <p>입력된 댓글이 없습니다.</p>}
        {comments.length > 0 &&
          tree &&
          commentMap?.size > 0 &&
          rootComments?.map((root) => renderComments(root.id))}
      </CommentList>
      <CommentParent>
        <CommentInput
          parentCommentOrderId={null}
          childCommentCount={0}
          commentOrder={
            rootComments && rootComments.length ? rootComments.length : 0
          }
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
  border-radius: 2rem;
  border: 0.2rem solid ${({ theme }) => theme.color.darkgray};
`;
const H3 = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
  padding: 1rem 0.5rem;
`;
const CommentList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 8rem;
`;
const CommentItem = styled.div<{ indent?: number }>`
  width: 100%;

  & > div:not([indent]) {
    border: 1px solid #ddd;
    border-radius: 2rem;
    padding: 1rem;
    margin: 0.5rem 0;
  }

  ${({ indent }) =>
    indent &&
    `  
    display: flex;
    flex-direction:column;
    align-items: flex-end;
    & > div { width:  ${100 - indent * 5}% }
    `}
`;
const CommentContext = styled.div`
  font-size: 1.5rem;
  padding: 1rem;
`;
const Author = styled.p`
  text-align: right;
`;
const Relply = styled.p`
  text-align: right;
  font-size: 1.2rem;
  margin: 0.7rem 0;
  text-decoration: underline;
  color: ${({ theme }) => theme.color.darkgray};
`;
const ReadCommentDeleteMsg = styled.p`
  font-size: 1.3rem;
  padding: 1rem;
`;
const ReadComment = styled(Input)`
  padding: 0;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: white;
    border:none;
  `}

  & + p {
    text-align: right;
  }
`;
const CommentParent = styled.div`
  margin-top: 2rem;
`;
const CommentButton = styled.div`
  display: flex;
  justify-content: flex-end;

  & > span {
    border: 1px solid ${({ theme }) => theme.color.lightgray};
    border-radius: 1rem;
    padding: 0.5rem;
  }
  & > span:first-child {
    margin-right: 0.2rem;
  }
`;
const CommentUpdateButtonGrop = styled.div`
  display: flex;
  justify-content: flex-end;

  & > span:not(:last-child) {
    margin-right: 0.3rem;
  }
  & > span {
    margin: 0.5rem 0;
    text-decoration: underline;
  }
`;
