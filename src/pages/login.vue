<template>
    <UserMsg />
    <span class="edit-header">
        <RouterLink to="/">
            <button class="edit-back-btn" title="Back">
                <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </button>
        </RouterLink>
        <h2>Login</h2>
    </span>
    <form @submit.prevent="save" class="contact-edit">
        <span> Name: <input type="text" v-model="user.name"></span>
        <span> Password: <input type="password" v-model="user.password"></span>
        <button title="Submit changes" class="btn">Submit</button>
    </form>
</template>

<script>
import { userService } from '@/services/user.service.js'
import UserMsg from '@/cmps/user-msg.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
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
            try {
                await userService.login(this.user.name, this.user.password)
                this.$router.push('/')
            } catch (err) {
                console.log('Error:', err, err.message)
            }
        }
    },
    components: {
        UserMsg,
        FontAwesomeIcon
    }
}
</script>

<style lang="scss">

</style>
