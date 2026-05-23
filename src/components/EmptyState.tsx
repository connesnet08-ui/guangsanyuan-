import { Lightbulb } from "lucide-react";

type EmptyStateProps = {
  message: string;
};

const EmptyState = ({ message }: EmptyStateProps) => (
  <div className="rounded-3xl border border-dashed border-amber-300 bg-amber-50/70 p-5 text-stone-700">
    <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-party-coral shadow-sm">
      <Lightbulb className="h-5 w-5" aria-hidden="true" />
    </div>
    <p className="text-base leading-7">{message}</p>
  </div>
);

export default EmptyState;
