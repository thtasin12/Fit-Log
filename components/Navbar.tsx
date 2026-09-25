"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { usePlan } from "@/lib/PlanProvider";

const links = [
  { href: "/", label: "Workout" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4">
        {/* Brand Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={26} height={26} priority />
          <span className="font-display text-xl font-bold uppercase tracking-wider">
            FitLog
          </span>
        </Link>

        {/* nav */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  active
                    ? "rounded-md bg-primary px-5 py-2 font-display text-sm font-bold uppercase tracking-widest text-primary-content"
                    : "rounded-md px-5 py-2 font-display text-sm font-bold uppercase tracking-widest text-neutral-content transition hover:text-primary"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* mobile menu */}
        <div className="flex items-center gap-2">
          <Link
            href="/my-plan?tab=plan"
            className="badge badge-primary rounded-full px-3 py-3 font-display text-xs font-bold uppercase tracking-wider"
          >
            Plan · {plan.length}
          </Link>
          <Link
            href="/my-plan?tab=saved"
            className="badge badge-outline rounded-full border-primary/60 px-3 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary/10"
          >
            Saved · {saved.length}
          </Link>

          {/* Mobile Menu */}
          <div className="dropdown dropdown-end md:hidden">
            <summary className="btn btn-ghost btn-square btn-sm" aria-label="Open menu">
              <Menu size={20} />
            </summary>
            <ul className="menu dropdown-content z-60 mt-2 w-44 rounded-box border border-base-300 bg-base-200 p-2 shadow-xl
            ">

              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-display text-sm font-bold uppercase tracking-widest"
                  >


                    {link.label}

                  </Link>

                </li>

              ))}

            </ul>
          </div>

        </div>
      </div>
    </header>
  );
}