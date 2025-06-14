import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48" />
          <div className="flex items-center space-x-2">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
        </div>

        {/* 検索バー */}
        <div className="flex space-x-2">
          <Skeleton className="h-10 flex-grow" />
          <Skeleton className="h-10 w-16" />
          <Skeleton className="h-10 w-28" />
        </div>

        {/* 検索結果 */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <Skeleton className="h-5 w-32" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>

          <div className="space-y-4">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))}
          </div>
        </div>

        {/* 人気の検索キーワード */}
        <div className="mt-8">
          <Skeleton className="h-7 w-48 mb-3" />
          <div className="flex flex-wrap gap-2">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-8 w-24" />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
