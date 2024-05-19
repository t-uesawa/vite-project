// タスクのひな型(Todo型オブジェクト)
declare type Todo = {
  value: string;
  readonly id: number; // 読み取り専用Key
  checked: boolean; // 完了状態
  removed: boolean; // 削除状態
};
