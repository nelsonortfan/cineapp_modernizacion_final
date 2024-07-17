package net.itinajero.app.cineapp.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import net.itinajero.app.cineapp.model.Pelicula;
import net.itinajero.app.cineapp.repository.PeliculasRepository;


// Registramos esta clase como un Bean en nuestro Root ApplicationContext.
@Service
public class PeliculasServiceJPA implements IPeliculasService {
		
    // Inyectamos una instancia desde nuestro Root ApplicationContext.
    @Autowired
	private PeliculasRepository peliculasRepo;
	
	@Override
	public Pelicula insertar(Pelicula pelicula) {
		return peliculasRepo.save(pelicula);
	}



	@Override
	public List<Pelicula> buscarTodas() {
		return peliculasRepo.findAll();		
	}

	@Override
	public List<Pelicula> buscarActivas() {
		List<Pelicula> peliculas = null;
		peliculas = peliculasRepo.findByEstatus_OrderByTitulo("Activa");
		return peliculas;
	}

	// Spring 4.3
//	@Override
//	public Pelicula buscarPorId(int idPelicula) {		
//		return peliculasRepo.findOne(idPelicula);
//	}
		
	@Override
	public Pelicula buscarPorId(int idPelicula) {	
		Optional<Pelicula> optional = peliculasRepo.findById(idPelicula);
		if (optional.isPresent())
			return optional.get();
		return null;
	}

	@Override
	public void eliminar(int idPelicula) {
		//peliculasRepo.delete(idPelicula); // Spring 4.3
		peliculasRepo.deleteById(idPelicula);
		
	}

	@Override
	public Page<Pelicula> buscarTodas(Pageable page) {
		return peliculasRepo.findAll(page);
	}
	
	/**
	 * Metodo que regresa una lista de los generos de peliculas.
	 */
	@Override
	public List<String> buscarGeneros() {
		
		// Nota: Esta lista podria ser obtenida de una BD
		List<String> generos = new LinkedList<>();
		generos.add("Accion");
		generos.add("Aventura");
		generos.add("Clasicas");
		generos.add("Comedia Romantica");
		generos.add("Drama");
		generos.add("Terror");
		generos.add("Infantil");
		generos.add("Accion y Aventura");
		generos.add("Romantica");
		generos.add("Ciencia Ficcion");
		generos.add("Thriller");
				
		return generos;
	}
	
}
