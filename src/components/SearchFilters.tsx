// Компонент фильтров поиска персонажей

import { type ChangeEvent } from "react";

type SearchFiltersProps = {
  searchQuery: string;
  statusFilter: string;
  speciesFilter: string;
  episodeQuery: string;
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSpeciesChange: (value: string) => void;
  onEpisodeChange: (value: string) => void;
};

const SearchFilters = ({
  searchQuery,
  statusFilter,
  speciesFilter,
  episodeQuery,
  onSearch,
  onStatusChange,
  onSpeciesChange,
  onEpisodeChange,
}: SearchFiltersProps) => {
  const handleInputChange =
    (setter: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  const handleSelectChange =
    (setter: (v: string) => void) => (e: ChangeEvent<HTMLSelectElement>) => {
      setter(e.target.value);
    };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto">
      <div className="flex flex-col">
        <label className="text-lime-400 font-semibold mb-1">
          Имя персонажа
        </label>
        <input
          type="text"
          placeholder="Введите имя персонажа"
          value={searchQuery}
          onChange={handleInputChange(onSearch)}
          className="p-2 rounded border border-gray-700 bg-black text-green-300 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-rick-green"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1 flex flex-col">
          <label className="text-lime-400 font-semibold mb-1">Жив?</label>
          <select
            value={statusFilter}
            onChange={handleSelectChange(onStatusChange)}
            className="p-2 rounded border border-gray-700 bg-black text-green-300 focus:outline-none focus:ring-2 focus:ring-rick-green"
          >
            <option value="">Все</option>
            <option value="Alive">Жив</option>
            <option value="Dead">Мёртв</option>
            <option value="unknown">Неизвестно</option>
          </select>
        </div>

        <div className="flex-1 flex flex-col">
          <label className="text-lime-400 font-semibold mb-1">Раса</label>
          <select
            value={speciesFilter}
            onChange={handleSelectChange(onSpeciesChange)}
            className="p-2 rounded border border-gray-700 bg-black text-green-300 focus:outline-none focus:ring-2 focus:ring-rick-green"
          >
            <option value="">Все</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            <option value="Humanoid">Humanoid</option>
            <option value="unknown">Unknown</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col">
        <label className="text-lime-400 font-semibold mb-1">Эпизод</label>
        <input
          type="text"
          placeholder="Введите номер эпизода"
          value={episodeQuery}
          onChange={handleInputChange(onEpisodeChange)}
          className="p-2 rounded border border-gray-700 bg-black text-green-300 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-rick-green"
        />
      </div>
    </div>
  );
};

export default SearchFilters;
