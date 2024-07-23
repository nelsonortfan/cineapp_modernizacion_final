import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z, ZodError } from "zod";
import { toast } from "react-toastify";

const movieSchema = z.object({
  titulo: z.string().min(3, "El título es obligatorio"),
  director: z.string().min(3, "El director es obligatorio"),
  fechaEstreno: z
    .date({ required_error: "la fecha de estreno es obligatoria" })
    .min(new Date(1920, 12, 28), {
      message: "La fecha de estreno debe ser mayor a 1920-12-28",
    }),
  genero: z.string().min(3, "El género es obligatorio"),
  clasificacion: z
    .string()
    .min(1, "La clasificación es obligatoria")
    .max(1, "La clasificación debe ser de un solo caracter"),
  estatus: z.string().min(1, "El estatus es obligatorio"),
});

export const NewMoviePage = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    director: "",
    fechaEstreno: "",
    genero: "",
    clasificacion: "",
    estatus: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        fechaEstreno: new Date(formData.fechaEstreno),
      };
      movieSchema.parse(data);

      // Simulating save to database
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("¡Película creada exitosamente!");
      navigate("/");
    } catch (error) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        toast.error("Error al guardar en la base de datos");
      }
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    void handleSubmit(e);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
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
