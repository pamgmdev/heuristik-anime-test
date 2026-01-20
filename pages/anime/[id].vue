<script setup lang="ts">
/**
 * Obtención del ID del anime desde la ruta
 */
const route = useRoute();
const id = route.params.id as string;

/**
 * Petición de los detalles principales del anime
 */
const { data: animeData, pending, error } = await useFetch(`/api/anime/${id}`);

/**
 * Petición de la lista de episodios (usamos useAsyncData para mayor control)
 */
const { data: episodesData, pending: episodesPending } = await useAsyncData(
    `episodes-${id}`, 
    () => $fetch(`/api/anime/${id}/episodes`)
);

/**
 * Datos del anime procesados
 */
const anime = computed(() =>
{
    return animeData.value?.data
});

/**
 * Lista de episodios procesada
 * Extraemos el array 'data' de la respuesta de la API
 */
const episodes = computed(() => {
    return episodesData.value?.data;
});
</script>

<template>
    <UContainer class="py-8">
        <div class="mb-12">
            <UButton
                to="/"
                icon="i-heroicons-chevron-left"
                variant="ghost"
                color="gray"
                class="mb-6"
            >
                Volver al catálogo
            </UButton>
        </div>

        <div v-if="pending">
            <BaseLoader label="Cargando detalles del anime..." />
        </div>

        <div v-else-if="error">
            <ErrorMessage message="No se pudo cargar la información del anime." />
        </div>

        <div v-else-if="anime" class="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div class="space-y-4">
                <NuxtImg
                    :src="anime.images.jpg.large_image_url"
                    :alt="anime.title"
                    class="rounded-xl shadow-lg w-full border dark:border-gray-800"
                />
                <UCard>
                    <div class="text-sm space-y-2">
                        <p><strong>Puntuación:</strong> ★ {{ anime.score || 'N/A' }}</p>
                        <p><strong>Episodios:</strong> {{ anime.episodes || 'En emisión' }}</p>
                        <p><strong>Tipo:</strong> {{ anime.type }}</p>
                        <p><strong>Estado:</strong> {{ anime.status }}</p>
                    </div>
                </UCard>
            </div>

            <div class="md:col-span-2 space-y-8">
                <section>
                    <h1 class="text-4xl font-black mb-4">{{ anime.title }}</h1>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <UBadge v-for="g in anime.genres" :key="g.mal_id" variant="subtle">
                            {{ g.name }}
                        </UBadge>
                    </div>
                    <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {{ anime.synopsis }}
                    </p>
                </section>

                <section v-if="episodes.length > 0">
                    <AnimeEpisodeList :episodes="episodes" :key="id" />
                </section>
                <div v-else-if="!episodesPending">
                    <p>No se encontraron episodios.</p>
                </div>
            </div>
        </div>
    </UContainer>
</template>