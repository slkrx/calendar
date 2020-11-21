<template>
    <v-toolbar
      flat
    >
      <template v-if="itIsToday">
        <v-btn
          @click="$emit('update:value', new Date().toISOString().substr(0, 10))"
          outlined="true"
          flat
          color="primary"
        >
          Today
        </v-btn>
      </template>
      <template v-else>
        <v-btn
          @click="$emit('update:value', new Date().toISOString().substr(0, 10))"
          color="primary"
          dark
          flat
          depressed
        >
          Today
        </v-btn>
      </template>
      <v-btn
        icon
        class="ma-2"
        @click="$emit('timeTravelPrev')"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        icon
        class="ma-2"
        @click="$emit('timeTravelNext')"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-menu
        v-model="isMenuOpen"
        transition="scale-transition"
        offset-y
        :close-on-content-click="false"
      >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-bind:value="formattedDate"
              readonly
              prepend-icon="mdi-calendar"
              v-bind="attrs"
              v-on="on"
              hide-details
              single-line
            ></v-text-field>
        </template>
        <v-date-picker
            v-bind:value="value"
            @input="$emit('update:value', $event); isMenuOpen = false"
        />
      </v-menu>
    </v-toolbar>
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
    },
    computed: {
      formattedDate() {
        return this.$moment(this.value).format('dddd, MMMM Do YYYY')
      },
      itIsToday() {
        return this.value == new Date().toISOString().substr(0, 10)
      }
    }
}
</script>