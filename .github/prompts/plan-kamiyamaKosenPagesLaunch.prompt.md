# Plan: 神山まるごと高専 紹介ページの仕上げと公開

既存の日英ページ（ネイビー×白×ゴールド基調、5セクション構成）を土台に、(1) 4つの新セクション追加 × 日英同期、(2) デザインの磨き込み、(3) GitHub Pages（`main` ブランチ／ルート）での公開手順整備を行う。画像はプレースホルダーのまま、後から差し替え可能な構造を維持する。

## Phase 1 — コンテンツ追加（日英同期）
1. `index.html` と `en/index.html` に以下を同じ順序で追加し、ヘッダナビにもアンカーを追加：
   - `#news`（お知らせ）：最新3件のダミーエントリ（日付／タイトル／抜粋）をカード状に表示
   - `#curriculum`（カリキュラム例）：5学年ぶんのテーマを並べる縦型タイムライン風レイアウト＋「1日の時間割の例」サブブロック
   - `#voices`（学生・卒業生の声）：引用カード3枚（名前／学年 or 卒業年度／一言）
   - `#admissions`（入学・募集要項）：公式サイトの募集要項ページへの外部リンクと、短い案内文／ボタン
2. 既存フッター／ナビの順序を再設計：`About → Features → Curriculum → Campus → Voices → News → Access → Admissions`（英語側も同じ見出し key で整合）。*depends on step 1*

## Phase 2 — デザイン磨き込み
3. `assets/css/styles.css` に最小限の新規スタイルを追記（既存トークン `--color-navy / --color-accent / --radius-lg` を再利用）：
   - `.timeline`（カリキュラム）、`.news-list`＋`.news-item`、`.voice-card`（引用／アクセントボーダー）、`.cta-band`（募集要項 CTA 帯）
   - 既存 `.feature` カードのホバー表現にあわせて統一感を保つ
4. 既存の微調整：ヒーローの余白バランス、`.section-title` と `.section-eyebrow` のコントラスト、スマホ時のナビ項目増加に対応した折返し。`prefers-reduced-motion` 対応、スキップリンク、フォーカスリング強調も含める。*parallel with step 3*

## Phase 3 — 公開準備
5. `README.md` を整備：プロジェクト概要／ローカル確認方法（`python -m http.server` など）／**GitHub Pages 有効化手順**（Settings → Pages → Source: Deploy from a branch → Branch: `main` / `/ (root)`）／公開後の URL 形式／非公式ページである旨。
6. SEO／OG 補強：`index.html` に `og:image`／`twitter:card`（画像はプレースホルダーパスで記述、実ファイルは後で差し替え）、`en/index.html` にも同等の OG、両ページに `<link rel="alternate" hreflang>` を相互に追加。*parallel with step 5*
7. `.nojekyll` を追加（将来 `_` 始まりのパスを使ったときの保険）。*parallel with step 5*

## Phase 4 — 公開
8. `first_pages` ブランチで上記をコミット → PR 作成 → `main` にマージ → GitHub の Settings から Pages を有効化（手順は README 参照、実際の操作はユーザーが実施）。

## Relevant files
- `index.html` — ナビ項目追加、4 セクション追加、OG/hreflang 補強
- `en/index.html` — 日本語と同構造で英語版を同期
- `assets/css/styles.css` — `.timeline` / `.news-list` / `.voice-card` / `.cta-band` を追記、既存トークン流用
- `assets/js/main.js` — 必要に応じスムーズスクロールの微調整（大きな変更なし）
- `README.md` — 概要／ローカル確認／Pages 有効化手順を記載
- `.nojekyll`（新規）
- `assets/images/README.md` — 差し替え対象の画像ファイル名と推奨サイズを列挙

## Verification
1. ローカルで `python3 -m http.server 8080` を起動し、`/` と `/en/` を開いて全セクションの表示・アンカー遷移・言語切替（JA ⇄ EN）を確認
2. Chrome DevTools のレスポンシブで 375px / 768px / 1280px を確認（ナビ開閉、グリッド段組崩れなし）
3. Lighthouse（Accessibility / Best Practices / SEO ≥ 90 を目安）を実行
4. 外部リンク（公式サイト、Instagram、募集要項）が新規タブで開き `rel="noopener"` が付いていることを確認
5. `main` へマージ後、`https://<user>.github.io/ghcp-school-intro-260422/` で公開を目視確認

## Decisions
- 画像は当面プレースホルダー（CSS グラデ）。差し替えは `assets/images/` に投入するだけで反映できる構造を維持。
- コンテンツは「非公式紹介ページ」である旨をフッターに継続明記。実データ（ニュース日付／学生の声の氏名等）はダミーとし、実運用前に差し替え前提でコメント注記を入れる。
- 公開方式は GitHub Actions ではなく `main` ブランチからの従来型 Pages 配信（設定がシンプルで README の手順が短くなるため）。
- 学生・卒業生の声は許諾不要のダミーのみ。
- アクセシビリティ強化（`prefers-reduced-motion`／スキップリンク／フォーカスリング）を Phase 2 に含める。
