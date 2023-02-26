<template>
    <span class="edit-header">
        <RouterLink to="/">
            <button class="edit-back-btn" title="Back">
                <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </button>
        </RouterLink>
        <h2>SignUp Now For Free</h2>
        <h4>You will get 100BTC</h4>
    </span>
    <form @submit.prevent="save" class="contact-edit">
        <span> Name: <input type="text" v-model="user.name"></span>
        <span> Password: <input type="password" v-model="user.password"></span>
        <button title="Submit changes" class="btn">Submit</button>
    </form>
    <AppFooter />
</template>

<script>
import AppFooter from '@/cmps/app-footer.vue'
import { userService } from '@/services/user.service.js'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
library.add(faChevronLeft)

export default {
    data() {
        return {
            user: {
                name: null,
                password: null
            }
        }
    },
    async created() {
    },
    methods: {
        async save() {
            console.log('u.name:', this.user.name, 'u.password:', this.user.password)
            await userService.signup(this.user.name, this.user.password)
            this.$router.push('/')
        }
    },
    components: {
        AppFooter,
        FontAwesomeIcon
    }
}
</script>

<style lang="scss"></style>
