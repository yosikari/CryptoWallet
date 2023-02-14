<script>
import AppHeader from '@/cmps/app-header.vue'
import AppFooter from '@/cmps/app-footer.vue'
export default {
    components: {
        AppHeader,
        AppFooter,
    },
}
</script>

<template>
    <AppHeader />
    <main>
        <RouterView />
    </main>
    <AppFooter />
</template>

<style scoped>
main {
    min-height: calc(90vh - 5.8rem);
}

</style>
