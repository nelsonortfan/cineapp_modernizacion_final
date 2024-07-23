import { Link } from "react-router-dom";
import { ContentContainer, MovieTable } from "./components";

function App() {
  return (
    <ContentContainer>
      <div className="flex justify-between mt-8">
        <h2 className="text-2xl">Listado de Películas</h2>
        <Link to={"/createMovie"}>
          <button
            type="button"
            className="bg-amber-500 text-stone-50 px-4 py-2 rounded-md hover:bg-amber-600 active:bg-amber-700"
          >
            Nueva
          </button>
        </Link>
      </div>
      <MovieTable />
    </ContentContainer>
  );
}

export default App;
