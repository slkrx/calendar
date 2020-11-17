<template>
    <v-card
        color="grey lighten-4"
        min-width="350px"
        flat
    >
        <v-toolbar
            :color="color"
            dark
        >
            <v-toolbar-title v-html="name"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click="$emit('update:selectedOpen', false)"
            >
                <v-icon>mdi-close-circle</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card-text>
            <v-textarea
                :value="description"
                @input="$emit('update:description', $event)"
            ></v-textarea>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props: {
        selectedOpen: Boolean,
        color: String,
        name: String,
        description: String
    }
}
</script>