<script>
  import { useTaskState } from "$lib/states/taskState.svelte.js";
  import { browser } from "$app/environment";

  let { todoId, taskId } = $props();
  let taskState = useTaskState();

  let task = taskState.tasks[todoId]?.find(t => t.id == taskId);
  console.log(task);
</script>

<h1>{task? task.description : "Loading..."}</h1>