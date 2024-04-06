import axios from "axios";
import { getToken } from "../utils/token";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Icomment } from "../interfaces/IDetail";

const fetchComment = async (projectId: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/comment/${projectId}/comments`,
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return res.data;
};

const createComment = async (data: Icomment) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/comment/create`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`,
      },
    }
  );
  return res.data;
};

export const useCommentData = (projectId: string | undefined) => {
  const queryClient = useQueryClient();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["fetchComment", projectId as string],
    queryFn: ({ queryKey }) => fetchComment(queryKey[1]),
    enabled: !!projectId,
  });

  const { mutate: createCommentMutate } = useMutation({
    mutationFn: createComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["fetchComment", projectId as string],
      });
    },
    onError: (error) => {
      console.error("Error comment craete", error);
    },
  });

  return {
    isLoading,
    data,
    isError,
    error,
    createCommentMutate,
  };
};
