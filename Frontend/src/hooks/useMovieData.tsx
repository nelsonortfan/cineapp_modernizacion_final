import { useQuery } from "react-query";
import axios from "axios";
import movieList from "../data/jsonListaPeliculas.json";

interface Movie {
  id: number;
  titulo: string;
  duracion: number;
  clasificacion: string;
  genero: string;
  imagen: string;
  fechaEstreno: string;
  estatus: string;
  detalle: {
    id: number;
    director: string;
    actores: string;
    sinopsis: string;
    trailer: string;
  };
}

const fetchMovies = async (url?: string): Promise<Movie[]> => {
  if (url) {
    const { data } = await axios.get<Movie[]>(url);
    return data;
  } else {
    return movieList;
  }
};

export const useMovieData = (url?: string) => {
  return useQuery("movies", () => fetchMovies(url));
};
