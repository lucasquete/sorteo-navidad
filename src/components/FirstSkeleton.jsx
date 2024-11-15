import { Skeleton } from "@nextui-org/skeleton";

export default function FirstSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 items-center justify-center">
        <FirstSkeletons/>
        <FirstSkeletons/>
        <FirstSkeletons/>
        <FirstSkeletons/>
        <FirstSkeletons/>
        <FirstSkeletons/>
        <FirstSkeletons/>
    </div>
  );
}

function FirstSkeletons() {
    return (
        <div className="flex gap-3 items-center justify-center bg-[#202020] shadow-sm p-3 rounded-2xl">
            <Skeleton className="h-5 w-[170px] rounded-lg"/>
        </div>
    )
}