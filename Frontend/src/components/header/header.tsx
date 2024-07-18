export const Header = () => {
  return (
    <div className="py-4 flex items-baseline ">
      <div className="text-slate-100 text-xl font-semibold mr-5">
        <a href="#">
          <span>Cineapp</span>
        </a>
      </div>
      <div className="text-slate-300 hover:text-slate-200 active:text-slate-100">
        <button>Películas</button>
      </div>
    </div>
  );
};
