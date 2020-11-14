<template>
  <div>
    <v-calendar type="week" v-bind:events="events"></v-calendar>
  </div>
</template>

<script>
let start = new Date("11-13-2020 1:00")
let end = new Date(start)
end.setHours(start.getHours() + 3)

export default {
  data: function() {
    return {
      events: [
        {
          name: 'this is an event',
          start: start,
          end: end,
          color: 'green',
          timed: true
        }
      ]
    }
  }
}
</script>
