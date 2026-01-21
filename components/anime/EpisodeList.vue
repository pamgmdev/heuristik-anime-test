<script setup lang="ts">

/*
* Definimos la interfaz para un episodio
*/
interface Episode {
    mal_id : number;
    title  : string;
    aired  : string;
    score  : number | null;
    filler : boolean;
}

/*
* Definimos las props que recibe el componente
*/
const props = defineProps<{
    episodes : Episode[]
}>();

// Función para formatear fecha
const formatDate = (dateStr: string) => 
{
    if (!dateStr) 
    {
        return 'Sin fecha';
    }
    return new Date(dateStr).toLocaleDateString('es-ES', { 
        day   : '2-digit', 
        month : 'short', 
        year  : 'numeric' 
    });
};
</script>

<template>
    <div class="space-y-3 p-4 bg-[#070B12] rounded-2xl border border-gray-900 shadow-2xl">
        
        <div v-if="episodes.length > 0" class="grid grid-cols-1 gap-3">
            <div 
                v-for="ep in episodes" 
                :key="ep.mal_id"
                class="group flex items-center gap-4 p-3 rounded-xl border border-transparent bg-[#1e1e1e] hover:bg-[#2a2a2a] hover:border-gray-700 transition-all duration-300"
            >
                <div class="relative flex-shrink-0 w-24 h-14 sm:w-32 sm:h-20 bg-[#252525] rounded-lg overflow-hidden flex items-center justify-center border border-gray-800">
                    <span class="text-xl font-black text-gray-600 group-hover:text-primary-500 transition-colors select-none">
                        {{ ep.mal_id }}
                    </span>
                    
                    <div v-if="ep.filler" class="absolute top-0 right-0">
                        <UBadge color="red" variant="solid" size="xs" class="rounded-none rounded-bl-lg">Filler</UBadge>
                    </div>
                </div>

                <div class="flex-grow min-w-0">
                    <div class="flex items-start justify-between gap-2">
                        <h3 class="font-semibold text-gray-200 truncate group-hover:text-white transition-colors">
                            {{ ep.title }}
                        </h3>
                        
                        <div v-if="ep.score" class="flex items-center gap-1 text-xs font-bold text-orange-400 bg-orange-400/10 px-2 py-1 rounded-md border border-orange-400/20">
                            <UIcon name="i-heroicons-star-solid" class="w-3 h-3" />
                            {{ ep.score }}
                        </div>
                    </div>

                    <div class="mt-2 flex items-center gap-2 text-[11px] uppercase tracking-wider text-gray-500 font-medium">
                        <UIcon name="i-heroicons-calendar-days" class="w-4 h-4 text-gray-600" />
                        {{ formatDate(ep.aired) }}
                    </div>
                </div>

                <div class="opacity-0 group-hover:opacity-100 transition-opacity pr-2">
                <UIcon name="i-heroicons-play-circle-solid" class="w-8 h-8 text-primary-500" />
                </div>
            </div>
        </div>

        <div v-else class="text-center py-16">
            <UIcon name="i-heroicons-face-frown" class="w-12 h-12 mx-auto mb-3 text-gray-700" />
            <p class="text-gray-600">No hay episodios disponibles.</p>
        </div>
    </div>
</template>