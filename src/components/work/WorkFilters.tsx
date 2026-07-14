import { filterCategories } from "../../data/projects";

interface WorkFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function WorkFilters({ activeFilter, onFilterChange }: WorkFiltersProps) {
  return (
    <ul
      className="list-none p-0 m-0 flex flex-wrap gap-2 mb-10"
      role="list"
      aria-label="Filter case studies by category"
    >
      {filterCategories.map((cat) => (
        <li key={cat}>
          <button
            className={[
              "font-sans text-sm font-medium px-4 py-2 rounded-full border cursor-pointer transition-colors duration-150 min-h-[36px]",
              activeFilter === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-muted-foreground border-border hover:bg-card hover:text-foreground hover:border-muted-foreground",
            ].join(" ")}
            aria-pressed={activeFilter === cat}
            onClick={() => onFilterChange(cat)}
          >
            {cat}
          </button>
        </li>
      ))}
    </ul>
  );
}
