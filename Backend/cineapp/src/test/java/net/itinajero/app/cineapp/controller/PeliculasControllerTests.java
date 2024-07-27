package net.itinajero.app.cineapp.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.fasterxml.jackson.databind.ObjectMapper;

import static org.mockito.Mockito.when;
import net.itinajero.app.cineapp.model.Pelicula;
import net.itinajero.app.cineapp.dto.FileUploadResponse;
import net.itinajero.app.cineapp.model.Detalle;
import net.itinajero.app.cineapp.service.FileService;
import net.itinajero.app.cineapp.service.IPeliculasService;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.LinkedList;
import java.util.List;

@SpringBootTest
@AutoConfigureMockMvc
public class PeliculasControllerTests {

    // Test endpoint /peliculas
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private IPeliculasService service;

    @MockBean
    private FileService fileService;

    private Pelicula crearPelicula(int id, String titulo, int duracion, String clasificacion, String genero,
            Date fechaEstreno, String imagen,
            String estatus, String director, String actores, String sinopsis, String trailer) {
        Pelicula pelicula = new Pelicula();
        pelicula.setId(id);
        pelicula.setTitulo(titulo);
        pelicula.setDuracion(duracion);
        pelicula.setClasificacion(clasificacion);
        pelicula.setGenero(genero);
        pelicula.setFechaEstreno(fechaEstreno);
        pelicula.setEstatus(estatus);
        pelicula.setImagen(imagen);

        Detalle detalle = new Detalle();
        detalle.setDirector(director);
        detalle.setActores(actores);
        detalle.setSinopsis(sinopsis);
        detalle.setTrailer(trailer);
        pelicula.setDetalle(detalle);

        return pelicula;
    }

    @Test
    void testListarPeliculas() throws Exception {
        List<Pelicula> peliculas = new LinkedList<>();

        Calendar calendar = Calendar.getInstance();
        calendar.set(2024, 7, 26);
        Pelicula pelicula = this.crearPelicula(1, "Inception", 148, "PG-13", "Sci-Fi",
                new GregorianCalendar(2024, Calendar.JULY, 26).getTime(), "inception.png", "Activa",
                "Christopher Nolan", "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
                "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
                "https://www.youtube.com/watch?v=YoHD9XEInc0");
        peliculas.add(pelicula);
        Pelicula pelicula2 = this.crearPelicula(2, "Get Out", 104, "R", "Horror",
                new GregorianCalendar(2017, Calendar.FEBRUARY, 24).getTime(), "out.png", "Activa",
                "Jordan Peele", "Daniel Kaluuya, Allison Williams, Bradley Whitford",
                "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
                "https://www.youtube.com/watch?v=sRfnevzM9kQ");
        peliculas.add(pelicula2);

        when(service.buscarTodas()).thenReturn(peliculas);
        this.mockMvc.perform(get("/peliculas/index")).andDo(print()).andExpect(status().isOk())
                .andExpect(content().string(
                        "[{\"id\":1,\"titulo\":\"Inception\",\"duracion\":148,\"clasificacion\":\"PG-13\",\"genero\":\"Sci-Fi\",\"imagen\":\"inception.png\",\"fechaEstreno\":\"2024-07-26\",\"estatus\":\"Activa\",\"detalle\":{\"id\":0,\"director\":\"Christopher Nolan\",\"actores\":\"Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page\",\"sinopsis\":\"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.\",\"trailer\":\"https://www.youtube.com/watch?v=YoHD9XEInc0\"}},{\"id\":2,\"titulo\":\"Get Out\",\"duracion\":104,\"clasificacion\":\"R\",\"genero\":\"Horror\",\"imagen\":\"out.png\",\"fechaEstreno\":\"2017-02-24\",\"estatus\":\"Activa\",\"detalle\":{\"id\":0,\"director\":\"Jordan Peele\",\"actores\":\"Daniel Kaluuya, Allison Williams, Bradley Whitford\",\"sinopsis\":\"A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.\",\"trailer\":\"https://www.youtube.com/watch?v=sRfnevzM9kQ\"}}]"));
    }

    @Test
    void testCrearPelicula() throws Exception {
        ObjectMapper mapper = new ObjectMapper();

        Pelicula aInsertar = this.crearPelicula(3, "The Dark Knight", 152, "PG-13", "Action",
                new GregorianCalendar(2008, Calendar.JULY, 18).getTime(), "darkknight.png", "Activa",
                "Christopher Nolan", "Christian Bale, Heath Ledger, Aaron Eckhart",
                "When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
                "https://www.youtube.com/watch?v=EXeTwQWrcwY");
        String json = mapper.writeValueAsString(aInsertar);
        MockMultipartFile mockFile = new MockMultipartFile(
                "archivoImagen", // name of the file parameter
                "darkknight.png", // original filename
                MediaType.IMAGE_PNG_VALUE, // content type
                "dummy image content".getBytes() // file content
        );
        when(service.insertar(aInsertar)).thenReturn(aInsertar);
        when(fileService.uploadFile(mockFile))
                .thenReturn(new FileUploadResponse("darkknight.png", LocalDateTime.now()));
        this.mockMvc
                .perform(MockMvcRequestBuilders.multipart("/peliculas/save").file(mockFile)

                        .param("jsonPelicula", json))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(content().string(""));

    }

}
