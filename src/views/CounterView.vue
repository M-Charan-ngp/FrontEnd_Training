<script setup>
import {ref} from 'vue'
    const val = ref(0);

    const increment = () => {
        val.value += 1;
    }
    const decrement = () => {
        val.value -= 1;
    }
    const reset = () => {
        val.value = 0;
    }
</script>

<template>
    <main>
        <h1>Simple Counter</h1>
        <div class='counter-box'>
            <h3>Counter Value: {{ val }}</h3>
            <div class="iterator">
                <button @click="increment">+</button>
                <button @click="decrement">-</button>
            </div class="resetor">
            <button @click="reset">reset</button>
        </div>


    </main>
</template>

<style scoped>
.counter-box{
    display:flexbox;
    border-radius: 5px;
    margin: 5px;
    padding: 5px 15px;
    border: 1px;
    border-color: cadetblue;
}
.controls {
    margin-bottom: 10px;
}
.iterator{
    display:flex;

}
.resetor{
    display: flex;
}
button {
  background-color: #42b883; 
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 10px;
  font-size: 16px;
  cursor: pointer;
}
</style>