<script>
    import Task from "$lib/components/todos/Task.svelte";

  let { data } = $props();

  let todoId = $derived(parseInt(data.todoId));
  let taskId = $derived(parseInt(data.taskId));
</script>

<Task todoId={todoId} taskId={taskId} />