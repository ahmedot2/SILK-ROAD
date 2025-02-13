import { GridPattern } from "@/components/ui/grid-pattern";

export function BackgroundGrid() {
  return (
    <GridPattern
      width={32}
      height={32}
      className="absolute inset-0 h-full w-full [mask-image:radial-gradient(900px_circle_at_center,white,transparent)] opacity-50"
      squares={[
        [1, 1],
        [1, 3],
        [3, 1],
        [3, 3],
        [4, 4],
        [5, 2],
        [5, 5],
        [6, 6],
        [7, 1],
        [8, 4],
        [8, 8],
      ]}
    />
  );
}
