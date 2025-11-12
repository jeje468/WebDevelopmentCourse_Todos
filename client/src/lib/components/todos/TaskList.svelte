<script>
  import { onMount } from 'svelte';
  import { useTaskState } from "$lib/states/taskState.svelte.js";

  let { todoId } = $props();
  let taskState = useTaskState();

  const toggleTaskStatus = (taskId) => {
    taskState.toggleTask(todoId, taskId);
  };
</script>

<ul>
  {#each taskState.tasks[todoId] as task}
    <li>
      {#if task.is_done}
        <s>{task.description}</s>
      {:else}
        <a href={`/todos/${todoId}/tasks/${task.id}`}>{task.description}</a>
      {/if}
      <button onclick={() => toggleTaskStatus(task.id)}>
        {task.is_done ? 'Mark not done' : 'Mark done'}
      </button>
      <button onclick={() => taskState.removeTask(todoId, task.id)}>Remove</button>
    </li>
  {/each}
</ul>