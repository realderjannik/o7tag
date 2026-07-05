import { Icon } from "@/components/ui/Icon";

export function ViewCounter({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
      <Icon name="eye" className="h-3.5 w-3.5" />
      {count.toLocaleString()}
    </div>
  );
}
