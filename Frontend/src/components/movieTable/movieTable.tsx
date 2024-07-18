import movieList from "../../data/jsonListaPeliculas.json";

export const MovieTable = () => {
  return (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2 text-left">Título</th>
            <th className="px-4 py-2 text-left">Género</th>
            <th className="px-4 py-2 text-left">Clasificación</th>
            <th className="px-4 py-2 text-left">Duración</th>
            <th className="px-4 py-2 text-left">Fecha Estreno</th>
            <th className="px-4 py-2 text-left">Estatus</th>
          </tr>
        </thead>
        <tbody>
          {movieList.map((movie) => (
            <tr key={movie.id} className="border-b border-gray-200">
              <td className="px-4 py-2 border-r">{movie.titulo}</td>
              <td className="px-4 py-2 border-r">{movie.genero}</td>
              <td className="px-4 py-2 border-r">{movie.clasificacion}</td>
              <td className="px-4 py-2 border-r">{movie.duracion} min.</td>
              <td className="px-4 py-2 border-r">{movie.fechaEstreno}</td>
              <td className="px-4 py-2 border-r bg-green-700 text-slate-50">
                {movie.estatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
