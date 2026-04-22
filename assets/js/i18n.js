// i18n: 軽量自作の辞書差し替えロジック
const SUPPORTED = ["ja", "en"];
const STORAGE_KEY = "kamiyama-lang";

async function loadDict(lang) {
  const res = await fetch(`./assets/i18n/${lang}.json`, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Failed to load ${lang}.json`);
  return res.json();
}

function applyDict(dict) {
  document.documentElement.lang = dict.__lang || document.documentElement.lang;

  // text nodes
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) {
      // preserve child nodes if key ends with "-html"
      el.textContent = dict[key];
    }
  });

  // attributes: data-i18n-attr="title:hero.title.1,aria-label:foo"
  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const pairs = el.getAttribute("data-i18n-attr").split(",");
    pairs.forEach((pair) => {
      const [attr, key] = pair.split(":").map((s) => s.trim());
      if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    });
  });

  // document title & meta description
  if (dict["meta.title"]) document.title = dict["meta.title"];
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && dict["meta.description"]) {
    metaDesc.setAttribute("content", dict["meta.description"]);
  }
}

function detectInitialLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED.includes(saved)) return saved;
  const nav = (navigator.language || "ja").toLowerCase();
  return nav.startsWith("ja") ? "ja" : "en";
}

async function setLang(lang) {
  if (!SUPPORTED.includes(lang)) return;
  const dict = await loadDict(lang);
  dict.__lang = lang;
  applyDict(dict);
  localStorage.setItem(STORAGE_KEY, lang);
  document.documentElement.lang = lang;
  // toggle pressed state
  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.langBtn === lang ? "true" : "false");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const initial = detectInitialLang();
  setLang(initial);

  document.querySelectorAll("[data-lang-btn]").forEach((btn) => {
    btn.addEventListener("click", () => setLang(btn.dataset.langBtn));
  });
});
