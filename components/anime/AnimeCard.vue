<script setup lang="ts">
    defineProps<{ anime: any }>();
</script>

<template>
    <div class="group cursor-pointer">
        <div class="relative aspect-[2/3] overflow-hidden rounded-2xl mb-2">
            <div class="absolute top-2 right-2 z-10">
                <UButton 
                    icon="i-heroicons-bookmark" 
                    size="xs" 
                    class="bg-black/40 backdrop-blur-md hover:bg-[#00e5ff] transition-colors" 
                    :ui="{ rounded: 'rounded-lg' }"
                />
            </div>
            
            <NuxtImg
                :src="anime.images.jpg.large_image_url"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
        </div>
        
        <h3 class="font-bold text-sm truncate">{{ anime.title }}</h3>
        <div class="flex items-center gap-2 text-xs text-gray-500 font-medium">
            <span>{{ anime.type }}</span>
            <span class="w-1 h-1 bg-gray-700 rounded-full"></span>
            <span>{{ anime.year || '2024' }}</span>
        </div>
    </div>
</template>