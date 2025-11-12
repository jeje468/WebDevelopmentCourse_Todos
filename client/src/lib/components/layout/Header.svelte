<script>
  import { useAuthState } from "$lib/states/authState.svelte.js";
  let authState = useAuthState();
</script>
<header class="flex flex-col sm:flex-row sm:items-center bg-primary-100 p-4 mb-6">
  <span class="text-lg md:text-xl text-primary-900 mb-2 sm:mb-0">Todo App</span>
  <div class="sm:ml-4">
    {#if authState.user}
      <div class="flex flex-col sm:flex-row sm:items-center gap-2">
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
        <button class="btn btn-sm variant-filled-secondary" onclick={() => authState.logout()}>Logout</button>
      </div>
    {:else}
      <ul class="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <li><a class="anchor" href="/auth/login">Login</a></li>
        <li><a class="anchor" href="/auth/register">Register</a></li>
      </ul>
    {/if}
  </div>
</header>

