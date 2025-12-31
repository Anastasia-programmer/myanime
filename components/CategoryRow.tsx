'use client';

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
    animeList: any[];
}

export default function CategoryRow({ title, animeList }: CategoryRowProps) {
    // Determine if we have enough items to scroll
    const canScroll = animeList.length > 5; // simplified check, carousel handles bounds

    return (
        <div className="mb-8 space-y-4">
            <div className="flex items-center justify-between px-4 sm:px-0">
                <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">{title}</h3>
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
