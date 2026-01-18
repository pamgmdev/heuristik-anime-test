<script setup lang="ts">

    const {
        animes,
        pending,
        error,
        nextPage,
        pagination,
    } = useAnimeList();

    //  Imagen destacada
    const animeCover = "https://i.pinimg.com/originals/46/22/3c/46223c9314273c84276f499a705b4eb4.gif" 
</script>

<template>
    <div class="px-4 space-y-12 pb-20">
        <section class="relative h-[450px] md:h-[600px] rounded-[2rem] overflow-hidden flex items-end">
            <NuxtImg 
                :src="animeCover" 
                alt="Featured Anime"
                class="absolute inset-0 w-full h-full object-cover"
                placeholder
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0b0f15] via-[#0b0f15]/40 to-transparent"></div>
            
            <div class="relative p-6 md:p-16 space-y-6 max-w-3xl">
                <UBadge color="primary" variant="subtle" class="rounded-md uppercase font-bold text-[11px] px-3 py-1">
                    Todas las temporadas
                </UBadge>
                
                <h1 class="text-6xl md:text-8xl font-black uppercase italic leading-[0.8] tracking-tighter">
                    Attack on <br/> <span class="text-[#00e5ff]">Titan</span>
                </h1>
                
                <p class="text-gray-200 text-sm md:text-lg line-clamp-3 max-w-xl font-medium">
                    Un mundo donde la humanidad está al borde de la supervivencia, amenazada por unos seres humanoides gigantes llamados titanes...
                </p>
                
                <div class="flex gap-4 pt-2">
                    <UButton 
                        icon="i-heroicons-play-solid" 
                        size="xl" 
                        class="bg-[#00e5ff] text-black font-extrabold px-10 rounded-2xl hover:bg-[#00e5ff]/80 transition-all scale-105"
                    >
                        Ver ahora
                    </UButton>
                    <UButton 
                        icon="i-heroicons-plus" 
                        size="xl" 
                        color="gray" 
                        variant="soft" 
                        class="rounded-2xl px-5 bg-white/10 backdrop-blur-md" 
                    />
                </div>
            </div>
        </section>

        <section>
            <div class="flex items-center justify-between mb-8">
                <div class="flex items-center gap-3">
                    <div class="w-1.5 h-8 bg-[#00e5ff] rounded-full"></div>
                    <h2 class="text-2xl md:text-3xl font-black tracking-tight">Lo más visto</h2>
                </div>
                <div class="flex gap-2">
                    <UButton icon="i-heroicons-chevron-left" variant="soft" color="gray" class="rounded-full bg-[#161b22]" />
                    <UButton icon="i-heroicons-chevron-right" variant="soft" color="gray" class="rounded-full bg-[#161b22]" />
                </div>
            </div>
        
            <div v-if="pending && !animes.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                <USkeleton v-for="i in 6" :key="i" class="aspect-[2/3] rounded-2xl w-full" />
            </div>

            <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
                <AnimeCard v-for="anime in animes" :key="anime.mal_id" :anime="anime" />
            </div>
        </section>

        <div v-if="pagination?.has_next_page" class="flex flex-col items-center py-16 gap-5">
            <BaseLoader v-if="pending" />
            
            <template v-else>
                <button 
                    @click="nextPage"
                    class="group relative flex items-center justify-center transition-transform active:scale-95"
                >
                    <div class="w-14 h-14 border-4 border-gray-800 rounded-full group-hover:border-[#00e5ff]/50 transition-colors"></div>
                    <UIcon 
                        name="i-heroicons-chevron-down" 
                        class="absolute text-[#00e5ff] text-2xl group-hover:translate-y-1 transition-transform" 
                    />
                </button>
                <UButton 
                    label="Ver más" 
                    variant="soft" 
                    class="rounded-2xl px-14 py-3 font-bold bg-[#161b22] text-white hover:bg-[#1f262e] transition-colors"
                    @click="nextPage"
                />
            </template>
        </div>
    </div>
</template>