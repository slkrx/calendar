<template>
    <div>
        <v-sparkline
            :fill="true"
            :gradient="gradient"
            :line-width="2"
            :padding="8"
            :smooth="10"
            :label-size="3"
            :value="numCompletedTasks"
            auto-draw
        >
            <template v-slot:label="item">
                {{ new Date(new Date().setDate(new Date().getDate() - 7 + item.index)).toISOString().substr(0, 10) }}
            </template>
        </v-sparkline>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            gradient: ['#00c6ff', '#F0F', '#FF0']
        }
    },
    computed: {
        events() {
            return this.$store.state.events
        },
        numCompletedTasks() {
            // Computes the number of tasks completed for each day in the last week
            let events = this.$store.state.events;
            let today = new Date();
            let aWeekAgo = new Date();
            aWeekAgo.setDate(aWeekAgo.getDate() - 7);
            let numCompletedTasks = [0,0,0,0,0,0,0];
            events.forEach(event => {
                let startDate = event.start;
                if (typeof(startDate) == Date)
                    startDate = event.start.getTime();
                let endDate = event.end;
                if (typeof(endDate) == Date)
                    endDate = event.end.getTime();
                if (endDate < aWeekAgo.getTime() || endDate > today.getTime())
                    return;
                if (event.completed) {
                    let numDaysAgo = Math.trunc((today.getTime() - endDate) / (1000 * 3600 * 24));
                    let taskDuration = (endDate - startDate)  / (1000 * 60);
                    numCompletedTasks[6 - numDaysAgo] += taskDuration;
                }
            })
            return numCompletedTasks;
        }
    }
}
</script>