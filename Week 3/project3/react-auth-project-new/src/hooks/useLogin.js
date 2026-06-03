import { useMutation } from "@tanstack/react-query";
import api from "../api/axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await api.post(
        "/auth/login",
        data
      );

      return response.data;
    },
  });
};