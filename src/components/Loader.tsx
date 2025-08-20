// Компонент спиннера для отображения процесса загрузки

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="w-16 h-16 border-4 border-lime-400 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
