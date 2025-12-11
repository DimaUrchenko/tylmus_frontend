<template>
  <div class="controls">
    <button @click="$emit('deselect-all')" class="btn-control">Снять отметку</button>
    <button @click="$emit('shuffle-words')" class="btn-control">Перемешать</button>
    <button 
      @click="$emit('submit-guess')" 
      :disabled="!canSubmit" 
      class="btn-submit"
      :class="{ 'enabled': canSubmit }"
    >
      Подтвердить
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  canSubmit: boolean
  gameOver: boolean
}

interface Emits {
  (e: 'deselect-all'): void
  (e: 'shuffle-words'): void
  (e: 'submit-guess'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.controls {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
  flex-wrap: wrap; /* Allow wrapping on very small screens */
}

.btn-control, .btn-submit {
  padding: 12px 24px;
  border: 2px solid black;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1em;
  font-weight: bold;
  background: white;
  transition: all 0.3s ease;
  flex: 1; /* Make buttons flexible */
  min-width: 120px; /* Minimum width for desktop */
  text-align: center;
}

.btn-control:hover, .btn-submit:not(:disabled):hover {
  background: #d4edda;
}

.btn-submit:disabled {
  cursor: not-allowed;
  border-color: gray;
  color: gray;
}

.btn-submit.enabled:not(:disabled) {
  background: black;
  color: white;
}

.btn-submit.enabled:not(:disabled):hover {
  background: #333;
  color: white;
}

/* Mobile responsive styles */
@media (max-width: 768px) {
  .controls {
    gap: 8px;
    margin-bottom: 15px;
  }
  
  .btn-control, .btn-submit {
    padding: 10px 16px;
    font-size: 0.9em;
    min-width: 100px;
  }
}

@media (max-width: 576px) {
  .controls {
    gap: 6px;
    margin-bottom: 12px;
    flex-wrap: nowrap; /* Keep in one row */
  }
  
  .btn-control, .btn-submit {
    padding: 8px 12px;
    font-size: 0.85em;
    min-width: 90px;
    flex: 1; /* Equal width for all buttons */
    white-space: nowrap; /* Prevent text wrapping */
  }
  
  /* Shorter text for mobile if needed */
  .btn-control:first-child {
    /* Снять отметку -> Снять */
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

@media (max-width: 400px) {
  .controls {
    gap: 4px;
  }
  
  .btn-control, .btn-submit {
    padding: 6px 8px;
    font-size: 0.8em;
    min-width: 80px;
  }
  
  /* Even shorter text for very small screens */
  .btn-control:first-child::after {
    content: "Снять";
  }
  
  .btn-control:first-child {
    font-size: 0.75em;
  }
  
  .btn-control:nth-child(2) {
    font-size: 0.75em;
  }
  
  .btn-submit {
    font-size: 0.75em;
  }
}

/* Very small screens */
@media (max-width: 360px) {
  .btn-control, .btn-submit {
    padding: 5px 6px;
    font-size: 0.7em;
    min-width: 70px;
  }
}
</style>