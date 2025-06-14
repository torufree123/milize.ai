import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="flex-1 flex">
        <div className="w-1/2 border-r p-4 space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
        <div className="w-1/2 bg-gray-50 flex items-center justify-center">
          <Skeleton className="h-96 w-3/4" />
        </div>
      </div>
    </div>
  )
}
