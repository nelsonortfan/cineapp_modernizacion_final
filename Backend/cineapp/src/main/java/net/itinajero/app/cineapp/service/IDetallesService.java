package net.itinajero.app.cineapp.service;

import net.itinajero.app.cineapp.model.Detalle;

public interface IDetallesService {
	void insertar(Detalle detalle);
	void eliminar(int idDetalle);
}
