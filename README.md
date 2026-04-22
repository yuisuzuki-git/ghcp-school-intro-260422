# ghcp-school-intro

神山まるごと高専をテーマにした、ポップ＆ファンシーなデザインの紹介ページのサンプルなのだ。素のHTML/CSS/JSで作って、GitHub Pagesに公開することを想定しているのだ。

> ⚠️ **非公式デモ**: このサイトは神山まるごと高専の公式サイトではないのだ。GitHub Copilot を使ったデザインサンプルとして作っていて、情報の正確性は保証しないのだ。正確な情報は [公式サイト](https://kamiyama.ac.jp/) で確認してほしいのだ。

## 構成

```
index.html                  メインページ
assets/
  css/style.css             デザイントークンと斜めブロック・カード等
  js/main.js                スクロールアニメとスムーススクロール
  js/i18n.js                JA/EN 切替のロジック
  i18n/ja.json              日本語辞書
  i18n/en.json              英語辞書
  img/*.svg                 SVG モチーフ
.github/workflows/deploy.yml  GitHub Pages 自動デプロイ
```

## 開発（ローカル確認）

ビルドステップは不要なのだ。任意の静的サーバーで配信すれば見られるのだ。

```bash
# Python がある場合
python3 -m http.server 8000

# Node がある場合
npx --yes serve .
```

Dev container 上で作業している場合は、ポート 8000 を転送すればブラウザから確認できるのだ。

## デプロイ

`main` ブランチへのpushで GitHub Actions が自動的に GitHub Pages にデプロイするのだ。

初回だけ、リポジトリの **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に切り替えてほしいのだ。切替後、`main` にマージすれば `https://<owner>.github.io/<repo>/` に公開されるのだ。

## デザイン方針

- ビビッドな配色を**斜めブロック**で切り替える構成
- **手書き風フォント**（Yomogi / Zen Kurenaido）＋丸ゴシック（M PLUS Rounded 1c）
- ドット・星・ストライプの**SVGパターン**と**吹き出し**・**ピル型ボタン**
- 著作権リスクを避けるため、実写写真は使わず SVG とグラデーションのみで構成

## カスタマイズ

- 配色は `assets/css/style.css` 冒頭の CSS カスタムプロパティ（`--c-*`）で一元管理しているのだ
- テキストは `assets/i18n/ja.json` / `assets/i18n/en.json` を編集すれば置き換わるのだ
- 要素に `data-i18n="キー"` を付けるだけで多言語対応できるのだ