<script setup lang="ts">

/*
* Componente principal de la página de inicio que muestra una lista de animes.
*/
const
{
    animes,
    pending,
    error,
    nextPage,
    pagination,
    refresh
} = useAnimeList();

</script>

<template>
    <div class="space-y-8">
        <header class="flex flex-col gap-2">
            <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                Explorar <span class="text-primary-500">Anime</span>
            </h1>
            <p class="text-gray-500 dark:text-gray-400">
                Listado actualizado desde la API de Jikan.
            </p>
        </header>

        <UAlert
            v-if="error"
            icon="i-heroicons-exclamation-triangle"
            color="red"
            variant="soft"
            title="Error de conexión"
            description="No se pudo obtener la lista de animes. Por favor, inténtalo de nuevo."
            :actions="[{ label: 'Reintentar', onClick: () => refresh() }]"
        />

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            <template v-if="pending && !animes.length">
                <UCard v-for="n in 12" :key="n" class="overflow-hidden">
                <USkeleton class="h-64 w-full" />
                <div class="p-4 space-y-2">
                    <USkeleton class="h-4 w-full" />
                    <USkeleton class="h-4 w-2/3" />
                </div>
                </UCard>
            </template>

            <UCard 
                v-for="anime in animes" 
                :key="anime.mal_id"
                class="group flex flex-col h-full hover:ring-2 hover:ring-primary-500 transition-all"
                :ui="{ body: { padding: 'p-3' }, header: { padding: 'p-0' } }"
            >
                <template #header>
                    <NuxtLink :to="`/anime/${anime.mal_id}`" class="block relative aspect-[3/4] overflow-hidden bg-gray-100">
                        <NuxtImg
                            :src="anime.images.jpg.image_url"
                            :alt="anime.title"
                            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            placeholder
                            loading="lazy"
                        />
                    </NuxtLink>
                </template>

                <NuxtLink :to="`/anime/${anime.mal_id}`" class="flex-grow">
                    <h3 class="font-bold text-sm line-clamp-2 group-hover:text-primary-500 transition-colors leading-tight">
                        {{ anime.title }}
                    </h3>
                </NuxtLink>

                <template #footer>
                    <div class="flex items-center justify-between text-[10px] text-gray-500 font-bold uppercase">
                        <span>{{ anime.type }}</span>
                        <UBadge v-if="anime.score" color="yellow" variant="soft" size="xs">
                            ⭐ {{ anime.score }}
                        </UBadge>
                    </div>
                </template>
            </UCard>
        </div>

        <div v-if="pagination?.has_next_page" class="flex justify-center py-10">
            <UButton
                :loading="pending"
                label="Cargar más contenido"
                icon="i-heroicons-arrow-path"
                size="lg"
                @click="nextPage"
            />
        </div>
    </div>
</template>