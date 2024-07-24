import { useMutation, useQueryClient } from "react-query";
import { createMovie } from "../api";

export const useCreateMovie = () => {
  const queryClient = useQueryClient();

  return useMutation(createMovie, {
    onSuccess: () => {
      // Invalidate and refetch
      void queryClient.invalidateQueries("movies");
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Error desconocido");
      }
    },
  });
};
