// Главная страница приложения
// Загружает всех персонажей с API и хранит их в state
// Фильтрует персонажей по имени, статусу, расе и эпизоду
// Отображает фильтры, Loader при загрузке и карточки персонажей после фильтрации
// При обновлении страницы фильтры сохраняют своё состояние

import { useEffect, useState } from "react";
import CharacterCard from "../components/CharacterCard";
import Loader from "../components/Loader";
import SearchFilters from "../components/SearchFilters";

type Character = {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  episode: string[];
};

const Home = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  // Инициализация из localStorage
  const [searchQuery, setSearchQuery] = useState(
    () => localStorage.getItem("searchQuery") || ""
  );
  const [statusFilter, setStatusFilter] = useState(
    () => localStorage.getItem("statusFilter") || ""
  );
  const [speciesFilter, setSpeciesFilter] = useState(
    () => localStorage.getItem("speciesFilter") || ""
  );
  const [episodeQuery, setEpisodeQuery] = useState(
    () => localStorage.getItem("episodeQuery") || ""
  );

  const fetchAllCharacters = async () => {
    setLoading(true);
    let allCharacters: Character[] = [];
    let page = 1;

    try {
      while (true) {
        const res = await fetch(
          `https://rickandmortyapi.com/api/character?page=${page}`
        );
        const data = await res.json();
        allCharacters = [...allCharacters, ...data.results];
        if (!data.info.next) break;
        page += 1;
      }
      setCharacters(allCharacters);
      setFilteredCharacters(allCharacters);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCharacters();
  }, []);

  // Сохраняем изменения фильтров в localStorage
  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("statusFilter", statusFilter);
  }, [statusFilter]);

  useEffect(() => {
    localStorage.setItem("speciesFilter", speciesFilter);
  }, [speciesFilter]);

  useEffect(() => {
    localStorage.setItem("episodeQuery", episodeQuery);
  }, [episodeQuery]);

  // Фильтрация
  useEffect(() => {
    let filtered = characters;

    if (searchQuery)
      filtered = filtered.filter((c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    if (statusFilter)
      filtered = filtered.filter(
        (c) => c.status.toLowerCase() === statusFilter.toLowerCase()
      );

    if (speciesFilter) {
      if (speciesFilter === "other") {
        filtered = filtered.filter(
          (c) => !["Human", "Alien", "Humanoid", "unknown"].includes(c.species)
        );
      } else {
        filtered = filtered.filter(
          (c) => c.species.toLowerCase() === speciesFilter.toLowerCase()
        );
      }
    }

    if (episodeQuery)
      filtered = filtered.filter((c) =>
        c.episode.some((ep) =>
          ep.toLowerCase().includes(episodeQuery.toLowerCase())
        )
      );

    setFilteredCharacters(filtered);
  }, [searchQuery, statusFilter, speciesFilter, episodeQuery, characters]);

  return (
    <div className="min-h-screen bg-black text-green-400 font-pressstart p-6">
      <h1 className="text-4xl font-pressstart text-lime-400 text-center mb-8 animate-pulse">
        Вселенная Рика и Морти
      </h1>

      <div className="my-8 max-w-4xl mx-auto">
        <SearchFilters
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          speciesFilter={speciesFilter}
          episodeQuery={episodeQuery}
          onSearch={setSearchQuery}
          onStatusChange={setStatusFilter}
          onSpeciesChange={setSpeciesFilter}
          onEpisodeChange={setEpisodeQuery}
        />
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <h2 className="text-2xl font-semibold mt-12 mb-6 text-center text-lime-400 drop-shadow-md">
            Найдено
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
            {filteredCharacters.map((character) => (
              <CharacterCard
                key={character.id}
                id={character.id}
                name={character.name}
                image={character.image}
                status={character.status}
                className="max-w-xs hover:scale-105 transition-transform duration-200"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
