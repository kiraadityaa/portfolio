// ─────────────────────────────────────────────────────────────
// LOG BULANAN — "Sedang dipelajari"
//
// Cara update tiap bulan: cukup ubah nilai di bawah ini.
// Tidak perlu menyentuh komponen apa pun.
// Contoh: ganti `value` Python dengan topik baru, lalu ubah
// `updated` ke bulan berjalan. Commit + deploy, selesai.
// ─────────────────────────────────────────────────────────────

export const NOW_UPDATED = "Agustus 2026";

export const NOW_ITEMS = [
  {
    label: "System",
    value: "Debian",
    note: "daily driver",
    href: "https://www.debian.org",
  },
  {
    label: "Python",
    value: "Modul & library",
    note: "pip, modul standar, eksplorasi library",
    href: "https://docs.python.org/3/tutorial/modules.html",
  },
  {
    label: "Reading",
    value: "Dokumentasi Python",
    note: "docs.python.org — dibaca pelan-pelan",
    href: "https://docs.python.org",
  },
] as const;
