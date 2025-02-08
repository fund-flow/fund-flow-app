import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function PortfolioSkeleton() {
  // Create an array of 6 items for skeleton rows
  const skeletonRows = Array(6).fill(null);

  return (
    <div className="space-y-8">
      {/* Portfolio Value Skeleton */}
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-32" />
      </div>

      {/* Heatmap Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skeletonRows.map((_, index) => (
          <div
            key={index}
            className="rounded-lg border p-4 space-y-3"
          >
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-4 w-24" />
            <div className="mt-4">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-12 mt-2" />
              <Skeleton className="h-4 w-16 mt-2" />
            </div>
          </div>
        ))}
      </div>

      {/* Token Breakdown Table Skeleton */}
      <div className="mt-12">
        <Skeleton className="h-8 w-48 mb-6" />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="text-right">
                  <Skeleton className="h-4 w-24 ml-auto" />
                </TableHead>
                <TableHead className="text-right">
                  <Skeleton className="h-4 w-20 ml-auto" />
                </TableHead>
                <TableHead className="text-right">
                  <Skeleton className="h-4 w-24 ml-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skeletonRows.map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex flex-col gap-2">
                      <Skeleton className="h-5 w-24" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-20 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-16 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-24 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
