import { Link } from "react-router-dom";

type CharacterCardProps = {
  id: number;
  name: string;
  image: string;
  status: string;
  className?: string;
};

const CharacterCard = ({
  id,
  name,
  image,
  status,
  className,
}: CharacterCardProps) => {
  // Цвет статуса: Alive - зелёный, Dead - красный, неизвестно - серый
  const statusColor =
    status === "Alive"
      ? "bg-green-500"
      : status === "Dead"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <Link to={`/character/${id}`} className="block w-full">
      <div
        className={` bg-gray-900 rounded-lg shadow-lg overflow-hidden max-w-xs h-92 mx-auto border border-green-700 
    transition-transform duration-300 hover:scale-105
    hover:shadow-[0_0_20px_#00ff00] ${className}`}
      >
        {/* Картинка персонажа */}
        <div className="p-4">
          <img
            src={image}
            alt={name}
            className="w-full h-48 object-cover rounded"
          />
        </div>

        {/* Контент: имя сверху, статус снизу */}
        <div className="p-4 flex flex-col justify-between flex-1">
          <h2 className="text-xl font-bold text-green-400 mb-2">{name}</h2>
          <span
            className={`inline-block px-2 py-1 text-white text-sm rounded self-start ${statusColor}`}
          >
            {status}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
