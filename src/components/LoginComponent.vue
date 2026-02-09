<script setup>
    const emit = defineEmits(['success'])
    const credentials = defineModel({ required: true })
    const handlesubmit = () =>{
        if(credentials.value.email && credentials.value.password){
            emit('success')
        }
        else{
            alert("login failed")
        }
    }
</script>

<template>
    
    <div class='card'>
        <h2>Login</h2>
        <form @submit.prevent="handlesubmit">
            <div class="form-group">
                <label>Email</label>
                <input type="email" v-model="credentials.email" placeholder="Enter email" v-focus>
            </div>
            <div class="form-group">
                <label>password</label>
                <input type="password" v-model="credentials.password" placeholder="Enter password" >
            </div>
            <button type="submit" class="auth-btn">Login</button>
        </form>
    </div>
</template>

<style scoped>
h2 {
    font-size: 1.8rem;
    font-weight: 800;
    text-align: center;
    position: relative;
    letter-spacing: -0.5px;
}
.card {
    max-width: 100%;
    min-width: 400px;
    margin: 1rem auto;
    padding: 2rem;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.form-group {
    margin-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
    text-align: left;
}

label {
    font-size: 18px;
    margin-bottom: 2px;
    color: #000000;
}

input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 6px;
    outline: none;
}

input:focus {
    border-color: #42b883;
}

button {
    width: 100%;
    padding: 12px;
    background: #42b883;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
}

</style>