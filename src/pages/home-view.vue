<template>
    <UserMsg />
    <section class="home-page-hero">
        <img class="home-header-img" src="https://www.kg-legal.eu/wp-content/uploads/2021/10/blockchain.gif" alt="">
        <h1>A crypto wallet & gateway to blockchain apps.</h1>
    </section>
    <section class="login-signup">
        <h1 v-if="loggedInUserName">Welcome {{ loggedInUserName }}</h1>
        <button v-if="loggedInUserName" v-on:click="onLogout" class="btn spacial">Logout</button>
        <section v-if="!loggedInUserName" class="login-signup-btns">
            <RouterLink to="/login">
                <button class="btn spacial">Login</button>
            </RouterLink>
            <RouterLink to="/sign-up">
                <button class="btn spacial">SignUp</button>
            </RouterLink>
        </section>
    </section>
    <section class="home-barcode">
        <span>
            <h2>Scan the barcode <br /> to open in your <span>mobile</span> device</h2>
            <img class="barcode-img" src="https://i.imagesup.co/images2/830971b81bd1f2ce86d76ebffa2d58f95eadabaf.png"
                alt="">
        </span>
        <img class="mobile-img"
            src="https://images.ctfassets.net/9sy2a0egs6zh/78HoDbPwuWz8M6er6joJdE/c440f3e5d7262a424f13da69a46e958a/wallet-illo.svg"
            alt="">

    </section>
    <img class="footer-gif" src="https://i.imagesup.co/images2/c99f72c7e4036a3e9156605245de7fa24071d995.gif" alt="">

    <AppFooter />
</template>


<script>
import AppFooter from '@/cmps/app-footer.vue'
import { userService } from '@/services/user.service.js'
import UserMsg from '@/cmps/user-msg.vue'

export default {
    data() {
        return { loggedInUserName: null }
    },
    async created() {
        const loggedInUser = await userService.getLoginToken()
        this.loggedInUserName = loggedInUser[0]?.name
    },
    methods: {
        async onLogout() {
            userService.logout()
            this.loggedInUser = await userService.getLoginToken()
            this.loggedInUserName = this.loggedInUser[0]?.name
        }
    },
    components: {
        AppFooter,
        UserMsg
    }
}
</script>