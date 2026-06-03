import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import api from "../api/axios";
import useAuthStore from "../store/authStore";

export const useAddNote = () => {
  const queryClient =
    useQueryClient();

  const token =
    useAuthStore.getState()
      .accessToken;

  return useMutation({
    mutationFn: async (note) => {

      const response =
        await api.post(
          "/users/note",
          { note },
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      return response.data;
    },

    onMutate: async (newNote) => {

      const previous =
        queryClient.getQueryData([
          "notes",
        ]) || [];

      queryClient.setQueryData(
        ["notes"],
        [...previous, newNote]
      );

      return { previous };
    },

    onError: (
      error,
      newNote,
      context
    ) => {

      queryClient.setQueryData(
        ["notes"],
        context.previous
      );
    },
  });
};