import { useQuery } from "react-query";
import { fetchMovies } from "../api";

export const useMovieData = () => {
  return useQuery("movies", () => fetchMovies());
};
