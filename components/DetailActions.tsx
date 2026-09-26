"use client";

import { Bookmark, Check, Plus } from "lucide-react";
import { max_plan, usePlan } from "@/lib/PlanProvider";
import type { Workout } from "@/lib/types";

export default function DetailActions({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater, isInPlan, isSaved, plan } = usePlan();
  const inPlan = isInPlan(workout.id);
  const saved = isSaved(workout.id);
  const planFull = plan.length >= max_plan;

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => addToPlan(workout)}
        disabled={inPlan || planFull}
        className="btn btn-primary font-display text-sm font-bold uppercase tracking-wider"
      >
        {inPlan ? <Check size={18} /> : <Plus size={18} />}
        {inPlan
          ? "In today's plan"
          : planFull
          ? `Plan full (${max_plan}/${max_plan})`
          : "Add to today's plan"}
      </button>
      <button
        onClick={() => saveForLater(workout)}
        disabled={saved}
        className="btn btn-outline btn-primary font-display text-sm font-bold uppercase tracking-wider"
      >
        {saved ? <Check size={18} /> : <Bookmark size={18} />}
        {saved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}
