<script setup lang="ts">
defineProps<{ anime: any }>()
</script>

<template>
    <NuxtLink :to="`/anime/${anime.mal_id}`" class="group block">
        <div class="relative aspect-[2/3] overflow-hidden rounded-[2rem] bg-[#161b22] mb-3">
        <div v-if="anime.score" class="absolute top-3 right-3 z-10">
            <div class="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-1 border border-white/10">
            <UIcon name="i-heroicons-star-solid" class="text-yellow-400 w-3 h-3" />
            <span class="text-[10px] font-bold text-white">{{ anime.score }}</span>
            </div>
        </div>

        <NuxtImg
            :src="anime.images.jpg.large_image_url"
            :alt="anime.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
        />
        
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>

        <div class="px-2">
        <h3 class="font-bold text-sm text-gray-100 truncate group-hover:text-[#00e5ff] transition-colors">
            {{ anime.title }}
        </h3>
        <div class="flex items-center gap-2 text-[11px] text-gray-500 mt-1 font-semibold uppercase tracking-wider">
            <span>{{ anime.type }}</span>
            <span class="w-1 h-1 bg-gray-700 rounded-full"></span>
            <span>{{ anime.status === 'Finished Airing' ? 'Finalizado' : 'Emisión' }}</span>
        </div>
        </div>
    </NuxtLink>
</template>