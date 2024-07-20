/**
 *  Clase de modelo que representa una pelicula en la cartelera
 */
package net.itinajero.app.cineapp.model;

import java.util.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;


@Entity
@Table(name = "Peliculas")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Pelicula {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment MySQL
	private int id;
	private String titulo;
	private int duracion;
	private String clasificacion;
	private String genero;
	private String imagen = "cinema.png"; // imagen por default
	@DateTimeFormat(pattern="yyyy-MM-dd")
	private Date fechaEstreno;
	private String estatus = "Activa"; // posibles valores: Activa, Inactiva

	// @Transient // ignorar este atributo durante la persistencia
	// Relacion Uno a Uno -> Una pelicula tiene un registro de detalle
	@OneToOne
	@JoinColumn(name = "idDetalle") // foreignKey en la tabla de Peliculas
	private Detalle detalle;

}
