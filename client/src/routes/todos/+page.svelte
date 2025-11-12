<script>
    import TodoForm from "$lib/components/todos/TodoForm.svelte";
    import TodoList from "$lib/components/todos/TodoList.svelte";
    import { initTodos } from "$lib/states/todoState.svelte.js";
    import { useAuthState } from "$lib/states/authState.svelte.js";

    const authState = useAuthState();
    $effect(() => {
        initTodos();
    });
</script>

{#if authState.user}

    <h1>Todos</h1>

    <TodoList />

    <h2>Add a Todo</h2>

    <TodoForm />
{:else}
  <p>Please <a href="/auth/login">log in</a> to view your todos.</p>
{/if}