import AnimeCard from '@/components/AnimeCard';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
interface CategoryRowProps {
    title: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    animeList: any[];
    id?: string;
}

export default function CategoryRow({ title, animeList, id }: CategoryRowProps) {
    return (
        <div id={id} className="scroll-mt-24 mb-8 space-y-4">
            <div className="flex items-center gap-4 px-4 sm:px-0">
                <div className="h-8 w-1.5 rounded-full bg-linear-to-b from-[#FF0080] via-[#7928CA] to-[#0070F3] shadow-[0_0_15px_rgba(255,0,128,0.5)]" />
                <h3 className="text-xl md:text-2xl font-black tracking-tight uppercase italic text-transparent bg-clip-text bg-linear-to-r from-white via-white to-pink-200 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    {title}
                </h3>
            </div>

            <div className="relative w-full px-4 sm:px-0">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {animeList.map((anime) => (
                            <CarouselItem key={anime.id} className="pl-2 md:pl-4 basis-[50%]  md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 ">
                                <div className="h-full">
                                    <AnimeCard anime={anime} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex left-0 -translate-x-1/2 bg-black/50 border-white/20 hover:bg-black/80 text-white" />
                    <CarouselNext className="hidden md:flex right-0 translate-x-1/2 bg-black/50 border-white/20 hover:bg-black/80 text-white" />
                </Carousel>
            </div>
        </div>
    );
}
