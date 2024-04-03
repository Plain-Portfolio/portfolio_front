import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getToken } from "../utils/token";
import { PostFormData } from "../interfaces/IPost";
import { useNavigate } from "react-router-dom";

const fetchProject = async (projectId: string) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/project/${projectId}`
  );
  return res.data;
};

const deleteProject = async (projectId: string) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/project/${projectId}`
  );
  return res.data;
};

const createProject = async (postData: PostFormData) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/project/create`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`,
      },
    }
  );
  return res.data;
};

const updateProject = async (postData: PostFormData) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API_URL}/project/update`,
    postData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${getToken()}`,
      },
    }
  );
  return res.data;
};

export const useProjectData = (projectId: string | undefined) => {
  const navigate = useNavigate();

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["fetchdata", projectId as string],
    queryFn: ({ queryKey }) => fetchProject(queryKey[1]),
    enabled: !!projectId,
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: deleteProject,
    onSuccess: (data) => {
      navigate(`/`);
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });

  const { mutate: createMutate } = useMutation({
    mutationFn: createProject,
    onSuccess: (data) => {
      navigate(`/read/${data.projectId}`);
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });

  const { mutate: updateMutate } = useMutation({
    mutationFn: updateProject,
    onSuccess: (data) => {
      navigate(`/read/${data.id}`);
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });

  return {
    isLoading,
    data,
    isError,
    error,
    deleteMutate,
    createMutate,
    updateMutate,
  };
};
