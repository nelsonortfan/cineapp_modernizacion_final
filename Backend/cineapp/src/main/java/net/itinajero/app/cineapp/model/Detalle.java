/**
 * Clase de modelo que representa los detalles extras de una pelicula.
 */
package net.itinajero.app.cineapp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "Detalles")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Detalle {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment MySQL
	private int id;
	private String director;
	private String actores;
	private String sinopsis;
	private String trailer; // url del video de YouTube

}
