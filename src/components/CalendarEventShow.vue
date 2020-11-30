<template>
    <v-card
        color="grey lighten-4"
        min-width="350px"
        flat
    >
        <v-toolbar :color="color" dark>
            <v-toolbar-title v-html="name"></v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <v-textarea v-model="description"></v-textarea>
            <v-checkbox
                v-model="completed"
                label="Completed"
            ></v-checkbox>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="save">
                Save
            </v-btn>
            <v-btn @click="close">
                Cancel
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    props: {
        selectedOpen: Boolean,
        color: String,
        name: String,
        description: String,
        completed: Boolean,
        id: Number
    },
    methods: {
        ...mapMutations([ 'updateEvent' ]),
        close() {
            this.$emit('update:selectedOpen', false)
        },
        save() {
            this.updateEvent({
                id: this.id,
                description: this.description,
                completed: this.completed
            })
            this.close()
        }
    }
}
</script>