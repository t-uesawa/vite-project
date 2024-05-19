import { useState } from "react";

// Appコンポーネント(JSX)
export const App = () => {
  // 入力された文字列を記憶させる「useState」を用意
  const [text, setText] = useState("");
  // タスクリストのステートを用意 !useState<>は型指定 ([])は初期値
  const [todos, setTodos] = useState<Todo[]>([]);
  // フィルター状態を記憶させるステートを用意(初期値all)
  const [filter, setFilter] = useState<Filter>("all");

  // textステートを更新する関数
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // todosステートを追加する関数
  const handleSubmit = () => {
    // 何も入力されていなければreturn
    if (!text) return;

    // 新しいTodoを作成
    const newTodo: Todo = {
      // textステートの値をTodoオブジェクトのvalueプロパティへ
      value: text,
      id: new Date().getTime(),
      checked: false,
      removed: false,
    };

    /**
     * 更新前のtodosステートを元に
     * スプレッド構文で展開した要素へ
     * newTodoを加えた新しい配列でステートを更新
     */
    setTodos((todos) => [newTodo, ...todos]);
    // フォームの入力値をクリア
    setText("");
  };

  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      // ステートに保管されてるタスクをすべて回し編集したいタスクのIDと一致するvalueを書き換える
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          /**
           * シャローコピー
           * todoオブジェクトをコピー・展開し
           * その中でvalueプロパティを引数で上書きする
           * ※オリジナルを変更しないでステートの中身だけを変更する
           */
          return { ...todo, [key]: value };
        } else {
          return todo;
        }
      });
      return newTodos;
    });
  };

  // フィルター状態を
  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };

  // ゴミ箱を空にする関数
  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  // 選択されたフィルターに一致するタスクを返す
  const filteredTodos = todos.filter((todo) => {
    // 条件に一致したタスクのみを返す
    switch (filter) {
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
    <div>
      {/** as Filter でstring型からFilter型へ変換 */}
      <select
        defaultValue="all"
        onChange={(e) => handleSort(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {/** フィルターが'remove'のとき「ゴミ箱を空にする」ボタンを表示 */}
      {filter === "removed" ? (
        <button
          disabled={todos.filter((todo) => todo.removed).length === 0}
          onClick={handleEmpty}
        >
          ごみ箱を空にする
        </button>
      ) : (
        // フィルターが'完了済み'以外はタスク入力フォームを表示する
        filter !== "checked" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input
              type="text"
              placeholder="タスクを入力"
              // textステートが持っている入力中のテキストをvalueとして表示
              value={text}
              // onChangeイベント(入力テキストの変化)をtextステートに反映
              onChange={(e) => handleChange(e)}
            />

            <input type="submit" value="追加" onSubmit={handleSubmit} />
          </form>
        )
      )}

      {/** タスクリスト表示 */}
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
                onChange={() => handleTodo(todo.id, "checked", !todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleTodo(todo.id, "value", e.target.value)}
              />
              <button
                onClick={() => handleTodo(todo.id, "removed", !todo.removed)}
              >
                {todo.removed ? "復元" : "削除"}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
