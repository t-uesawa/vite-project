import { useState } from "react";
import { FormDialog } from "./FormDialog";
import { ActionButton } from "./ActionButton";
import { SideBar } from "./SideBar";
import { TodoItem } from "./TodoItem";
import { ToolBar } from "./ToolBar";
import { GlobalStyles } from "@mui/material";

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

  return (
    <div>
      <GlobalStyles styles={{ body: { margin: 0, padding: 0 } }}></GlobalStyles>
      <ToolBar filter={filter} />
      <SideBar onSort={handleSort}></SideBar>
      <FormDialog text={text} onChange={handleChange} onSubmit={handleSubmit} />
      <ActionButton todos={todos} onEmpty={handleEmpty}></ActionButton>
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo}></TodoItem>
    </div>
  );
};
