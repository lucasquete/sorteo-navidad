// import {Skeleton} from "@nextui-org/react";

import { Skeleton } from "@nextui-org/skeleton";

export default function SecondSkeleton() {
  return (
    <div className="flex flex-wrap gap-3 items-center justify-center">
        <SecondSkeletons/>
        <SecondSkeletons/>
        <SecondSkeletons/>
        <SecondSkeletons/>
        <SecondSkeletons/>
        <SecondSkeletons/>
        <SecondSkeletons/>
        <SecondSkeletons/>
    </div>
  );
}

function SecondSkeletons() {
    return (
        <div className="flex gap-3 items-center justify-center bg-[#202020] shadow-sm p-3 rounded-2xl">
            <Skeleton className="h-6 w-[80px] rounded-lg"/>
        </div>
    )
}