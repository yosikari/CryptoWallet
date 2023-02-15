<template>


    <span class="edit-header">
        <RouterLink to="/contact">
            <button class="edit-back-btn" title="Back">
                <font-awesome-icon icon="fa-solid fa-chevron-left" />
            </button>
        </RouterLink>
        <h2 v-if="contact !== null">Edit contact profile</h2>
        <h2 v-else>Add new contact</h2>
        <pre>{{ contact }}</pre>

    </span>
    <form @submit.prevent="save" v-if="contact" class="contact-edit">
        <span> Name: <input type="text" v-model="contact.name"></span>
        <span> Phone: <input placeholder="+1" type="number" v-model.number="contact.phone"></span>
        <span> Email: <input type="email" v-model="contact.email"></span>

        <button title="Submit changes" class="btn">Submit</button>
    </form>
</template>

<script>
import { contactService } from '@/services/contact.service.js'

import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
library.add(faChevronLeft)

export default {
    data() {
        return {
            contact: null,
        }
    },
    async created() {
        const contactId = this.$route.params._id
        if (contactId) {
            this.contact = await contactService.getById(contactId)
        } else {
            this.contact = contactService.getEmptyContact()
        }
    },
    methods: {
        async save() {
            await contactService.save(this.contact)
            this.$router.push('/contact')
        }
    },
    components: {
        FontAwesomeIcon
    }
}
</script>

<style lang="scss">

</style>
