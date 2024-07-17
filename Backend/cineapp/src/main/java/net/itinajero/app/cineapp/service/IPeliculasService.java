package net.itinajero.app.cineapp.service;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import net.itinajero.app.cineapp.model.Pelicula;


public interface IPeliculasService {
	Pelicula insertar(Pelicula pelicula);	
	List<Pelicula> buscarTodas();
	Pelicula buscarPorId(int idPelicula);
	List<String> buscarGeneros();
	// Con este metodo traemos las peliculas Activas. Para formar el select de Peliculas del FORM de nuevo Horario.
    List<Pelicula> buscarActivas();	

	Page<Pelicula> buscarTodas(Pageable page);	
	void eliminar(int idPelicula);
}
