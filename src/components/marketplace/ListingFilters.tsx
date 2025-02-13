import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ListingCategory, ListingFilters } from "@/types/marketplace";

interface ListingFiltersProps {
  filters: ListingFilters;
  onFilterChange: (filters: ListingFilters) => void;
}

export function ListingFilters({
  filters,
  onFilterChange,
}: ListingFiltersProps) {
  const categories: { label: string; value: ListingCategory }[] = [
    { label: "Real Estate", value: "real_estate" },
    { label: "Vehicles", value: "vehicles" },
    { label: "Electronics", value: "electronics" },
    { label: "Furniture", value: "furniture" },
    { label: "Fashion", value: "fashion" },
    { label: "Services", value: "services" },
    { label: "Jobs", value: "jobs" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className="p-4 border rounded-lg space-y-4 bg-card sticky top-4">
      <h3 className="font-semibold">Filters</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Category</label>
          <Select
            value={filters.category}
            onValueChange={(value: ListingCategory) =>
              onFilterChange({ ...filters, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={undefined}>All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={filters.minPrice || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  minPrice: Number(e.target.value) || undefined,
                })
              }
            />
            <Input
              type="number"
              placeholder="Max"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxPrice: Number(e.target.value) || undefined,
                })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Location</label>
          <Select
            value={filters.location}
            onValueChange={(value) =>
              onFilterChange({ ...filters, location: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={undefined}>All Locations</SelectItem>
              <SelectItem value="dubai">Dubai</SelectItem>
              <SelectItem value="abu_dhabi">Abu Dhabi</SelectItem>
              <SelectItem value="sharjah">Sharjah</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Payment Methods</label>
          <div className="flex flex-wrap gap-2">
            {["slk", "crypto", "fiat"].map((method) => (
              <Button
                key={method}
                variant={
                  filters.paymentMethods?.includes(method as any)
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => {
                  const currentMethods = filters.paymentMethods || [];
                  const newMethods = currentMethods.includes(method as any)
                    ? currentMethods.filter((m) => m !== method)
                    : [...currentMethods, method];
                  onFilterChange({
                    ...filters,
                    paymentMethods: newMethods as any[],
                  });
                }}
              >
                {method.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Sort By</label>
          <Select
            value={filters.sortBy}
            onValueChange={(value) =>
              onFilterChange({ ...filters, sortBy: value as any })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Newest First</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          className="w-full"
          variant="outline"
          onClick={() => onFilterChange({})}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
