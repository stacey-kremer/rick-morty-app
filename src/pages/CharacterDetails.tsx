// Компонент страницы с деталями персонажа
// Загружает данные по id из URL, показывает Loader пока идет запрос
// Отображает картинку, имя, статус, вид, пол, происхождение и локацию

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  origin: { name: string };
  location: { name: string };
};

const CharacterDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        const data = await res.json();
        setCharacter(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCharacter();
  }, [id]);

  if (loading) return <Loader />;

  if (!character)
    return (
      <p className="text-center mt-10 text-green-400 font-mono">
        Character not found
      </p>
    );

  const statusColor =
    character.status === "Alive"
      ? "bg-green-500"
      : character.status === "Dead"
      ? "bg-red-500"
      : "bg-gray-500";

  return (
    <div className="min-h-screen bg-black text-green-400 font-pressstart p-6 flex flex-col items-center">
      <div className="max-w-md w-full bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-green-700 p-6 flex flex-col items-center">
        <img
          src={character.image}
          alt={character.name}
          className="w-full h-48 sm:h-60 object-cover rounded mb-4"
        />

        <div className="w-full flex flex-col items-start">
          <h2 className="text-2xl font-bold mb-2 text-green-400 break-words">
            {character.name}
          </h2>

          <span
            className={`inline-block px-2 py-1 text-white text-sm rounded ${statusColor} mb-4`}
          >
            {character.status}
          </span>

          <p className="mb-1">
            <span className="font-semibold">Species:</span> {character.species}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Gender:</span> {character.gender}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Origin:</span>{" "}
            {character.origin.name}
          </p>
          <p className="mb-1">
            <span className="font-semibold">Location:</span>{" "}
            {character.location.name}
          </p>
        </div>

        <Link
          to="/"
          className="mt-6 text-green-400 hover:text-lime-400 underline font-pressstart self-start"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CharacterDetails;
