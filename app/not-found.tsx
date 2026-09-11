import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-[76rem] flex-col justify-center px-5 py-20 sm:px-8">
      <p className="label-mono text-[var(--accent)]">404 — Halaman tidak ditemukan</p>
      <h1 className="display-hero mt-6 text-[clamp(4rem,14vw,11rem)]">Nyasar.</h1>
      <div className="mt-8 max-w-md border-t-2 border-[var(--foreground)] pt-6">
        <p className="leading-relaxed text-[var(--ink-soft)]">
          Alamat yang kamu buka tidak ada di website ini. Mungkin salah ketik, atau
          halamannya sudah tidak ada.
        </p>
        <p className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/"
            className="label-mono bg-[var(--foreground)] px-5 py-3 text-[var(--background)] transition-colors hover:bg-[var(--accent)]"
          >
            Kembali ke beranda
          </Link>
          <Link
            href="/#contact"
            className="label-mono border border-[var(--foreground)] px-5 py-3 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            Hubungi saya
          </Link>
        </p>
      </div>
    </main>
  );
}
