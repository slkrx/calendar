<template>
    <div>
        {{ events }}
        {{ numCompletedTasks }}
    </div>
</template>

<script>
export default {
    computed: {
        events() {
            return this.$store.state.events
        },
        numCompletedTasks() {
            let events = this.$store.state.events;
            let numCompletedTasks = 0;
            events.forEach(event => {
                if (event.completed) {
                    numCompletedTasks++;
                }
            })
            return numCompletedTasks;
        }
    }
}
</script>