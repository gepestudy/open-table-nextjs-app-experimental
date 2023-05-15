import Header from "./components/layouts/Header";

const Loading = () => {
  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12].map((num) => (
          <div
            key={num}
            className="animate-pulse bg-slate-200 w-64 h-72 m-3 rounded overflow-hidden border cursor-pointer"
          >
            <div className="h-36 bg-slate-300"></div>
            <div className="space-y-3 p-1 mb-4">
              <div className="h-4 bg-slate-300 rounded"></div>
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-slate-300 rounded col-span-2"></div>
                <div className="h-4 bg-slate-300 rounded col-span-1"></div>
              </div>
            </div>
            <div className="h-4 bg-slate-300 rounded mt-4"></div>
          </div>
        ))}
      </div>
    </main>
  );
};
export default Loading;
