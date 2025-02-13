import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AssetType } from "@/types/rwa";

interface AssetFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function AssetFilters({ onFilterChange }: AssetFiltersProps) {
  return (
    <div className="p-4 border rounded-lg space-y-4 bg-card">
      <h3 className="font-semibold">Filters</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Asset Type</label>
          <Select onValueChange={(value) => onFilterChange({ type: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="real_estate">Real Estate</SelectItem>
              <SelectItem value="private_equity">Private Equity</SelectItem>
              <SelectItem value="fund">Investment Funds</SelectItem>
              <SelectItem value="debt">Fixed Income & Bonds</SelectItem>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="commodities">Commodities</SelectItem>
              <SelectItem value="art">Art & Collectibles</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <Input
              type="number"
              placeholder="Min"
              onChange={(e) => onFilterChange({ minPrice: e.target.value })}
            />
            <Input
              type="number"
              placeholder="Max"
              onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select onValueChange={(value) => onFilterChange({ status: value })}>
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="tokenized">Tokenized</SelectItem>
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
