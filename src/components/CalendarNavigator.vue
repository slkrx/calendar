<template>
    <v-toolbar
      flat
      color="grey lighten-5"
    >
      <template v-if="itIsToday">
        <v-btn
          @click="$emit('update:value', new Date().toISOString().substr(0, 10))"
          outlined
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
      <v-spacer></v-spacer>
      <v-menu
        bottom
        right
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            outlined
            color="grey darken-2"
            v-bind="attrs"
            v-on="on"
          >
            <span>{{ type }}</span>
            <v-icon right>
              mdi-menu-down
            </v-icon>
          </v-btn>
        </template>
          <v-list>
            <v-list-item @click="$emit('update:type', 'day')">
              <v-list-item-title>Day</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$emit('update:type', 'week')">
              <v-list-item-title>Week</v-list-item-title>
            </v-list-item>
            <v-list-item @click="$emit('update:type', 'month')">
              <v-list-item-title>Month</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
    </v-toolbar>
</template>

<script>
export default {
    props: {
        value: String,
        type: String
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