<template>
    <section class="home-page-hero">
        <img class="home-header-img" src="https://www.kg-legal.eu/wp-content/uploads/2021/10/blockchain.gif" alt="">
        <h1>A crypto wallet & gateway to blockchain apps.</h1>
    </section>
    <!-- <button @click="onGetRate">getRate</button>
    <button @click="onGetMarketPriceHistory">getMarketPriceHistory</button>
    <button @click="onGetAvgBlockSize">getAvgBlockSize</button> |
    <button @click="onGetUsers">getUsers</button> -->
    <section class="login-signup">
        <h1 v-if="logedInUserName">Welcome {{ logedInUserName }}</h1>

        <RouterLink to="/login">
            <button class="btn spacial">Login</button>
        </RouterLink>
        <RouterLink to="/sign-up">
            <button class="btn spacial">SignUp</button>
        </RouterLink>
    </section>
    <section class="home-barcode">
        <span>
            <h2>Scan the barcode <br /> to open in your <span>mobile</span> device</h2>
            <img class="barcode-img"
                src="https://qrcode.tec-it.com/API/QRCode?data=%d0%93%d0%b5%d0%bd%d0%b5%d1%80%d0%b0%d1%82%d0%be%d1%80+QR-%d0%ba%d0%be%d0%b4%d0%be%d0%b2+%d0%be%d1%82+%d0%ba%d0%be%d0%bc%d0%bf%d0%b0%d0%bd%d0%b8%d0%b8+TEC-IT"
                alt="">
        </span>
        <img class="mobile-img"
            src="https://images.ctfassets.net/9sy2a0egs6zh/78HoDbPwuWz8M6er6joJdE/c440f3e5d7262a424f13da69a46e958a/wallet-illo.svg"
            alt="">

    </section>
    <img class="footer-gif" src="https://i.imagesup.co/images2/c99f72c7e4036a3e9156605245de7fa24071d995.gif" alt="">
</template>


<script>
import { bitcoinService } from '@/services/bitcoin.service.js'
import { userService } from '@/services/user.service.js'

export default {
    data() {
        return { logedInUserName: null }
    },
    async created() {
        const logedInUser = await userService.getLoginToken()
        this.logedInUserName = logedInUser[0].name
    },
    methods: {
        onGetRate() {
            bitcoinService.getRate()
        },
        onGetMarketPriceHistory() {
            bitcoinService.getMarketPriceHistory()
        },
        onGetAvgBlockSize() {
            bitcoinService.getAvgBlockSize()
        },
        onGetUsers() {
            userService.signupTest()
        },
    },
    // computed: {

    // },
    // components: {

    // },
}
</script>