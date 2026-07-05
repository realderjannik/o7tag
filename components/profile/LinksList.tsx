import type { LinkItem, Theme } from "@/types";
import { LinkButton } from "./LinkButton";

export function LinksList({ links, theme }: { links: LinkItem[]; theme: Theme }) {
  const visible = links.filter((l) => l.isVisible).sort((a, b) => a.position - b.position);

  return (
    <div className="flex w-full flex-col gap-3">
      {visible.map((link) => (
        <LinkButton key={link.id} link={link} theme={theme} />
      ))}
    </div>
  );
}
