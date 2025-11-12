<script>
  import { goto } from "$app/navigation";
  import { useAuthState } from "$lib/states/authState.svelte.js";

  let { data } = $props();
  let message = $state("");
  let errorMessage = $state("");
  let isLoading = $state(false);

  const authState = useAuthState();

  const handleForm = async (e) => {
    e.preventDefault();
    errorMessage = "";
    message = "";
    isLoading = true;

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      if (data.action === "login") {
        await authState.login(email, password);
        message = "Login successful! Redirecting...";
        setTimeout(() => goto("/"), 1000);
      } else {
        console.log("Submitting registration for:", email);
        await authState.register(email, password);
        message = "Registration successful! You can now log in.";
        setTimeout(() => goto("/auth/login"), 2000);
      }
    } catch (error) {
      errorMessage = error.message;
    } finally {
      isLoading = false;
    }
  };
</script>

<div class="max-w-md mx-auto">
  <h2 class ="text-2xl font-bold text-primary-900 mb-6">
    {data.action === "login" ? "Login" : "Register"}
  </h2>

  {#if message}
    <div class = "card preset-filled-error p-4 mb-4">
      <p>{message}</p>
    </div>
  {/if}

  {#if errorMessage}
    <div>
      <p>{errorMessage}</p>
    </div>
  {/if}

  <form class="space-y-4" onsubmit={handleForm}>
    <label class="label" for="email">
      <span class="label-text">Email</span>
      <input
        class="input"
        id="email"
        name="email"
        type="email"
        placeholder="user@example.com"
        required
      />
    </label>
    <br />
    <label class="label" for="password">
      <span class="label-text">Password</span>
      <input
        class="input"
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        required
      />
    </label>
    <br />
    <button class="w-full btn preset-filled-primary-500" type="submit" disabled={isLoading}>
      {isLoading
        ? "Please wait..."
        : data.action === "login"
          ? "Login"
          : "Register"}
    </button>
  </form>

  {#if data.action === "login"}
    <p class="text-center mt-6 text-sm">
      Don't have an account? <a class="anchor" href="/auth/register">Register here</a>
    </p>
  {:else}
    <p class="text-center mt-6 text-sm">
      Already have an account? <a class="anchor" href="/auth/login">Login here</a>
    </p>
  {/if}
</div>