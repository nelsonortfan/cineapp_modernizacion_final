/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// Test for App page
import '@testing-library/jest-dom'
import { act, render, screen } from "@testing-library/react"
import axios from "axios";
import App from '../../App';
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import { GET_MOVIES_URL } from "../../config";

const queryClient = new QueryClient()
jest.mock('axios');


const MOVIES = [
  {
    "id": 1,
    "titulo": "Kong La Isla Calavera",
    "duracion": 118,
    "clasificacion": "B",
    "genero": "Accion y Aventura",
    "imagen": "kong.png",
    "fechaEstreno": "2017-10-20",
    "estatus": "Activa",
    "detalle": {
      "id": 1,
      "director": "Jordan Vogt-Roberts",
      "actores": "Samuel L. Jackson,Tom Hiddleston,Brie Larson,Toby Kebbell",
      "sinopsis": "Kong: La Isla Calavera reimagina el origen del mítico Kong en una irresistible aventura original del director Jordan Vogt-Roberts. En la película, un diverso equipo de exploradores es reunido para aventurarse en el interior de una isla del Pacífico —tan bella como traicionera— que no aparece en los mapas, sin saber que están invadiendo los dominios del mítico Kong.",
      "trailer": "https://www.youtube.com/embed/86jhW2gPc84"
    }
  },
  {
    "id": 2,
    "titulo": "La Liga de la Justicia",
    "duracion": 121,
    "clasificacion": "B",
    "genero": "Accion y Aventura",
    "imagen": "liga.png",
    "fechaEstreno": "2017-11-17",
    "estatus": "Activa",
    "detalle": {
      "id": 2,
      "director": "Zack Snyder",
      "actores": "Ben Affleck,Henry Cavill,Gal Gadot,Ezra Miller",
      "sinopsis": "Motivado por la fe que había recuperado en la humanidad e inspirado por la acción altruista de Superman, Bruce Wayne recluta la ayuda de su nueva aliada, Diana Prince, para enfrentarse a un enemigo aún mayor. Juntos, Batman",
      "trailer": "https://www.youtube.com/embed/3cxixDgHUYw"
    },
  },
  {
    "id": 3,
    "titulo": "La Mujer Maravilla",
    "duracion": 141,
    "clasificacion": "B",
    "genero": "Accion y Aventura",
    "imagen": "mujer.png",
    "fechaEstreno": "2017-06-02",
    "estatus": "Activa",
    "detalle": {
      "id": 3,
      "director": "Patty Jenkins",
      "actores": "Gal Gadot,Chris Pine,Connie Nielsen,Robin Wright",
      "sinopsis": "Antes de ser Wonder Woman, era Diana, princesa de las Amazonas, entrenada para ser una guerrera invencible. Diana fue criada en una isla paradisíaca protegida. Hasta que un día un piloto norteamericano, que tiene un accidente y acaba en sus costas, le habla de un gran conflicto existente en el mundo [Primera Guerra Mundial]. Diana decide salir de la isla convencida de que puede detener la terrible amenaza.",
      "trailer": "https://www.youtube.com/embed/VSB4wGIdDwo"
    },
  },
  {
    "id": 4,
    "titulo": "Logan",
    "duracion": 137,
    "clasificacion": "B",
    "genero": "Accion y Aventura",
    "imagen": "logan.png",
    "fechaEstreno": "2017-03-03",
    "estatus": "Activa",
    "detalle": {
      "id": 4,
      "director": "James Mangold",
      "actores": "Hugh Jackman,Patrick Stewart,Dafne Keen,Boyd Holbrook",
      "sinopsis": "En un futuro cercano, un cansado Logan cuida del Profesor X en un escondite en la frontera mexicana. Pero los intentos de Logan por esconderse del mundo y de su legado terminan cuando llega una joven mutante perseguida por fuerzas oscuras.",
      "trailer": "https://www.youtube.com/embed/Div0iP65aZo"
    },
  },
]
describe("App", () => {
  test("renders App component", async () => {
    const mockResp = MOVIES;
    (axios.get as jest.Mock).mockResolvedValue({ data: mockResp });
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <App />
          </MemoryRouter>
        </QueryClientProvider>
      );
    });
    expect(screen.getByRole("heading", { name: "Listado de Películas" })).toBeInTheDocument();
    // Expect get called with correct data
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(GET_MOVIES_URL);
    // Shows a table with the headers Título	Género	Clasificación	Duración	Fecha Estreno	Estatus
    // Get table headers
    // Check table headers
    const headers = ["Título", "Género", "Clasificación", "Duración", "Fecha Estreno", "Estatus"];
    headers.forEach(header => {
      expect(screen.getByRole("columnheader", { name: header })).toBeInTheDocument();
    });
    // Movies are displayed in order

    // Check table rows
    const rows = screen.getAllByRole("row");
    // Skip the header row
    const dataRows = rows.slice(1);
    expect(dataRows).toHaveLength(4);

    dataRows.forEach((row, index) => {
      const cells = row.querySelectorAll("td");
      expect(cells[0]).toHaveTextContent(MOVIES[index].titulo);
      expect(cells[1]).toHaveTextContent(MOVIES[index].genero);
      expect(cells[2]).toHaveTextContent(MOVIES[index].clasificacion);
      expect(cells[3]).toHaveTextContent(`${MOVIES[index].duracion} min.`);
      expect(cells[4]).toHaveTextContent(MOVIES[index].fechaEstreno);
      expect(cells[5]).toHaveTextContent(MOVIES[index].estatus);
    });

  });
})