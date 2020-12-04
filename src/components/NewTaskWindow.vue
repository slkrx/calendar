<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            New Task
          </slot>
        </header>
        <section class="modal-body">
          <slot name="body">
            <v-text-field
              label="Task Name"
              v-model="name"
            />
            <v-row justify="center">
              <v-col>
              <h2>Start Date:</h2>
              <v-date-picker 
                v-model="startDate"
                :max="endDate"
              />
              </v-col>
              <v-col>
              <h2>End Date:</h2>
              <v-date-picker 
                v-model="endDate"
                :min="startDate"
              />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <h2>Start Time:</h2>
                <v-time-picker
                  class="time-picker"
                  ampm-in-title
                  format="ampm"
                  scrollable
                  v-model="start"
                  :max="end"
                />
              </v-col>
              <v-col>
                <h2>End Time:</h2>
                <v-time-picker
                  class="time-picker"
                  ampm-in-title
                  format="ampm"
                  scrollable
                  v-model="end"
                  :min="start"
                />
              </v-col>
            </v-row>
            <h2>Display Color:</h2>
            <v-row justify="center">
              <v-color-picker
                justify="center"
                hide-canvas
                show-swatches
                :swatches="swatches"
                swatches-max-height="118"
                v-model="color"
              />
            </v-row>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <v-btn
              class="btn-cancel"
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              class="btn-add"
              @click="$emit('addEvent', name, startDate, endDate, start, end, color); close()"
            >
              Add Task
            </v-btn>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data: function() {
      return {
        name: "New Task",
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        start: "00:00",
        end: "11:00",
        color: "#FF00FF",
        swatches: [
          ['#FF0000', '#FF00FF', '#640000'],
          ['#00FF00', '#FF6400', '#006400'],
          ['#0000FF', '#00FFFF', '#000064'],
        ],
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    height: 70vh; 
    overflow-y: auto;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    padding: 15px;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    padding: 15px;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .time-picker {
    transform: scale(0.875);
  }

  .btn-cancel,
  .btn-add {
    margin-left: 5px;
    margin-right: 5px;
  }
</style>