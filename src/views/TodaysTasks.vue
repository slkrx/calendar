<template>
    <v-container>
        <h2 class="display-1 success--text pl-4">
            Today's Tasks: {{ todaysTasks.length }}
        </h2>
        <v-divider class="mt-4"></v-divider>
        <v-row
            class="my-1"
            align="center"
        >
            <strong class="mx-4 info--text text-darken-2">
                Remaining: {{ remainingTasks.length }}
            </strong>

            <v-divider vertical></v-divider>

            <strong class="mx-4 success--text text--darken-2">
                Completed: {{ completedTasks.length }}
            </strong>

            <v-spacer></v-spacer>

            <v-progress-circular
                :value="progress"
                class="mr-2"
            ></v-progress-circular>
        </v-row>
        <v-timeline>
            <v-timeline-item
                v-for="task in todaysTasks"
                :key="task.id"
                :color="task.color"
                fill-dot
            >
                <template v-slot:opposite>
                    <span
                        class="headline font-weight-bold"
                        :style="{ color: task.color }"
                    >
                        {{ task.start | moment("h:mm a") }}
                    </span>
                </template>
                <Task :taskId="task.id"/>
            </v-timeline-item>
        </v-timeline>
    </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import Task from '@/components/Task'

export default {
    components: {
        Task
    },
    computed: {
        ...mapGetters([ 'todaysTasks' ]),
        remainingTasks() {
            return this.todaysTasks.filter((task) => !task.completed)
        },
        completedTasks() {
            return this.todaysTasks.filter((task) => task.completed)
        },
        progress() {
            return this.completedTasks.length / this.todaysTasks.length * 100
        }
    }
}
</script>