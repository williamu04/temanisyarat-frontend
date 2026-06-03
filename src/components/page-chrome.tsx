import Link from "next/link";
import type { ReactNode } from "react";

import logoGroupSmall from "../../assets/logo/Logo Group small.svg";
import arrowForward from "../../assets/web/icons/arrow-forward.svg";
import hamburgerMenu from "../../assets/web/icons/hamburger-menu.svg";
import instagramLogo from "../../assets/web/icons/instagram-logo.svg";
import whatsappLogo from "../../assets/web/icons/whatsapp-logo.svg";
import githubLogo from "../../assets/web/icons/github-logo.svg";
import googlePlayBadge from "../../assets/web/icons/get-it-on-google-play.webp";

export type AssetSource = string | { src: string };

export type NavItem = {
  label: string;
  href: string;
  external?: boolean;
};

export const primaryNavLinks: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Artikel", href: "/artikel" },
  { label: "GERKATIN Solo", href: "/artikel/tentang-gerkatin" },
  { label: "Kode Sumber", href: "https://github.com/temanisyarat/", external: true },
  { label: "Dataset", href: "https://github.com/temanisyarat/dataset", external: true },
];

const footerNavLinks: NavItem[] = [
  { label: "Beranda", href: "/" },
  { label: "Artikel", href: "/artikel" },
  { label: "Tentang Kami", href: "/tentang" },
];

const footerAppLinks: NavItem[] = [
  { label: "Kode Sumber", href: "https://github.com/temanisyarat/", external: true },
  { label: "Dokumentasi", href: "https://github.com/temanisyarat/manager", external: true },
  { label: "Dataset", href: "https://github.com/temanisyarat/dataset", external: true },
];

const footerProjectLinks: NavItem[] = [
  { label: "Latar Belakang", href: "/artikel/tentang-gerkatin" },
  { label: "Metodologi", href: "/artikel/tentang-gerkatin" },
  { label: "Pengembangan Lebih Lanjut", href: "/artikel/tentang-gerkatin" },
];

function resolveAssetSrc(asset: AssetSource) {
  return typeof asset === "string" ? asset : asset.src;
}

export function InlineImage({
  src,
  alt,
  className,
}: {
  src: AssetSource;
  alt: string;
  className?: string;
}) {
  return <img src={resolveAssetSrc(src)} alt={alt} className={className} />;
}

export function SmartLink({
  href,
  className,
  children,
  external,
  ariaLabel,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  external?: boolean;
  ariaLabel?: string;
}) {
  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer" aria-label={ariaLabel}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

export function ActionButton({
  href,
  children,
  tone,
  arrow = false,
  className,
}: {
  href: string;
  children: ReactNode;
  tone: "dark" | "blue" | "light";
  arrow?: boolean;
  className?: string;
}) {
  const toneClasses = {
    dark: "bg-[#111111] text-white hover:bg-[#272727]",
    blue: "bg-[#0000cc] text-white hover:bg-[#09096f]",
    light: "bg-white text-[#0000cc] ring-1 ring-inset ring-[#0000cc]/15 hover:bg-[#f7f8ff]",
  };

  return (
    <SmartLink
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[16px] font-medium leading-none transition-colors ${toneClasses[tone]} ${className ?? ""}`}
    >
      <span>{children}</span>
      {arrow ? <InlineImage src={arrowForward} alt="" className="h-3.5 w-3.5 shrink-0" /> : null}
    </SmartLink>
  );
}

export function SectionTitle({ children, accent = true }: { children: ReactNode; accent?: boolean }) {
  return (
    <h2
      className={`text-center text-[clamp(1.75rem,2vw,2rem)] font-semibold leading-none tracking-tight ${
        accent ? "text-[#09096f]" : "text-[#111111]"
      }`}
    >
      {children}
    </h2>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-black/5 bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-32">
        <SmartLink href="/" className="inline-flex shrink-0 items-center">
          <InlineImage src={logoGroupSmall} alt="TemanIsyarat" className="h-auto w-[140px]" />
        </SmartLink>

        <nav className="hidden items-center gap-2 lg:flex">
          {primaryNavLinks.map((link) => (
            <SmartLink
              key={link.label}
              href={link.href}
              external={link.external}
              className="rounded-2xl px-4 py-3 text-[14px] font-medium text-[#111111] transition hover:bg-black/5"
            >
              {link.label}
            </SmartLink>
          ))}
        </nav>

        <details className="relative lg:hidden">
          <summary className="inline-flex cursor-pointer items-center justify-center rounded-full p-2 transition hover:bg-black/5">
            <span className="sr-only">Buka menu navigasi</span>
            <InlineImage src={hamburgerMenu} alt="" className="h-6 w-6" />
          </summary>

          <div className="absolute right-0 top-full z-20 mt-3 w-64 rounded-3xl border border-black/5 bg-white p-3 shadow-[0_16px_50px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col gap-1">
              {primaryNavLinks.map((link) => (
                <SmartLink
                  key={link.label}
                  href={link.href}
                  external={link.external}
                  className="rounded-2xl px-4 py-3 text-[14px] font-medium text-[#111111] transition hover:bg-black/5"
                >
                  {link.label}
                </SmartLink>
              ))}
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}

function FooterLinkColumn({ title, links }: { title: string; links: NavItem[] }) {
  return (
    <div className="min-w-[140px] space-y-3 p-4">
      <p className="text-[14px] font-bold leading-none text-[#111111]">{title}</p>
      <div className="space-y-3">
        {links.map((link) => (
          <SmartLink key={link.label} href={link.href} external={link.external} className="block text-[14px] font-medium text-[#111111]">
            {link.label}
          </SmartLink>
        ))}
      </div>
    </div>
  );
}

function SocialIconLink({ href, src, label }: { href: string; src: AssetSource; label: string }) {
  return (
    <SmartLink
      href={href}
      external={href.startsWith("http")}
      ariaLabel={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#111111] transition hover:bg-black/5"
    >
      <InlineImage src={src} alt="" className="h-5 w-5" />
    </SmartLink>
  );
}

export function ArticleDetailFooter() {
  return (
    <footer className="bg-[#eeeeee]">
      <div className="mx-auto max-w-[1150px] px-6 pb-4 pt-8 sm:px-10 lg:px-[300px]">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap gap-2">
            <FooterLinkColumn title="Navigasi" links={footerNavLinks} />
            <FooterLinkColumn title="Aplikasi" links={footerAppLinks} />
            <FooterLinkColumn title="Tentang Kegiatan" links={footerProjectLinks} />
          </div>

          <div className="space-y-6">
            <div className="inline-flex max-w-[240px]">
              <InlineImage src={googlePlayBadge} alt="Get it on Google Play" className="h-auto w-full" />
            </div>

            <div className="space-y-4">
              <p className="text-[16px] font-semibold leading-none text-[#111111]">Get in Touch</p>
              <div className="flex items-center gap-4">
                <SocialIconLink href="#" src={instagramLogo} label="Instagram TemanIsyarat" />
                <SocialIconLink href="#" src={whatsappLogo} label="WhatsApp TemanIsyarat" />
                <SocialIconLink
                  href="https://github.com/temanisyarat"
                  src={githubLogo}
                  label="GitHub TemanIsyarat"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-[10px] leading-none text-[#111111]">
          © 2026 ⋅ TemanIsyarat ⋅ Universitas Sebelas Maret
        </div>
      </div>
    </footer>
  );
}

export function SiteFooter() {
  return (
    <footer id="footer" className="bg-[#eeeeee]">
      <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-10 lg:px-32 lg:py-20">
        <div className="flex flex-col justify-between gap-12 lg:flex-row">
          <div className="flex flex-wrap gap-8">
            <FooterLinkColumn title="Navigasi" links={footerNavLinks} />
            <FooterLinkColumn title="Aplikasi" links={footerAppLinks} />
            <FooterLinkColumn title="Tentang Kegiatan" links={footerProjectLinks} />
          </div>

          <div className="space-y-5">
            <p className="px-3 text-[16px] font-semibold leading-none text-[#111111]">Get in Touch</p>
            <div className="flex items-center gap-4 px-3">
              <SocialIconLink href="#" src={instagramLogo} label="Instagram TemanIsyarat" />
              <SocialIconLink href="#" src={whatsappLogo} label="WhatsApp TemanIsyarat" />
              <SocialIconLink href="https://github.com/temanisyarat" src={githubLogo} label="GitHub TemanIsyarat" />
            </div>

            <div className="w-full max-w-[489px] space-y-4 p-4">
              <div>
                <InlineImage src={logoGroupSmall} alt="TemanIsyarat" className="h-auto w-[140px]" />
              </div>
              <p className="max-w-[488px] text-[12px] leading-[1.5] text-[#111111]">
                TemanIsyarat adalah aplikasi penerjemah bahasa isyarat berbasis kecerdasan buatan yang dirancang untuk menjembatani komunikasi menjadi lebih inklusif dan tanpa hambatan.
              </p>

              <div className="inline-flex max-w-[240px]">
                <InlineImage src={googlePlayBadge} alt="Get it on Google Play" className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-[10px] leading-none text-[#111111]">
          © 2026 ⋅ TemanIsyarat ⋅ Universitas Sebelas Maret
        </div>
      </div>
    </footer>
  );
}