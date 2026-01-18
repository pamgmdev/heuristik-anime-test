<script setup lang="ts">


/*
* Definimos la interfaz para un episodio
*/
    interface Episode {
        mal_id: number;
        title: string;
        aired: string;
        score: number | null;
    };

/*
* Definimos las props que recibe el componente
*/
    const props = defineProps<{
        episodes: Episode[]
    }>();

/*
* Definimos las columnas para la tabla de episodios
*/
    const columns = [
        { key: 'mal_id', label: '#' },
        { key: 'title', label: 'Título' },
        { key: 'aired', label: 'Fecha de estreno' }
    ];

</script>

<template>
    <div class="episode-list-container">
        <UTable 
            :columns="columns" 
            :rows="props.episodes"
            :ui="{ th: { base: 'bg-gray-50 dark:bg-gray-800/50' } }"
        >
            <template #aired-data="{ row }">
                <span class="text-gray-500 italic">
                    {{ row.aired ? new Date(row.aired).toLocaleDateString() : 'Sin datos' }}
                </span>
            </template>

            <template #mal_id-data="{ row }">
                <span class="font-mono text-primary-500 font-bold">{{ row.mal_id }}</span>
            </template>
        </UTable>

        <div v-if="episodes.length === 0" class="text-center py-10 text-gray-400">
            <UIcon name="i-heroicons-information-circle" class="w-8 h-8 mx-auto mb-2" />
            <p>No hay episodios registrados para este anime.</p>
        </div>
    </div>
</template>