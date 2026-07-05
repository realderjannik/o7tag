"use client";

import type { LinkItem, Theme } from "@/types";
import { Icon } from "@/components/ui/Icon";

export function LinkButton({ link, theme }: { link: LinkItem; theme: Theme }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className="group flex w-full items-center gap-3 rounded-xl border px-4 py-3.5 backdrop-blur-sm transition-all duration-150 hover:-translate-y-0.5"
      style={{
        backgroundColor: theme.buttonBg,
        borderColor: theme.buttonBorder,
        color: theme.buttonText,
      }}
    >
      <Icon
        name={(link.icon as never) ?? "link"}
        className="h-5 w-5 shrink-0 opacity-80 transition-opacity group-hover:opacity-100"
      />
      <span className="flex-1 text-center text-sm font-medium">{link.label}</span>
      <Icon name="link" className="h-4 w-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-40" />
    </a>
  );
}
