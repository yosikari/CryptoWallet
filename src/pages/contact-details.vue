<template>
    <RouterLink to="/contact">
        <button title="Back" class="details-back-btn">
            <font-awesome-icon icon="fa-solid fa-chevron-left" />
        </button>
    </RouterLink>
    <div v-if="contact" class="contact-details">
        <h1>{{ contact.name }}</h1>
        <h2>{{ formatPhone(contact.phone) }}</h2>
        <h2>{{ contact.email }}</h2>
        <img :src="'https://api.dicebear.com/5.x/open-peeps/svg?seed=' + contact._id" alt="">

        <section v-if="loggedInUser">
            <form @submit.prevent="handle">
                <input type="number" v-model.number="tip" />
                <button>Tip!</button>
            </form>
            <h2>Balance : {{ contact.balance ? contact.balance : 0 }} BTC</h2>
            <span>Transactions :
                <pre>{{
                    contact.balance ? contact.transactions : 'No transactions yet...'
                }}</pre>
            </span>
        </section>
        <section v-else>
            <h3>
                <a class="login-signup-link" href='/CryptoWallet/#/sign-up'>Signup</a> or
                <a class="login-signup-link" href='/CryptoWallet/#/login'>Login</a>
                 to tip {{ contact?.name }}</h3>
        </section>


    </div>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
import { userService } from '@/services/user.service.js'

import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
library.add(faChevronLeft)

export default {
    data() {
        return {
            tip: null,
            contact: null,
            loggedInUser: null,
        }
    },
    async created() {
        const contactId = this.$route.params._id
        this.contact = await contactService.getById(contactId)
        this.loggedInUser = await userService.getLoginToken()
        if(this.loggedInUser.length === 0) this.loggedInUser = null
        console.log('user', this.loggedInUser)
    },
    methods: {
        formatPhone(phone) {

            if (phone.length != 10) {
                phone = '0501111111'
            }
            return '+1' + phone.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
        },
        async handle() {
            try {
                // this.loggedInUser = await userService.getLoginToken()
                if (this.loggedInUser[0].balance - this.tip < 0) {
                    alert('You d\'ont have much btc !')
                    return
                }
                const transaction = {
                    date: new Date(),
                    from: this.loggedInUser[0].name,
                    to: this.contact.name,
                    amount: this.tip
                }
                // loggedInUser[0].balance -= this.tip
                if (!this.contact.balance) {
                    this.contact.balance = 0
                }
                this.contact.balance += this.tip
                if (!this.contact.transactions) {
                    this.contact.transactions = []
                }
                this.contact.transactions.unshift(transaction)
            } catch (err) {
                console.log('Error you have to loggedin first!', err, err.message)
            }
            console.log(this.contact)
            await contactService.save(this.contact)
        }
    },
    components: {
        FontAwesomeIcon
    }
}
</script>

<style lang="scss">

</style>
