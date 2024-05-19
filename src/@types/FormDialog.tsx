type Props = {
  test: string;
  onSubmit: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const FormDialog = (props: Props) => {
  <form
    onSubmit={(e) => {
      e.preventDefault();
      props.onSubmit();
    }}
  >
    <input
      type="text"
      placeholder="タスクを入力"
      // textステートが持っている入力中のテキストをvalueとして表示
      value={props.text}
      // onChangeイベント(入力テキストの変化)をtextステートに反映
      onChange={props.onChange()}
    />

    <input type="submit" value="追加" onSubmit={props.onSubmit()} />
  </form>;
};
