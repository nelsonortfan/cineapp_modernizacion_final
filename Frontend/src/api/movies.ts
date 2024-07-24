import axios from "axios";
import { Movie } from "../interfaces";
import movieList from "../data/jsonListaPeliculas.json";
import { CREATE_MOVIE_URL, GET_MOVIES_URL } from "../config";

export const createMovie = async (formData: FormData): Promise<Movie> => {
  try {
    const response = await axios.post<Movie>(`${CREATE_MOVIE_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const message = error.response?.data?.message;
      if (typeof message === "string") {
        throw new Error(message);
      } else {
        throw new Error("Error al guardar en la base de datos");
      }
    } else {
      throw new Error("Error desconocido");
    }
  }
};

export const fetchMovies = async (): Promise<Movie[]> => {
  if (GET_MOVIES_URL) {
    const { data } = await axios.get<Movie[]>(GET_MOVIES_URL);
    return data;
  } else {
    return movieList;
  }
};
