<script>
  import { fade } from 'svelte/transition';
  import { goto } from '$app/navigation';
  
  let username = '';
  let password = '';
  let error = '';
  
  function handleLogin() {
    if (username === 'krxn0s' && password === 'FUCKWALMART') {
      goto('/main');
    } else {
      error = 'NOPE!';
    }
  }
</script>

<div class="login-container" transition:fade>
  <div class="login-box">
    <img 
      class="logo"
      src="/wm_logo.png" 
      alt="Walmart Logo" 
    />
    
    <div class="form-group">
      <label for="username">Username</label>
      <input 
        type="text" 
        id="username" 
        bind:value={username} 
        placeholder="Enter username"
      />
    </div>
    
    <div class="form-group">
      <label for="password">Password</label>
      <input 
        type="password" 
        id="password" 
        bind:value={password} 
        placeholder="Enter password"
      />
    </div>
    
    {#if error}
      <div class="error">{error}</div>
    {/if}
    
    <button on:click={handleLogin}>LOGIN</button>
  </div>
</div>

<style lang="scss">
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    background-color: #f8f9fa;
  }
  
  .login-box {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 90%;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .logo {
    width: 85%;
    margin-bottom: 2rem;
  }
  
  .form-group {
    width: 100%;
    margin-bottom: 1rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }
    
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 1rem;
    }
  }
  
  button {
    background-color: #0071dc;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 1rem;
    width: 100%;
    
    &:hover {
      background-color: #005cb8;
    }
  }
  
  .error {
    color: red;
    margin: 0.5rem 0;
    font-weight: bold;
    font-size: 1.2rem;
  }
</style> 