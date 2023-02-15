<template>
    <div class="main-container">
        <UserMsg />
        <ContactFilter @filter="onSetFilterBy" />
        <RouterLink to="/contact/edit"><button title="Add contact" class="add-contact-btn">
                <font-awesome-icon icon="fa-solid fa-user-plus" />
            </button></RouterLink>
        <ContactList @remove="removeContact" v-if="contacts.length" :contacts="filteredContacts" />
    </div>
</template>
<script>
import { eventBus } from '@/services/eventBus.service.js'

import ContactList from '@/cmps/contact-list.vue'
import ContactFilter from '@/cmps/contact-filter.vue'
import UserMsg from '@/cmps/user-msg.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUserPlus)

export default {
    data() {
        return {
            // contacts: null,
            filterBy: {},
        }
    },
    created() {
        this.$store.dispatch({ type: 'loadContacts' })
        // this.contacts = await contactService.query()
    },
    computed: {
        // contacts() { return this.$store.state.contactStore.contacts },
        contacts() { return this.$store.getters.contacts },
        filteredContacts() {
            const regex = new RegExp(this.filterBy.txt, 'i')
            return this.contacts?.filter(contact => regex.test(contact.name))
        }
    },
    methods: {
        async removeContact(contactId) {
            const msg = {
                txt: `Contact ${contactId} deleted.`,
                type: 'success',
                timeout: 2500,
            }
            // await contactService.remove(contactId)
            await this.$store.dispatch({ type: 'removeContact', contactId })
            // this.contacts = this.contacts.filter(contact => contact._id !== contactId)
            eventBus.emit('user-msg', msg)
        },
        onSetFilterBy(filterBy) {
            this.filterBy = filterBy
        },
    },
    components: {
        ContactList,
        ContactFilter,
        UserMsg,
        FontAwesomeIcon,
    },
}
</script>

<style lang="scss">
.main-container {
    position: relative;
}
</style>
