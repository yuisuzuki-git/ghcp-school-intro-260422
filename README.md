# 神山まるごと高専 紹介ページ（非公式）

神山まるごと高専を紹介する、日英対応の静的Webページです。
本リポジトリは **非公式の紹介ページ** であり、ニュースやプロフィールにはダミーデータを含みます。

## プロジェクト概要

- 日本語ページ: `index.html`
- 英語ページ: `en/index.html`
- スタイル: `assets/css/styles.css`
- スクリプト: `assets/js/main.js`
- 画像差し替えガイド: `assets/images/README.md`

## ローカルでの確認方法

以下のどちらかでローカルサーバーを起動し、ブラウザで確認してください。

### Python 3 を使う場合

```bash
python3 -m http.server 8080
```

### Python の `python` コマンドを使う場合

```bash
python -m http.server 8080
```

起動後に以下へアクセスします。

- 日本語: `http://localhost:8080/`
- 英語: `http://localhost:8080/en/`

## GitHub Pages の有効化手順

1. GitHubで対象リポジトリを開く
2. `Settings` を開く
3. 左メニューの `Pages` を開く
4. `Source` で `Deploy from a branch` を選択
5. `Branch` を `main`、フォルダを `/ (root)` に設定
6. `Save` を押す

公開反映には数分かかることがあります。

## 公開後のURL形式

通常は以下の形式になります。

`https://<GitHubユーザー名>.github.io/ghcp-school-intro-260422/`

英語ページは以下です。

`https://<GitHubユーザー名>.github.io/ghcp-school-intro-260422/en/`

## 運用時の注意

- 本ページは非公式紹介ページです。
- 募集要項や最新情報は必ず公式サイトで確認してください。
- 画像はプレースホルダー運用を前提としており、`assets/images/` に同名ファイルを置くことで差し替えできます。