<script setup lang="ts">

    /*
    * Obtención del ID del anime desde la ruta
    */
    const route = useRoute();
    const id = route.params.id as string;

    /*
    * Uso de tus composables personalizados
    */
    const { data: animeData, pending, error } = await useFetch(`/api/anime/${id}`);

    /*
    * Obtención de la lista de episodios del anime
    */
    const { data: episodesData, pending: episodesPending } = await useAsyncData(
        `episodes-${id}`, 
        () => $fetch(`/api/anime/${id}/episodes`)
    )

    /*
    * Accede a los datos del anime
    */
    const anime = computed(() => animeData.value?.data);

    /*
    * Lista de episodios
    */
    const episodes = computed(() => episodesData.value?.data ?? []);

</script>

<template>
    <UContainer class="py-8">
        <UButton
            to="/"
            icon="i-heroicons-arrow-left"
            variant="ghost"
            color="gray"
            class="mb-6"
        >
            Volver al catálogo
        </UButton>

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
                    class="rounded-xl shadow-lg w-full"
                />
                <UCard>
                    <div class="text-sm space-y-2">
                        <p><strong>Puntuación:</strong> ★ {{ anime.score || 'N/A' }}</p>
                        <p><strong>Episodios:</strong> {{ anime.episodes || 'En emisión' }}</p>
                        <p><strong>Tipo:</strong> {{ anime.type }}</p>
                    </div>
                </UCard>
            </div>

            <div class="md:col-span-2 space-y-8">
                <section>
                    <h1 class="text-4xl font-black mb-4">{{ anime.title }}</h1>
                    <div class="flex gap-2 mb-4">
                        <UBadge v-for="g in anime.genres" :key="g.mal_id" variant="subtle">
                            {{ g.name }}
                        </UBadge>
                    </div>
                    <p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                        {{ anime.synopsis }}
                    </p>
                </section>

                <UDivider />

                <section>
                    <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
                        <UIcon name="i-heroicons-play-circle" />
                        Episodios disponibles
                    </h2>
                    
                    <div v-if="episodesPending">
                        <USkeleton class="h-10 w-full mb-2" v-for="i in 5" :key="i" />
                    </div>
                    
                    <EpisodeList v-else :episodes="episodes" />
                </section>
            </div>
        </div>
    </UContainer>
</template>