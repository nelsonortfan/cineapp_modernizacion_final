export interface ContentContainerProps {
  children: React.ReactNode;
}

export interface MovieFormData {
  titulo: string;
  director: string;
  fechaEstreno: string;
  genero: string;
  clasificacion: string;
  estatus: string;
  actores: string;
  sinopsis: string;
  trailer: string;
  imagen: File | null;
}

export interface RouteError {
  statusText?: string;
  data?: string;
  status: number;
}

export interface Movie {
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
