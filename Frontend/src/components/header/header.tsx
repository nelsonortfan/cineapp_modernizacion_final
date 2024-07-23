import { ContentContainer } from "../contentContainer";

export const Header = () => {
  return (
    <ContentContainer>
      <div className="py-4 flex items-baseline ">
        <div className="text-slate-100 text-xl font-semibold mr-8">
          <a href="/">
            <span>Cineapp</span>
          </a>
        </div>
        <nav>
          <button className="capitalize mr-8 text-gray-300 hover:text-slate-200 active:text-slate-100">
            <a href="/">Películas</a>
          </button>
          <button disabled className="capitalize mr-8 text-gray-500 ">
            horarios
          </button>
          <button disabled className="capitalize mr-8 text-gray-500 ">
            banner
          </button>
          <button disabled className="capitalize mr-8 text-gray-500 ">
            Acerca
          </button>
          <button disabled className="capitalize text-gray-500">
            login
          </button>
        </nav>
      </div>
    </ContentContainer>
  );
};
