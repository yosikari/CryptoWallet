<script>
import AppHeader from '@/cmps/app-header.vue'
export default {
    components: {
        AppHeader,
    },
}
</script>

<template>
    <AppHeader />
    <main>
        <RouterView />
    </main>
</template>

<style scoped>
main {
    min-height: calc(90vh - 6.45rem);
}
</style>
