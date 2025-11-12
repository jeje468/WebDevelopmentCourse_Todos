<script>
    import { useTaskState } from "$lib/states/taskState.svelte.js";
    let taskState = useTaskState();

    let { todoId } = $props();

    const addTask = (e) => {
        e.preventDefault();

        const task = Object.fromEntries(new FormData(e.target));
        task.is_done = task.is_done === 'on';

        taskState.addTask(todoId, task);
        e.target.reset();
    };
</script>

<form onsubmit={addTask}>
    <label>
        Task description
        <input
            name="description"
            type="text"
            placeholder="Task description"
        />
    </label>
    <br />
    <label>
        <input
            name="is_done"
            type="checkbox"
        />
        Is done
    </label>
    <br />
    <input type="submit" value="Add Task" />
</form>