"use client";

import Link from "next/link";

import { Clock, Flame, Star, Plus, Check, Bookmark } from "lucide-react";

import type { Workout } from "@/lib/types";

import { usePlan } from "@/lib/PlanProvider";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  const {
    isInPlan,
    isSaved,
    addToPlan,
    removeFromPlan,
    saveForLater,
    removeFromSaved,
  } = usePlan();

  const inPlan = isInPlan(workout.id);
  const inSaved = isSaved(workout.id);

  const handlePlanClick = (e: React.MouseEvent) => {
    e.preventDefault();

    e.stopPropagation();

    if (inPlan) {
      removeFromPlan(workout.id);
    } else {
      addToPlan(workout);
    }
  };

  const handleSaveClick = (e: React.MouseEvent) => {

    e.preventDefault();

    e.stopPropagation();

    if (inSaved) {
      removeFromSaved(workout.id);
    } else {
      saveForLater(workout);
    }
  };

  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card group relative flex flex-col justify-between overflow-hidden border border-base-300 bg-base-200/70 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-[0_10px_30px_rgba(204,255,0,0.08)]"
    >
      <div>
        {/* Top Header: Difficulty & Actions */}
        <div className="mb-3 flex items-center justify-between gap-2">
          {workout.difficulty ? (

            <span className="badge border-none bg-base-300 px-2.5 py-1 font-display text-[10px] font-bold uppercase tracking-wider text-neutral-300">
              {workout.difficulty}
            </span>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-1.5">
            {/* Save Button */}
            <button
              onClick={handleSaveClick}

              type="button"
              className={`btn btn-circle btn-xs border-none transition-all ${
                inSaved
                  ? "bg-primary text-black"
                  : "bg-base-300 text-white hover:bg-base-100"
              }`}
              title={inSaved ? "Remove from saved" : "Save for later"}
            >
              <Bookmark size={12} className={inSaved ? "fill-current" : ""} />
            </button>

            
            <button
              onClick={handlePlanClick}
              type="button"
              className={`btn btn-xs rounded-full border-none px-3 font-display text-[10px] font-bold uppercase tracking-wider transition-all ${
                inPlan
                  ? "bg-primary text-black"
                  : "bg-base-300 text-white hover:bg-base-100"
              }`}
            >
              {inPlan ? (
                <span className="flex items-center gap-1">
                  <Check size={11} /> Planned
                </span>

              ) : (
                <span className="flex items-center gap-1">
                  <Plus size={11} /> Add
                </span>

              )}
            </button>

          </div>

        </div>

        {/* tag */}

        <div className="mb-2 flex flex-wrap gap-1.5">
          {workout.bodyPart?.map((tag) => (
            <span
              key={tag}

              className="badge badge-outline border-primary/40 text-primary badge-sm rounded-full font-display text-[10px] font-bold uppercase tracking-wider"

            >
              {tag}

            </span>
          ))}

        </div>

        {/* title */}

        <h3 className="mb-1 font-display text-xl font-black uppercase leading-tight tracking-wide text-white transition-colors group-hover:text-primary">

          {workout.exerciseName}


        </h3>


        <p className="line-clamp-2 text-xs text-neutral-400">
          {workout.equipments?.length
            ? workout.equipments.join(", ")
            : "No equipment needed"}
        </p>
      </div>

      
      <div 
      className="mt-5 flex items-center justify-between border-t border-base-300/80 pt-3 text-xs text-neutral-300">
        
        <span 
        className="inline-flex items-center gap-1.5 font-medium">
          <Clock size={13} className="text-primary" />
          {workout.duration} min
        </span>

        <span className="inline-flex items-center gap-1.5 font-medium">
          <Flame size={13} className="text-primary" />
          {workout.calories} kcal
        </span>


        <span className="inline-flex items-center gap-1.5 font-medium">
          <Star size={13} className="text-primary fill-primary" >


          </Star>
          {workout.rating}

        </span>
      </div>
    </Link>
  );
}