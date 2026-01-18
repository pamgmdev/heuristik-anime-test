<template>
    <div class="min-h-screen bg-[#0b0f15] text-white font-sans">
        <nav class="sticky top-0 z-50 bg-[#0b0f15]/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-play-circle-solid" class="text-[#00e5ff] w-8 h-8" />
                <span class="text-xl font-black tracking-tighter italic">ANIME<span class="text-[#00e5ff]">Explorer</span></span>
            </div>
            
            <div class="hidden md:flex flex-1 max-w-md mx-8">
                <UInput
                    icon="i-heroicons-magnifying-glass"
                    placeholder="Search for anime, movies..."
                    variant="none"
                    class="w-full bg-[#161b22] rounded-full"
                    :ui="{ icon: { trailing: { pointer: '' } } }"
                />
            </div>

            <div class="flex items-center gap-4">
                <UButton 
                    icon="i-heroicons-bell"
                    variant="ghost"
                    color="gray"
                />
                <UAvatar src="https://avatar.iran.liara.run/public/30" size="sm" />
            </div>
        </nav>

        <main class="pb-20 md:pb-8">
            <slot />
        </main>

        <div class="md:hidden fixed bottom-0 left-0 right-0 bg-[#0b0f15] border-t border-gray-800 px-6 py-3 flex justify-between items-center z-50">
            <UButton to="/" icon="i-heroicons-home-solid" variant="ghost" color="primary" vertical label="Home" truncate />
            <UButton to="/discover" icon="i-heroicons-compass" variant="ghost" color="gray" vertical label="Discover" truncate />
            <UButton to="/list" icon="i-heroicons-bookmark" variant="ghost" color="gray" vertical label="List" truncate />
            <UButton to="/profile" icon="i-heroicons-user" variant="ghost" color="gray" vertical label="Profile" truncate />
        </div>
    </div>
</template>