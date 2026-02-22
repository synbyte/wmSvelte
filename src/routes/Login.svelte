<script>
  import { fade } from 'svelte/transition';
  import { enhance } from '$app/forms';
  
  export let form;
  
  let isRegistering = false;
  let username = form?.username || '';
  let password = '';
  let loading = false;
</script>

<div class="login-container" transition:fade>
  <div class="login-box">
    <div class="rounded-3xl border-2 border-black overflow-hidden mb-10">
  <img src="/epic_finger.png" class="scale-110 block" />
</div>
    
    
    <form 
      method="POST" 
      action={isRegistering ? '?/register' : '?/login'} 
      use:enhance={() => {
        loading = true;
        return async ({ update, result }) => {
          loading = false;
          if (result.type === 'success' && isRegistering) {
            isRegistering = false;
          }
          update();
        };
      }}
    >
      <div class="form-group">
        <label for="username">Username</label>
        <input 
          type="text" 
          name="username"
          id="username" 
          bind:value={username} 
          placeholder="Enter username"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input 
          type="password" 
          name="password"
          id="password" 
          bind:value={password} 
          placeholder="Enter password"
          required
        />
      </div>
      
      {#if form?.incorrect}
        <div class="error">NOPE! Invalid credentials.</div>
      {/if}

      {#if form?.exists}
        <div class="error">Username already exists!</div>
      {/if}

      {#if form?.success}
        <div class="success">Account created! You can now login.</div>
      {/if}
      
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : (isRegistering ? 'REGISTER' : 'LOGIN')}
      </button>

      <button 
        type="button" 
        class="toggle-btn"
        on:click={() => isRegistering = !isRegistering}
      >
        {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
      </button>
    </form>
    <div class="bg-slate-100 p-1 rounded-lg">
      <p class="disclaimer not-italic underline underline-offset-4">DISCLAIMER</p>
      <p class="disclaimer">
         This app is for educational purposes ONLY, the creator is not responsible for how it might be used.
      </p>
    </div>
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

    .emoji-logo {
      font-size: 8rem;
      margin-bottom: 0.5rem;
      filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
    }

    .prominent-header {
      margin-bottom: 2rem;
      color: #0071dc;
      font-size: 2.2rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: -1px;
    }
  }
  
  .form-group {
    width: 100%;
    margin-bottom: 1.5rem;
    
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #444;
    }
    
    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ced4da;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
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
    transition: background-color 0.2s;
    
    &:hover:not(:disabled) {
      background-color: #005cb8;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  .toggle-btn {
    background: none;
    color: #0071dc;
    margin-top: 1.5rem;
    font-size: 0.9rem;
    text-decoration: underline;
    border: none;
    cursor: pointer;
    &:hover:not(:disabled) {
      background-color: #ffffffff;
    }
   
  }
  
  .error {
    color: #d93025;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 0.95rem;
    text-align: center;
    width: 100%;
  }

  .success {
    color: #188038;
    margin-bottom: 1rem;
    font-weight: bold;
    font-size: 0.95rem;
    text-align: center;
    width: 100%;
  }

  .disclaimer {
    font-size: 0.75rem;
    color: #999;
    text-align: center;
    line-height: 1.4;
    padding: 0 1rem;
    font-style: italic;
  }
  .not-italic {
    font-style: normal;
  }
</style>