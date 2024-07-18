import { ContentContainer, Header, MovieTable } from "./components";

function App() {
  return (
    <>
      <div className="bg-zinc-800 w-full">
        <ContentContainer>
          <Header />
        </ContentContainer>
      </div>
      <ContentContainer>
        <div className="flex justify-between mt-8">
          <h2 className="text-2xl">Listado de Películas</h2>
          <button
            type="button"
            className="bg-amber-500 text-stone-50 px-3 py-1 rounded-md hover:bg-amber-600 active:bg-amber-700"
          >
            Nueva
          </button>
        </div>
        <MovieTable />
      </ContentContainer>
    </>
  );
}

export default App;
