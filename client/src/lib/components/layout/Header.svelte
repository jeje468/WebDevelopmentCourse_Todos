<script>
  import { useAuthState } from "$lib/states/authState.svelte.js";
  let authState = useAuthState();
</script>
<header class="flex items-center bg-primary-100 p-4 mb-6">
  {#if authState.user}
    <div>
      <span>
        Hello, {authState.user.email}!
        {#if authState.user.roles?.length}
          (Roles: {authState.user.roles.join(", ")})
        {/if}
      </span>
      {#if authState.user.roles?.includes("ADMIN")}
        <ul>
          <li><a href="/admin">Admin</a></li>
        </ul>
      {/if}
      <button onclick={() => authState.logout()}>Logout</button>
    </div>
  {:else}
    <ul>
      <li><a href="/auth/login">Login</a></li>
      <li><a href="/auth/register">Register</a></li>
    </ul>
  {/if}
</header>

