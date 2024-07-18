package net.itinajero.app.cineapp.controller;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import net.itinajero.app.cineapp.model.Pelicula;
import net.itinajero.app.cineapp.service.FileService;
import net.itinajero.app.cineapp.service.IDetallesService;
import net.itinajero.app.cineapp.service.IPeliculasService;

@Controller
@RequestMapping(value="/peliculas")
public class PeliculasController {
	
	// Inyectamos una instancia desde nuestro Root ApplicationContext
	@Autowired
	private IDetallesService serviceDetalles;
	
	private final FileService fileService;
	
	// Inyectamos una instancia desde nuestro Root ApplicationContext
    @Autowired
	private IPeliculasService servicePeliculas;
	
	public PeliculasController(IDetallesService serviceDetalles, FileService fileService,
			IPeliculasService servicePeliculas) {
		super();
		this.serviceDetalles = serviceDetalles;
		this.fileService = fileService;
		this.servicePeliculas = servicePeliculas;
	}
	
    /**
	 * Metodo que muestra la lista de peliculas
	 * @param model
	 * @return
	 */
	@GetMapping(value = "/index")
	public @ResponseBody List<Pelicula> mostrarIndex() {
		List<Pelicula> lista = servicePeliculas.buscarTodas();
		System.out.println(lista);
		return lista;
	}
	
	/**
	 * Metodo que muestra la lista de peliculas con paginacion
	 * @param model
	 * @param page
	 * @return
	 */
	@GetMapping(value = "/indexPaginate")
	public @ResponseBody Page<Pelicula> mostrarIndexPaginado(Pageable page) {
		Page<Pelicula> lista = servicePeliculas.buscarTodas(page);
		return lista;
	}

	/**
	 * Metodo para mostrar el formulario para crear una pelicula
	 * @return
	 */
	@GetMapping(value = "/create")
	public String crear(@ModelAttribute Pelicula pelicula) {		
		return "peliculas/formPelicula";
	}
	
	/**
	 * Metodo para guardar los datos de la pelicula (CON ARCHIVO DE IMAGEN)
	 * @param pelicula
	 * @param result
	 * @param model
	 * @param multiPart
	 * @param request
	 * @return
	 */
	@PostMapping(value = "/save")
	public @ResponseBody Pelicula guardar(String jsonPelicula,
			@RequestParam("archivoImagen") MultipartFile multiPart, HttpServletRequest request) {	
		
		Pelicula pelicula = null;
	    try {
	    	pelicula = new ObjectMapper().readValue(jsonPelicula, Pelicula.class);
	    	System.out.println(pelicula);
	    } catch (Exception e) {
	        e.printStackTrace();
	    }
		
		if (!multiPart.isEmpty()) {
			String nombreImagen = fileService.uploadFile(multiPart).getFilePath();
			if (nombreImagen!=null){ // La imagen si se subio				
				pelicula.setImagen(nombreImagen); // Asignamos el nombre de la imagen
			}	
		}
		
		// Primero insertamos el detalle
	    serviceDetalles.insertar(pelicula.getDetalle());
	    
		// Como el Detalle ya tiene id, ya podemos guardar la pelicula
		Pelicula peliculaSaved = servicePeliculas.insertar(pelicula);
			
		return peliculaSaved;		
	}
	
	/**
	 * Metodo que muestra el formulario para editar una pelicula
	 * @param idPelicula
	 * @param model
	 * @return
	 */
	@GetMapping(value = "/edit/{id}")
	public String editar(@PathVariable("id") int idPelicula, Model model) {		
		Pelicula pelicula = servicePeliculas.buscarPorId(idPelicula);			
		model.addAttribute("pelicula", pelicula);
		return "peliculas/formPelicula";
	}
	
	/**
	 * Metodo para eliminar una pelicula
	 * @param idPelicula
	 * @param attributes
	 * @return
	 */
	@GetMapping(value = "/delete/{id}")
	public String eliminar(@PathVariable("id") int idPelicula, RedirectAttributes attributes) {
		// Buscamos primero la pelicula
		Pelicula pelicula = servicePeliculas.buscarPorId(idPelicula);		
		
		// Eliminamos la pelicula. Tambien al borrar la pelicula, se borraran los Horarios (ON CASCADE DELETE)
		servicePeliculas.eliminar(idPelicula);
		
		// Eliminamos el registro del detalle
		serviceDetalles.eliminar(pelicula.getDetalle().getId());		
		attributes.addFlashAttribute("msg", "La pelicula fue eliminada!.");
		//return "redirect:/peliculas/index";
		return "redirect:/peliculas/indexPaginate";
	}
	
	/**
	 * Agregamos al Model la lista de Generos: De esta forma nos evitamos agregarlos en los metodos
	 * crear y editar. 
	 * @return
	 */
	@ModelAttribute("generos")
	public List<String> getGeneros(){
		return servicePeliculas.buscarGeneros();
	}
	
	/**
	 * Personalizamos el Data Binding para todas las propiedades de tipo Date
	 * @param webDataBinder
	 */
	@InitBinder
	public void initBinder(WebDataBinder webDataBinder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy");
		webDataBinder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
	}
}
