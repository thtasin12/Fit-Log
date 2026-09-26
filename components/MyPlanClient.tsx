"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation"

import { useMemo, useState, useEffect, Suspense } from "react"

import { Bookmark, Check, Clock, Dumbbell, Flame, Search, Star, Trash2, X } from "lucide-react"

import { usePlan } from "@/lib/PlanProvider"

function MyPlanContent() {
  const { plan, saved, done, removeFromPlan, removeFromSaved, toggleDone } = usePlan();
  const searchParams = useSearchParams()

  const router = useRouter()
  const tabParam = searchParams.get("tab")

  const [tab, setTab] = useState<"plan" | "saved">(tabParam === "saved" ? "saved" : "plan");
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (tabParam === "saved" || tabParam === "plan") {
      setTab(tabParam)
    }
  }, [tabParam])

  const handleTabChange = (newTab: "plan" | "saved") => {
    setTab(newTab)

    router.replace(`/my-plan?tab=${newTab}`, { scroll: false });
  };

  const items = tab === "plan" ? plan : saved;
  const q = query.trim().toLowerCase()

  const visible = useMemo(
    () =>
      q
        ? items.filter(
            (w) =>
              w.exerciseName.toLowerCase().includes(q) ||
              w.bodyPart.some((tag) => tag.toLowerCase().includes(q))
          )
        : items,
    [items, q]
  )

  const totalMinutes = plan.reduce((sum, w) => sum + w.duration, 0);
  const totalCalories = plan.reduce((sum, w) => sum + w.calories, 0);
  const doneCount = plan.filter((w) => done[String(w.id)]).length;

  const metrics = [
    { label: "Exercises", value: String(plan.length), hint: `${doneCount} done` },
    { label: "Minutes", value: String(totalMinutes), hint: "total time" },
    { label: "Calories", value: String(totalCalories), hint: "kcal burned" },
  ]

  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl">
            My <span className="text-primary">Plan</span>
          </h1>
          <p className="mt-2 italic text-base-content/60">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>
        <label className="input input-bordered flex items-center gap-2 bg-base-200 md:w-64">
          <Search size={16} className="text-primary" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search plan…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-base-content/40"
          />
        </label>
      </div>

      
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {metrics.map((m) => (

          <div key={m.label} className="rounded-xl border border-base-300 bg-base-200 p-5">
            <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {m.label}
            </p>

            <p className="mt-2 font-display text-4xl font-bold">{m.value}</p>
            <p className="mt-1 text-xs italic text-base-content/50">{m.hint}</p>
          </div>
        )
        )}
      </div>

      
      <div className="mt-10 flex gap-2">
        <button
          onClick={() => handleTabChange("plan")}

          className={
            tab === "plan"
              ? "btn btn-primary btn-sm font-display text-xs font-bold uppercase tracking-widest"
              : "btn btn-outline btn-primary btn-sm font-display text-xs font-bold uppercase tracking-widest"
          }
        >
          Today&apos;s Plan
          <span className="badge badge-sm badge-neutral">{plan.length}</span>
        </button>
        <button
          onClick={() => handleTabChange("saved")}

          className={
            tab === "saved"
              ? "btn btn-primary btn-sm font-display text-xs font-bold uppercase tracking-widest"
              : "btn btn-outline btn-primary btn-sm font-display text-xs font-bold uppercase tracking-widest"
          }
        >
          Saved
          <span className="badge badge-sm badge-neutral">{saved.length}</span>
        </button>
      </div>

      
      <div className="mt-6 space-y-4">
        {visible.length === 0 ? (

          <div className="flex flex-col items-center gap-4 rounded-xl border border-dashed border-base-300 py-20 text-center">
            {tab === "saved" ? (
              <Bookmark size={40} className="text-primary" />
            ) : (
              <Dumbbell size={40} className="text-primary" />
            )}
            <div>
              <p className="font-display text-2xl font-bold uppercase tracking-wider">
                Nothing here yet

              </p>
              <p className="mt-2 text-sm italic text-base-content/60">
                Browse the library and add a lift to get today moving.
              </p>
            </div>
            <Link
              href="/"
              className="btn btn-primary btn-sm font-display text-xs font-bold uppercase tracking-widest"
            >

              Go to workouts



            </Link>
          </div>
        ) : (
          visible.map((workout) => {
            const isDone = !!done[String(workout.id)]
            return (
              <div
                key={workout.id}
                className={`flex flex-col gap-4 rounded-xl border border-base-300 bg-base-200/80 p-5 transition sm:flex-row sm:items-center sm:justify-between ${
                  isDone ? "opacity-60" : ""
                }`}
              >
                
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-1.5">
                    {workout.difficulty && (
                      <span className="badge border-none bg-base-300 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-neutral-300">
                        {workout.difficulty}

                      </span>
                    )}
                    {workout.bodyPart?.map((tag) => (
                      <span
                        key={tag}
                        className="badge badge-outline border-primary/40 text-primary badge-sm rounded-full font-display text-[10px] font-bold uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3
                    className={`truncate font-display text-xl font-bold uppercase tracking-wide text-white ${
                      isDone ? "line-through decoration-primary decoration-2" : ""
                    }`}
                  >
                    {workout.exerciseName}
                  </h3>

                  <p className="mt-0.5 truncate text-xs text-base-content/60">
                    {workout.equipments?.length
                      ? workout.equipments.join(", ")
                      : "No equipment needed"}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-base-content/70">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Clock size={13} className="text-primary" />
                      {workout.duration} min

                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Flame size={13} className="text-primary" />
                      {workout.calories} kcal
                    </span>

                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Star size={13} className="text-primary" fill="currentColor" />
                      {workout.rating}

                    </span>
                  </div>
                </div>

                
                <div className="flex shrink-0 flex-wrap items-center gap-2 sm:self-center">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="btn btn-outline btn-primary btn-xs font-display uppercase tracking-wider"
                  >
                    View Details
                  </Link>
                  {tab === "plan" && (
                    <button
                      onClick={() => toggleDone(workout.id)}
                      disabled={isDone}
                      className="btn btn-primary btn-xs font-display uppercase tracking-wider"
                    >
                      <Check size={14} />
                      {isDone ? "Done" : "Mark as Done"}
                    </button>
                  )}
                  <button
                    onClick={() =>
                      tab === "plan"
                        ? removeFromPlan(workout.id)

                        : removeFromSaved(workout.id)
                    }
                    className="btn btn-ghost btn-xs text-error hover:bg-error/10"
                    aria-label="Remove workout"
                  >
                    {tab === "plan" ? <X size={16} /> : <Trash2 size={15} />}
                  </button>

                </div>


              </div>
            )})
        )}
      </div>
    </section>
  );
}

export default function MyPlanClient() {
  return (
    <Suspense fallback={
    <div className="p-10 text-center">
      Loading plan...
      </div>}>

      <MyPlanContent />

    </Suspense>
  )
}