import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z, ZodError } from "zod";
import { toast } from "react-toastify";
import { useCreateMovie } from "../../hooks/useCreateMovie";
import { MovieFormData } from "../../interfaces";

const movieSchema = z.object({
  titulo: z.string().min(3, "El título es obligatorio"),
  director: z.string().min(3, "El director es obligatorio"),
  fechaEstreno: z
    .string({ required_error: "La fecha de estreno es obligatoria" })
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha incorrecto")
    .refine(
      (date) => {
        const parsedDate = new Date(date);
        return parsedDate >= new Date(1920, 11, 28);
      },
      {
        message: "La fecha de estreno debe ser mayor a 1920-12-28",
      }
    ),
  genero: z.string().min(3, "El género es obligatorio"),
  clasificacion: z
    .string()
    .min(1, "La clasificación es obligatoria")
    .max(1, "La clasificación debe ser de un solo caracter"),
  estatus: z.string().min(1, "El estatus es obligatorio"),
  detalle: z.object({
    actores: z.string().min(3, "Los actores son obligatorios"),
    sinopsis: z.string().min(3, "La sinopsis es obligatoria"),
    trailer: z.string().url("El trailer debe ser una URL válida"),
  }),
});

export const NewMoviePage = () => {
  const [formData, setFormData] = useState<MovieFormData>({
    titulo: "",
    director: "",
    fechaEstreno: "",
    genero: "",
    clasificacion: "",
    estatus: "",
    actores: "",
    sinopsis: "",
    trailer: "",
    imagen: null,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const createMovieMutation = useCreateMovie();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      imagen: e.target.files ? e.target.files[0] : null,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        titulo: formData.titulo,
        director: formData.director,
        fechaEstreno: formData.fechaEstreno,
        genero: formData.genero,
        clasificacion: formData.clasificacion,
        estatus: formData.estatus,
        detalle: {
          actores: formData.actores,
          sinopsis: formData.sinopsis,
          trailer: formData.trailer,
        },
      };

      movieSchema.parse(data);

      const formDataToSend = new FormData();
      formDataToSend.append("jsonPelicula", JSON.stringify(data));
      if (formData.imagen) {
        formDataToSend.append("archivoImagen", formData.imagen);
      }

      createMovieMutation.mutate(formDataToSend, {
        onSuccess: () => {
          toast.success("¡Película creada exitosamente!");
          navigate("/");
        },
        onError: (error) => {
          toast.error(
            error instanceof Error ? error.message : "Error desconocido"
          );
        },
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join("_").toString();
          fieldErrors[path] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error((error as Error).message);
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    void handleSubmit(e);
  };

  return (
    <div className="max-w-xl mx-auto my-10 mb-15">
      <h2 className="text-2xl mb-4">Crear Nueva Película</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.titulo && (
            <p className="text-red-600 text-sm">{errors.titulo}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Director
          </label>
          <input
            type="text"
            name="director"
            value={formData.director}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.director && (
            <p className="text-red-600 text-sm">{errors.director}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Fecha de Estreno
          </label>
          <input
            type="date"
            name="fechaEstreno"
            value={formData.fechaEstreno}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.fechaEstreno && (
            <p className="text-red-600 text-sm">{errors.fechaEstreno}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Género
          </label>
          <input
            type="text"
            name="genero"
            value={formData.genero}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.genero && (
            <p className="text-red-600 text-sm">{errors.genero}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Clasificación
          </label>
          <input
            type="text"
            name="clasificacion"
            value={formData.clasificacion}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.clasificacion && (
            <p className="text-red-600 text-sm">{errors.clasificacion}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Estatus
          </label>
          <input
            type="text"
            name="estatus"
            value={formData.estatus}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.estatus && (
            <p className="text-red-600 text-sm">{errors.estatus}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Actores
          </label>
          <input
            type="text"
            name="actores"
            value={formData.actores}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.detalle_actores && (
            <p className="text-red-600 text-sm">{errors.detalle_actores}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Sinopsis
          </label>
          <textarea
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.detalle_sinopsis && (
            <p className="text-red-600 text-sm">{errors.detalle_sinopsis}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Trailer
          </label>
          <input
            type="url"
            name="trailer"
            value={formData.trailer}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
          {errors.detalle_trailer && (
            <p className="text-red-600 text-sm">{errors.detalle_trailer}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Imagen
          </label>
          <input
            type="file"
            name="imagen"
            onChange={handleFileChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <Link to={"/"}>
            <button
              type="button"
              className="mr-2 border border-rose-900 text-rose-900 px-4 py-2 rounded-md hover:bg-red-800 hover:text-white active:bg-red-950"
            >
              Cancelar
            </button>
          </Link>
          <button
            type="submit"
            className="bg-amber-500 text-stone-50 px-4 py-2 rounded-md hover:bg-amber-600 active:bg-amber-700"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
