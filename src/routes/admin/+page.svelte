<script>
    import { fade } from 'svelte/transition';
    import { enhance } from '$app/forms';
    export let data;
    export let form;

    const { authorized, users } = data;

    function formatDate(dateString) {
        if (!dateString || dateString === 'undefined') return 'Never';
        const date = new Date(dateString);
        return date.toLocaleString();
    }

    function getTimeAgo(dateString) {
        if (!dateString || dateString === 'undefined') return 'Never';
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now - date) / 1000);
        
        if (seconds < 60) return "Just now";
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    }
</script>

<svelte:head>
    <title>Admin Dashboard - User Accounts</title>
</svelte:head>

{#if !authorized}
    <div class="login-page" transition:fade>
        <div class="login-card">
            <h2>Admin Access</h2>
            <form method="POST" action="?/login">
                <div class="form-group">
                    <label for="username">Admin Username</label>
                    <input type="text" name="username" id="username" required placeholder="Krxn0s">
                </div>
                <div class="form-group">
                    <label for="password">Admin Password</label>
                    <input type="password" name="password" id="password" required>
                </div>
                {#if form?.incorrect}
                    <p class="error">Incorrect credentials.</p>
                {/if}
                <button type="submit">Unlock Dashboard</button>
            </form>
            <a href="/main" class="back-link-small">← Exit</a>
        </div>
    </div>
{:else}
    <div class="admin-container" in:fade>
        <header>
            <div class="header-content">
                <h1>Admin Dashboard</h1>
                <p class="subtitle">Managing {users.length} registered users</p>
            </div>
            <div class="header-actions">
                <form method="POST" action="?/logout" use:enhance>
                    <button class="logout-btn">Logout</button>
                </form>
                <a href="/main" class="back-link">← App</a>
            </div>
        </header>

        <main>
            <div class="stats-grid">
                <div class="stat-card">
                    <span class="stat-label">Total Users</span>
                    <span class="stat-value">{users.length}</span>
                </div>
                <div class="stat-card">
                    <span class="stat-label">Active Today</span>
                    <span class="stat-value">
                        {users.filter(u => {
                            const lastLogin = new Date(u.lastLogin);
                            const today = new Date();
                            return lastLogin.toDateString() === today.toDateString();
                        }).length}
                    </span>
                </div>
            </div>

            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Created</th>
                            <th>Last Login</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each users as user}
                            <tr>
                                <td class="username">{user.username}</td>
                                <td>{formatDate(user.createdAt)}</td>
                                <td>
                                    <div class="login-info">
                                        <span class="date">{formatDate(user.lastLogin)}</span>
                                        <span class="ago">{getTimeAgo(user.lastLogin)}</span>
                                    </div>
                                </td>
                                <td>
                                    <span class="status-badge active">Active</span>
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </main>
    </div>
{/if}

<style>
    :global(body) {
        background-color: #f0f2f5;
        margin: 0;
        font-family: 'Inter', -apple-system, sans-serif;
    }

    /* Login Styles */
    .login-page {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #0071dc 0%, #0056a3 100%);
    }

    .login-card {
        background: white;
        padding: 2.5rem;
        border-radius: 16px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        width: 100%;
        max-width: 400px;
    }

    h2 { margin-top: 0; color: #1a1a1a; text-align: center; }

    .form-group { margin-bottom: 1.5rem; }
    
    label { display: block; margin-bottom: 0.5rem; font-weight: 600; color: #444; }
    
    input {
        width: 100%;
        padding: 0.75rem;
        border: 2px solid #eee;
        border-radius: 8px;
        font-size: 1rem;
        box-sizing: border-box;
        transition: border-color 0.2s;
    }

    input:focus { border-color: #0071dc; outline: none; }

    button[type="submit"] {
        width: 100%;
        padding: 0.75rem;
        background: #0071dc;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 700;
        cursor: pointer;
        transition: background 0.2s;
    }

    button[type="submit"]:hover { background: #005cb8; }

    .error { color: #d93025; font-weight: 600; text-align: center; font-size: 0.9rem; }

    .back-link-small {
        display: block;
        text-align: center;
        margin-top: 1.5rem;
        color: #666;
        text-decoration: none;
        font-size: 0.9rem;
    }

    /* Admin Styles */
    .admin-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
    }

    .header-actions {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    h1 {
        margin: 0;
        font-size: 1.5rem;
        color: #1a1a1a;
    }

    .subtitle {
        margin: 0.25rem 0 0;
        color: #666;
        font-size: 0.9rem;
    }

    .back-link, .logout-btn {
        color: #0071dc;
        text-decoration: none;
        font-weight: 600;
        padding: 0.5rem 1rem;
        background: white;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        border: none;
        cursor: pointer;
        font-size: 0.9rem;
    }

    .logout-btn { color: #d93025; }

    .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-bottom: 2rem;
    }

    .stat-card {
        background: white;
        padding: 1.5rem;
        border-radius: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    }

    .stat-label { color: #666; font-size: 0.875rem; }
    .stat-value { display: block; font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin-top: 0.5rem; }

    .table-container {
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        overflow: hidden;
    }

    table { width: 100%; border-collapse: collapse; text-align: left; }
    th { background: #f8f9fa; padding: 1rem 1.5rem; font-weight: 600; color: #444; border-bottom: 1px solid #eee; }
    td { padding: 1rem 1.5rem; border-bottom: 1px solid #eee; color: #333; font-size: 0.9rem; }

    .username { font-weight: 600; color: #0071dc; }
    .login-info { display: flex; flex-direction: column; }
    .ago { font-size: 0.75rem; color: #999; }

    .status-badge {
        padding: 0.2rem 0.6rem;
        border-radius: 99px;
        font-size: 0.7rem;
        font-weight: 700;
        text-transform: uppercase;
        background: #e6f4ea;
        color: #1e7e34;
    }

    @media (max-width: 768px) {
        .admin-container { padding: 1rem; }
        .table-container { overflow-x: auto; }
        header { flex-direction: column; align-items: flex-start; gap: 1rem; }
    }
</style>
