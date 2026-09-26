

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import DetailActions from "@/components/DetailActions";
import { getWorkout } from "@/lib/api";

export default async function WorkoutDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const workout = await getWorkout(id);
  if (!workout) notFound();

  const specs: [string, string][] = [
    ["Equipment", workout.equipments.join(", ") || "Bodyweight"],
    ["Difficulty", workout.difficulty],
    ["Sets", String(workout.sets)],
    ["Reps", workout.reps],
    ["Duration", `${workout.duration} min`],
    ["Calories", `${workout.calories} kcal`],
    ["Rating", String(workout.rating)],
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-base-content/60 transition hover:text-primary"
      >
        <ChevronLeft size={16} />
        Back to library
      </Link>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative min-h-300px overflow-hidden rounded-xl border border-base-300 bg-base-200 lg:min-h-560px">
          <Image
            src={workout.image}
            alt={workout.exerciseName}
            fill
            priority
            unoptimized
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <div>
          <h1 
          className="font-display text-3xl font-bold uppercase leading-tight tracking-wide sm:text-4xl"
          >
            {workout.exerciseName}
          </h1>
          <p className="mt-3 text-lg italic leading-relaxed text-base-content/70">
            {workout.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {workout.bodyPart.map((tag) => (
              <span
                key={tag}
                className="badge badge-outline badge-primary rounded-full font-display text-xs font-bold uppercase tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>


          <div className="mt-6 overflow-hidden rounded-xl border border-base-300">
            {specs.map(([label, value], i) => (
              <div
                key={label}
                className={`grid grid-cols-[150px_1fr] text-sm ${
                  i % 2 === 0 ? "bg-base-200" : "bg-base-300/40"
                }`}
              >
                <span className="px-4 py-3 font-display text-xs font-bold uppercase tracking-widest text-primary">
                  {label}
                </span>
                <span className="px-4 py-3 text-base-content/80">{value}</span>
              </div>
            ))}
          </div>

          <h2 
          className="mt-8 font-display text-lg font-bold uppercase tracking-[0.25em] text-primary"
          >
            Instructions
          </h2>
          <ol 
          className="mt-4 space-y-3"
          >
            {workout.instructions.length ? (
              workout.instructions.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary font-display text-xs font-bold text-primary-content">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-base-content/80">
                    {step}
                  </span>
                </li>
              ))
            ) : (
              <li className="text-sm italic text-base-content/60">
                No instructions provided for this lift.
              </li>
            )}
          </ol>

          <div className="mt-8">
            <DetailActions workout={workout} />
          </div>
        </div>
      </div>
    </section>
  );
}