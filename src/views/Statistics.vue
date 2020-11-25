<template>
    <div>
        {{ events }}
    </div>
</template>

<script>
export default {
    computed: {
        events() {
            return this.$store.state.events
        }
    }
}
</script>