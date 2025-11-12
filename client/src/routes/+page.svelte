<script>
  import { authFetch } from "$lib/utils/fetchUtils.js";
  import { PUBLIC_API_URL } from "$env/static/public";
  import { useAuthState } from "$lib/states/authState.svelte.js";

  const auth = useAuthState();

  let message = null;
</script>

{#if auth.user}
  <a href="/todos">Go to your todos</a>
{:else}
  <p>Hello anonymous!</p>
{/if}