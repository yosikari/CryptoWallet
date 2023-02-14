<template>
    <section>
        <TransitionGroup name="list" tag="ul" class="contact-list">
            <li class="contact-preview" v-for="contact in contacts" :key="contact._id">
                <ContactPreview :contact="contact" />
                <section class="actions">
                    <RouterLink :to="`/contact/${contact._id}`">
                        <button title="Details">
                            <!-- details -->
                            <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" />
                        </button>
                    </RouterLink>
                    <RouterLink :to="`/contact/edit/${contact._id}`">
                        <button title="Edit">
                            <!-- edit -->
                            <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                        </button>
                    </RouterLink>
                    <button title="Delete" @click="onRemoveContact(contact._id)">
                        <!-- remove -->
                        <font-awesome-icon icon="fa-solid fa-trash" />
                    </button>
                </section>
            </li>
        </TransitionGroup>
    </section>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faTrash, faPenToSquare, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons'
library.add(faTrash, faPenToSquare, faArrowUpRightFromSquare)



import ContactPreview from '@/cmps/contact-preview.vue'
export default {
    props: {
        contacts: {
            type: Array,
            required: true,
        },
    },
    methods: {
        onRemoveContact(contactId) {
            this.$emit('remove', contactId)
        },
    },
    components: {
        ContactPreview,
        FontAwesomeIcon,
    },
}
</script>

<style lang="scss">

</style>
