import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

// ルートの設定
const root = createRoot(document.getElementById("root") as Element); // 型アサーション
// createRoot(document.getElementById('root')!); でも可

// Appコンポーネントをレンダリング
root.render(
  // 内部コンポーネントを検査
  <StrictMode>
    <App />
  </StrictMode>
);
