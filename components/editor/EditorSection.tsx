import { Icon } from "@/components/ui/Icon";
import type { ComponentProps } from "react";

export function EditorSection({
  icon,
  title,
  description,
  children,
}: {
  icon: ComponentProps<typeof Icon>["name"];
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-brand-500/30 bg-brand-500/10 text-brand-500">
          <Icon name={icon} className="h-4 w-4" />
        </div>
        <div>
          <h2 className="font-semibold text-zinc-100">{title}</h2>
          {description && <p className="text-xs text-zinc-500">{description}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </section>
  );
}
