import { userStore } from './user.store.js'
import { contactStore } from './contact.store.js'
import { createStore } from 'vuex'

export const myStore = createStore({
    strict: true,
    computed:{
        contacts1() { return this.$store.getters.contacts }
    },
    getters: {
        // Reusable accessing logic
        countForDisplay(state) {
            return state.count.toLocaleString()
        },
    },
    actions: {
        incrementAsync(context, payload) {
            console.log('context', context)
            setTimeout(() => {
                context.commit({ type: 'changeCount', by: payload.by })
            }, 2500)
        },
    },
    modules: {
        userStore,
        contactStore
    }
})

myStore.subscribe((cmd, state) => {
    console.log('**** Store state changed: ****')
    console.log('Command:', cmd.payload)
    console.log('storeState:\n', state)
    console.log('*******************************')
})

