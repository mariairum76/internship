import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useProfile = (token) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await api.get(
        "/users/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    },
  });
};