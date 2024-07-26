/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// Test for nueva pelicula page
import '@testing-library/jest-dom'
import { act, render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import { NewMoviePage } from "../../pages/create-movie"
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import axios from "axios";
import { CREATE_MOVIE_URL } from "../../config";
const queryClient = new QueryClient()
jest.mock('axios');
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

const renderComponent = () => {
    return act(async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <NewMoviePage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    })
}

const fillAndSubmitForm = async ({ titulo, director, fechaEstreno, genero, clasificacion, estatus, actores, sinopsis, trailer, imagen }: {
    titulo: string,
    director: string,
    fechaEstreno: string,
    genero: string,
    clasificacion: string,
    estatus: string,
    actores: string,
    sinopsis: string,
    trailer: string,
    imagen: File | null
}) => {
    const validateTextbox = (label: string, value: string | string[] | null | undefined) => {
        if (!value) return
        const input = screen.getByRole("textbox", { name: label });
        expect(input).toHaveValue('');
        fireEvent.change(input, { target: { value } });
        expect(input).toHaveValue(value);
    }
    validateTextbox('titulo', titulo)
    validateTextbox('director', director)
    validateTextbox('genero', genero)
    validateTextbox('clasificacion', clasificacion)
    validateTextbox('estatus', estatus)
    validateTextbox('actores', actores)
    validateTextbox('sinopsis', sinopsis)
    validateTextbox('trailer', trailer)

    // Fill Fecha de Estreno
    const dateInput = screen.getByLabelText('Fecha de Estreno');
    expect(dateInput).toHaveValue('');
    fireEvent.change(dateInput, { target: { value: fechaEstreno } });
    expect(dateInput).toHaveValue(fechaEstreno);
    //  Fill Imagen
    const fileInput = screen.getByLabelText('Imagen');
    expect(fileInput).toHaveValue('');
    if (imagen) {
        await userEvent.upload(fileInput, imagen);
    }
    const submitButton = screen.getByRole('button', { name: /guardar/i });
    fireEvent.click(submitButton);
    await userEvent.click(submitButton)
}

describe('New Movie Page', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    it('should render the create movie page', async () => {
        await renderComponent()
        // Title is Crear Nueva Película
        expect(screen.getByText('Crear Nueva Película')).toBeInTheDocument()

        // All fileds have labels
        expect(screen.getByText('Título')).toBeInTheDocument()
        expect(screen.getByText('Director')).toBeInTheDocument()
        expect(screen.getByText('Fecha de Estreno')).toBeInTheDocument()
        expect(screen.getByText('Género')).toBeInTheDocument()
        expect(screen.getByText('Clasificación')).toBeInTheDocument()
        expect(screen.getByText('Estatus')).toBeInTheDocument()
        expect(screen.getByText('Actores')).toBeInTheDocument()
        expect(screen.getByText('Sinopsis')).toBeInTheDocument()
        expect(screen.getByText('Trailer')).toBeInTheDocument()
        expect(screen.getByText('Imagen')).toBeInTheDocument()

    })
    it('Form is correctly sent', async () => {
        await renderComponent();
        const newMovie = {
            titulo: 'La Mujer Maravilla',
            director: 'Patty Jenkins',
            fechaEstreno: '2017-06-02',
            genero: 'Accion y Aventura',
            clasificacion: 'B',
            estatus: 'Activa',
            actores: 'Gal Gadot,Chris Pine,Robin Wright,Connie Nielsen',
            sinopsis: 'La princesa amazona Diana Prince descubre su destino como la Mujer Maravilla después de que un piloto estadounidense se estrella en la costa de su isla y le informa sobre un conflicto masivo en el mundo exterior.',
            trailer: 'https://www.youtube.com/embed/1Q8fG0TtVAY',
            imagen: new File(['(⌐□_□)'], 'mujer.png', { type: 'image/png' }),
        };
        // Mock axios post
        const mockResponse = { data: { message: 'Pelicula creada' } };
        (axios.post as jest.Mock).mockResolvedValue(mockResponse);
        // Submit form
        await fillAndSubmitForm(newMovie);
        // Expect axios to have been called
        // Build form data from movie
        const data = {
            "jsonPelicula": JSON.stringify({
                titulo: newMovie.titulo,
                fechaEstreno: newMovie.fechaEstreno,
                genero: newMovie.genero,
                clasificacion: newMovie.clasificacion,
                estatus: newMovie.estatus,
                detalle: {
                    actores: newMovie.actores,
                    sinopsis: newMovie.sinopsis,
                    trailer: newMovie.trailer,
                    director: newMovie.director
                },
            })
        }

        expect(axios.post).toHaveBeenCalledWith(CREATE_MOVIE_URL, expect.any(FormData), {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        // Expect to navigate to movies page
        expect(mockedUsedNavigate).toHaveBeenCalledWith('/');

        // Correct body
        const formDataSent = (axios.post as jest.Mock).mock.calls[0][1];
        expect(formDataSent.get('jsonPelicula')).toEqual(data.jsonPelicula);
    })
    it('Form is correctly validated', async () => {
        await renderComponent()
        // Submit form
        await fillAndSubmitForm({
            titulo: '',
            director: '',
            fechaEstreno: '',
            genero: '',
            clasificacion: '',
            estatus: '',
            actores: '',
            sinopsis: '',
            trailer: '',
            imagen: null,
        });
        // Should show error messages
        expect(screen.getByText('El título es obligatorio')).toBeInTheDocument()
        expect(screen.getByText('El director es obligatorio')).toBeInTheDocument()
        expect(screen.getByText('La fecha de estreno debe ser mayor a 1920-12-28')).toBeInTheDocument()
        expect(screen.getByText('El género es obligatorio')).toBeInTheDocument()
        expect(screen.getByText('La clasificación es obligatoria')).toBeInTheDocument()
        expect(screen.getByText('El estatus es obligatorio')).toBeInTheDocument()
        expect(screen.getByText('Los actores son obligatorios')).toBeInTheDocument()
        expect(screen.getByText('La sinopsis es obligatoria')).toBeInTheDocument()
        expect(screen.getByText('El trailer debe ser una URL válida')).toBeInTheDocument()


    })

})