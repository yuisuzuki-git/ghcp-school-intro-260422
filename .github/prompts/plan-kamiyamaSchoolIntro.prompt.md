# Plan: 神山まるごと高専 紹介ページ（GitHub Pages）

## TL;DR
素のHTML/CSS/JSのシンプル構成で、参考画像（チョコボールのうたLP）をベースにしたポップ＆ファンシーなデザインの1ページ紹介サイトを作る。日本語/英語切替対応、6セクション構成、GitHub Actionsで自動デプロイ。中高生向けに「徳島県神山町の全寮制テック起業家育成高専」の魅力が伝わる構成にする。

## Design Direction（参考画像の解釈）
- **配色**: ビビッド4〜5色の斜めブロック区切り（山吹/ミントグリーン/チェリーピンク/ラベンダー/クリーム）
- **タイポ**: 手書き風日本語フォント（例: Yomogi, Zen Kurenaido）＋丸ゴシック（M PLUS Rounded 1c）
- **装飾**: ドット/星/斜めストライプのSVGパターン、吹き出し、紙吹雪リボン、丸いピル型ボタン
- **モチーフ**: 神山の自然（山・川・杉・棚田）を小さなSVGキャラ/アイコンで散りばめる（チョコボールLPのキョロちゃん的な役割）
- **アニメ**: ふわっと浮き上がり、スクロール連動のフェードイン、ボタンhoverでバウンス

## Site Architecture
- 1ページのランディングページ（SPA的スクロール）
- 固定ヘッダー: ロゴ / ナビ / JA-EN切替
- フッター: 出典明記、SNSリンク、ライセンス

### セクション構成（上から順）
1. **Hero** — キャッチコピー「テクノロジー×デザイン×起業家精神で、未来をつくる。」背景に斜めカラーブロック＋散らしモチーフ、CTA 2つ（学校を知る/資料請求リンク）
2. **学校概要** — 「神山まるごと高専とは？」3カラムのカード（設立/所在地/全寮制5年制）＋吹き出しで補足
3. **特色・カリキュラム** — テクノロジー/デザイン/起業家精神の3本柱を斜めブロックで並べる、各柱にイラスト
4. **キャンパス/立地** — 徳島県神山町のビジュアル紹介、Mapリンク、周辺環境の説明
5. **学生生活・寮** — 全寮制の1日の流れをステップ形式（参考画像のStep1/2/3風カード）
6. **お問い合わせ/SNS** — 公式サイト/X/Instagram/YouTubeへのリンク、出典明記

## Tech Stack / Tooling
- 素のHTML/CSS/JS（ビルドステップなし）
- CSSはカスタムプロパティ（CSS変数）で配色管理、BEM命名
- Intersection Observer APIでスクロールアニメ
- Google Fontsで手書き風フォント読み込み
- SVGアイコン/パターンは`assets/`にインライン格納
- i18n: `data-i18n`属性 + `ja.json`/`en.json`をfetchする軽量自作実装

## Deployment
- GitHub Actions `.github/workflows/deploy.yml`
- `actions/configure-pages` → `actions/upload-pages-artifact` → `actions/deploy-pages`
- `main`ブランチへのpushで自動デプロイ
- ビルド不要なのでルート直下をそのままアーティファクト化

## Steps

### Phase 1: 土台構築
1. `package.json`相当は作らず、静的ファイル運用。`.gitignore`を追加（`.DS_Store`, `node_modules/`予備）
2. ディレクトリ構成を用意（並列可）
   - `index.html`（ルート）
   - `assets/css/style.css`
   - `assets/js/main.js`, `assets/js/i18n.js`
   - `assets/img/`（SVGパターン・イラスト）
   - `assets/i18n/ja.json`, `assets/i18n/en.json`
3. `.github/workflows/deploy.yml`を追加（GitHub Pages自動デプロイ）
4. リポジトリ設定で Pages を「GitHub Actions」ソースに切替（手動/ユーザー作業）

### Phase 2: デザイン基盤
5. `style.css`にデザイントークン定義（CSS変数で配色・フォント・間隔）
6. 斜めブロック背景、ドット/ストライプSVGパターン、共通ボタン/カード/吹き出しコンポーネントのCSSを作成
7. Google Fonts読み込み（Yomogi, Zen Kurenaido, M PLUS Rounded 1c）

### Phase 3: コンテンツ実装（Phase 2完了後、5〜9は並列可）
8. Heroセクション実装
9. 学校概要セクション実装
10. 特色・カリキュラムセクション実装
11. キャンパス/立地セクション実装
12. 学生生活・寮セクション実装
13. お問い合わせ/SNSセクション＋フッター実装

### Phase 4: 仕上げ
14. i18n実装（`data-i18n`属性スキャン→JSON読み込み→差し替え）とJA/ENトグル
15. スクロールアニメ（Intersection Observer）、スムーススクロールナビ
16. レスポンシブ調整（モバイル優先でブレークポイント 640/960px）
17. `README.md`に開発/デプロイ手順を追記
18. アクセシビリティ確認（alt、コントラスト、見出しレベル、キーボード操作）

### Phase 5: 検証
19. ローカル確認（`python3 -m http.server` もしくは VSCode Live Server）
20. GitHub Pagesにデプロイして本番確認

## Relevant Files
- `index.html` — 全セクションのマークアップ、i18n属性付与
- `assets/css/style.css` — デザイントークン、斜めブロック、パターン、コンポーネント
- `assets/js/main.js` — スクロールアニメ、ナビ制御
- `assets/js/i18n.js` — 言語切替ロジック
- `assets/i18n/ja.json`, `assets/i18n/en.json` — テキスト辞書
- `assets/img/` — SVGパターン・イラスト
- `.github/workflows/deploy.yml` — Pages自動デプロイ
- `.gitignore`
- `README.md` — 運用手順追記

## Verification
1. ローカルサーバー（`python3 -m http.server 8000`）で`index.html`を開き、全セクション描画・斜めブロック・装飾表示を目視確認
2. ブラウザDevToolsでモバイル幅（375px）/タブレット（768px）/PC（1280px）を切替、レイアウト崩れなきこと
3. JA/ENトグルで全見出し/本文が切り替わること
4. ナビクリックで該当セクションへスムーススクロールすること
5. Lighthouseでアクセシビリティ90+、パフォーマンス90+を目安に確認
6. `main`ブランチへpush後、Actionsが成功し `https://<owner>.github.io/<repo>/` で表示されること

## Decisions
- **ビルドツールなし**: ユーザー選択「素のHTML/CSS/JS」に従い、Astro導入は見送り。devcontainerのAstro設定は使わないが、破棄もしない
- **コンテンツ方針**: ダミーテキスト＋公式公開情報の要約で構築。フッターに「※本サイトは紹介目的の非公式サンプルです」と明記し、公式サイトへの誘導を徹底
- **対象**: 中高生向けに平易な日本語、絵文字的SVG多用、専門用語は吹き出しで解説
- **画像素材**: 著作権リスクを避け、実写写真は使わず**SVGイラスト+パターンのみ**で構成。必要な写真表現はプレースホルダ（グラデ矩形）で示唆
- **i18n**: 軽量自作（データ量が少ないため外部ライブラリ不要）

## Further Considerations
1. **ドメイン**: カスタムドメインを使うか？ 推奨は**そのままの `github.io` サブパス運用**（CNAME/DNS不要）。後でカスタム化も可能
2. **ロゴ**: 神山まるごと高専の公式ロゴは商標なので使わず、**テキストロゴ＋独自装飾**で代用する方針でよいか？（推奨）
3. **公式情報の扱い**: 公式サイトURLをフッターに明示し、本サイトは**非公式の紹介デモ**である旨を明記する方針でよいか？（推奨・法務リスク低減）
