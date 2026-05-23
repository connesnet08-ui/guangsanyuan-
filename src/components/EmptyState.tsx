import { Lightbulb } from "lucide-react";

type EmptyStateProps = {
  message: string;
};

const EmptyState = ({ message }: EmptyStateProps) => (
  <div className="rounded-[1.75rem] border border-white/65 bg-white/42 p-5 text-stone-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)] backdrop-blur-xl">
    <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-white text-party-coral shadow-[0_12px_28px_rgba(245,158,11,0.14)] ring-1 ring-white/75">
      <Lightbulb className="h-5 w-5" aria-hidden="true" />
    </div>
    <p className="text-base font-medium leading-7">{message}</p>
  </div>
);

export default EmptyState;
