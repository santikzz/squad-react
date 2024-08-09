import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"

const GroupCardSkeleton = () => {
    return (
        <div className="pb-[100px] lg:h-full flex flex-col p-3 gap-3 lg:grid lg:grid-cols-3 bg-white">
            {[...Array(4)].map((_, i) => (
                <Card className="w-full h-[12rem] shadow-sm border-[0.5px] border-gray-300 bg-white flex flex-col rounded-xl" key={i}>
                    <div className="flex flex-row items-center gap-2 p-3 bg-gray-100 rounded-t-xl">
                        <div>
                            <Skeleton className="h-14 w-14 rounded-full bg-white" />
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <Skeleton className="h-4 w-[250px] bg-white" />
                            <Skeleton className="h-4 w-[200px] bg-white" />
                        </div>
                    </div>
                    <div className="p-3">
                        <div className="flex flex-col gap-3">
                            <Skeleton className="h-4 w-[250px] bg-gray-100" />
                            <Skeleton className="h-14 w-[350px] bg-gray-100" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default GroupCardSkeleton;