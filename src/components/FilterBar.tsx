"use client";

type FilterBarProps = {
  search: string;
  onSearch: (v: string) => void;
  categories: string[];
  category: string;
  onCategory: (v: string) => void;
  priceMin: string;
  priceMax: string;
  onPriceMin: (v: string) => void;
  onPriceMax: (v: string) => void;
  conditions?: string[];
  condition?: string;
  onCondition?: (v: string) => void;
  showAvailableOnly: boolean;
  onAvailableOnly: (v: boolean) => void;
};

export function FilterBar({
  search,
  onSearch,
  categories,
  category,
  onCategory,
  priceMin,
  priceMax,
  onPriceMin,
  onPriceMax,
  conditions,
  condition,
  onCondition,
  showAvailableOnly,
  onAvailableOnly,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <label className="field grow">
        <span>Search</span>
        <input
          type="search"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search by name or keyword"
        />
      </label>
      <label className="field">
        <span>Category</span>
        <select value={category} onChange={(e) => onCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>
      {conditions && onCondition && (
        <label className="field">
          <span>Condition</span>
          <select
            value={condition ?? ""}
            onChange={(e) => onCondition(e.target.value)}
          >
            <option value="">All</option>
            {conditions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      )}
      <label className="field narrow">
        <span>Min $</span>
        <input
          type="number"
          min={0}
          value={priceMin}
          onChange={(e) => onPriceMin(e.target.value)}
          placeholder="0"
        />
      </label>
      <label className="field narrow">
        <span>Max $</span>
        <input
          type="number"
          min={0}
          value={priceMax}
          onChange={(e) => onPriceMax(e.target.value)}
          placeholder="500"
        />
      </label>
      <label className="check-field">
        <input
          type="checkbox"
          checked={showAvailableOnly}
          onChange={(e) => onAvailableOnly(e.target.checked)}
        />
        <span>In stock only</span>
      </label>
    </div>
  );
}
