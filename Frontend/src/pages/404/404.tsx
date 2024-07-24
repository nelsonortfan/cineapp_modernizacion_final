import { Link, useRouteError } from "react-router-dom";
import { RouteError } from "../../interfaces";


export const NotFoundPage = () => {
  const error = useRouteError();
  console.error(error);

  const routeError = error as RouteError;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-gray-900">Oops!</h1>
          <p className="mt-2 text-gray-600">
            Lo sentimos, no pudimos encontrar la página que buscas.
          </p>
          <p className="mt-2 text-gray-500">
            <i>{`Error ${routeError.status}: ${routeError.statusText}`}</i>
          </p>
        </div>
        <div className="flex justify-center mt-4">
          <Link to={"/"} className="text-indigo-600 hover:text-indigo-500">
            Volver a la pagina principal
          </Link>
        </div>
      </div>
    </div>
  );
};
