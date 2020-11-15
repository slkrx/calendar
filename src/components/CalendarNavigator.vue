<template>
    <v-row justify="center">
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
    </v-row>
</template>