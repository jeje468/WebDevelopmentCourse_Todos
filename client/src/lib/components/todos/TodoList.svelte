<script>
  import { useTodoState } from "$lib/states/todoState.svelte.js";

  let todoState = useTodoState();
</script>

<ul>
  {#each todoState.todos as todo}
    <li>
      <a href={`/todos/${todo.id}`}>{todo.name}</a>
      <button onclick={() => todoState.remove(todo)}>Remove</button>
    </li>
  {/each}
</ul>