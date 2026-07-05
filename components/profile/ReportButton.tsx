"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Icon } from "@/components/ui/Icon";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ReportButton({ username }: { username: string }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [reason, setReason] = useState("");

  const submit = () => {
    // No backend yet — this only simulates submission locally.
    setSent(true);
  };

  const close = () => {
    setOpen(false);
    setTimeout(() => {
      setSent(false);
      setReason("");
    }, 200);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-30 flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-500 backdrop-blur-md transition-colors hover:text-zinc-300"
      >
        <Icon name="flag" className="h-3.5 w-3.5" />
        {t.profile.report}
      </button>

      <Modal open={open} onClose={close} title={t.profile.report}>
        {sent ? (
          <p className="text-sm text-zinc-400">
            {"Thanks — this report has been noted (demo mode, not yet sent anywhere)."}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            <Textarea
              rows={4}
              placeholder="Reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <Button onClick={submit} disabled={!reason.trim()}>
              {t.profile.report}
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
}
