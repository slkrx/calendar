<template>
    <v-row justify="center">
      <v-btn
        icon
        class="ma-2"
        @click="$emit('timeTravelPrev')"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-menu
        v-model="isMenuOpen"
        transition="scale-transition"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                v-bind:value="value"
                readonly
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
            v-bind:value="value"
            @input="$emit('update:value', $event); isMenuOpen = false"
        />
      </v-menu>
      <v-btn
        icon
        class="ma-2"
        @click="$emit('timeTravelNext')"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-row>
</template>

<script>
export default {
    props: {
        value: String
    },
    data: function() {
        return {
            isMenuOpen: false
        }
    }
}
</script>