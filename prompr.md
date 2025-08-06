あなたは熟練のフルスタックエンジニアです。

Next.js（TypeScript）を用いて、最小限の機能を持つTodoアプリを実装してください。

## 要件
1. Next.jsのプロジェクトをVercel互換で作成（`npx create-next-app@latest --typescript`などを想定）
2. `pages/api/todos`以下に以下のエンドポイントを実装
   - `GET /api/todos`:
     - メモリ内のTodo一覧を返却（`{ id: number; title: string; completed: boolean; }[]`）
   - `POST /api/todos`:
     - リクエストボディに`{ title: string }`を受け取り、新規Todoを作成して返却（`id`は自動採番）
   - `PUT /api/todos/[id]`:
     - パスパラメータ`id`のTodoの`completed`フラグを反転して返却
   - `DELETE /api/todos/[id]`:
     - パスパラメータ`id`のTodoを削除し、空の応答を返却

3. フロントエンド（`pages/index.tsx`）
   - 上記APIと連携し、以下のUIを実装
     - Todo一覧表示
     - 新規Todo追加フォーム（テキスト入力＋追加ボタン）
     - Todo項目にチェックボックス（完了切替）と削除ボタンを付与

4. データは全てメモリ内で管理。永続化やDB接続は不要。
5. 最低限のスタイルは任意のCSSモジュールまたはTailwind CSSでOK。
6. フォルダ構成、主要ファイル（`package.json`、`tsconfig.json`、`pages/index.tsx`、`pages/api/todos/*`）を含めて出力してください。

## 出力形式
- プロジェクト構成ツリー
- 各ファイルの完全なソースコード
- 簡単なコメント付き