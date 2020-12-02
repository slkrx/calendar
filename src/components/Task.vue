<template>
    <v-card>
        <v-card-title v-html="task.name"></v-card-title>
        <v-card-text v-html="task.description"></v-card-text>
        <v-checkbox v-model="completed"></v-checkbox>
    </v-card>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    props: [
        'taskId'
    ],
    methods: {
        ...mapMutations([ 'updateEvent' ])
    },
    computed: {
        ...mapGetters([ 'getEvent' ]),
        task() {
            return this.getEvent(this.taskId)
        },
        completed: {
            get() {
                return this.task.completed
            },
            set(value) {
                this.updateEvent({
                    id: this.taskId,
                    completed: value
                })
            }
        }
    }
}
</script>