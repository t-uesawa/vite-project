type Props = {
  todos: Todo[];
  filter: Filter;
  onTodo: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
};

export const TodoItem = (props: Props) => {
  // 選択されたフィルターに一致するタスクを返す
  const filteredTodos = props.todos.filter((todo) => {
    // 条件に一致したタスクのみを返す
    switch (props.filter) {
      case "all":
        // 削除されていないものを返す
        return !todo.removed;
      case "checked":
        // 完了済みかつ、削除されていないもの
        return todo.checked && !todo.removed;
      case "unchecked":
        // 未完了かつ、削除されていないもの
        return !todo.checked && !todo.removed;
      case "removed":
        // 削除されているもの
        return todo.removed;
      default:
        // それ以外はあり得ないが一応すべて返す
        return todo;
    }
  });

  return (
    <ul>
      {/* {todos.map((todo) => { */}
      {/** フィルタリングしたタスク一覧を表示 */}
      {filteredTodos.map((todo) => {
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={todo.removed}
              checked={todo.checked}
              // 呼び出す際にチェック状態の反転を渡す
              onChange={() => props.onTodo(todo.id, "checked", !todo.checked)}
            />
            <input
              type="text"
              disabled={todo.checked || todo.removed}
              value={todo.value}
              onChange={(e) => props.onTodo(todo.id, "value", e.target.value)}
            />
            <button
              onClick={() => props.onTodo(todo.id, "removed", !todo.removed)}
            >
              {todo.removed ? "復元" : "削除"}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
