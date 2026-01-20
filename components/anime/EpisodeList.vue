<script setup lang="ts">
interface Episode {
  mal_id: number;
  title: string;
  aired: string;
  score: number | null;
  filler: boolean;
}

const props = defineProps<{
  episodes: Episode[]
}>();

// Función para formatear fecha
const formatDate = (dateStr: string) => {
  if (!dateStr) return 'Sin fecha';
  return new Date(dateStr).toLocaleDateString('es-ES', { 
    day: '2-digit', 
    month: 'short', 
    year: 'numeric' 
  });
};
</script>

<template>
    <div class="overflow-x-auto border dark:border-gray-800 rounded-xl">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
        <thead class="bg-gray-50 dark:bg-gray-800/50">
            <tr>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">#</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nota</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estreno</th>
            </tr>
        </thead>
        <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            <tr v-for="ep in episodes" :key="ep.mal_id" class="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
            <td class="px-4 py-3 whitespace-nowrap text-sm font-mono text-primary-500 font-bold">
                {{ ep.mal_id }}
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm">
                <div class="flex items-center gap-2">
                <span class="font-medium text-gray-900 dark:text-gray-100">{{ ep.title }}</span>
                <UBadge v-if="ep.filler" color="red" variant="subtle" size="xs">Relleno</UBadge>
                </div>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm">
                <span v-if="ep.score" :class="ep.score >= 4.5 ? 'text-orange-500 font-bold' : 'text-gray-400'">
                ★ {{ ep.score }}
                </span>
                <span v-else class="text-gray-500">-</span>
            </td>
            <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                {{ formatDate(ep.aired) }}
            </td>
            </tr>
        </tbody>
        </table>

        <div v-if="episodes.length === 0" class="text-center py-10">
        <UIcon name="i-heroicons-information-circle" class="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p class="text-gray-500">No hay episodios disponibles para este anime.</p>
        </div>
    </div>
</template>