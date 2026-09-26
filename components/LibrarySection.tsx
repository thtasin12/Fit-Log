"use client"

import { useMemo, useState } from "react"

import { ChevronDown, Search, SearchX } from "lucide-react"

import WorkoutCard from "./WorkoutCard"

import { SortKey, Workout } from "@/lib/types"

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
    { value: "duration", label: "Duration" },
    { value: "calories", label: "Calories" },
    { value: "rating", label: "Rating" }
]



const LibrarySection = ({ workouts }: { workouts: Workout[] }) => {
    const [sort, setSort] = useState<SortKey>("duration")

    const [query, setQuery] = useState("")

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        const filtered = q
            ? workouts.filter(
                (w) =>
                    w.exerciseName.toLowerCase().includes(q) ||
                    w.bodyPart.some((tag) => tag.toLowerCase().includes(q)) ||
                    w.equipments.some((e) => e.toLowerCase().includes(q))
            ) : [...workouts];
        return filtered.sort((a, b) => b[sort] - a[sort]);
    }, [workouts, sort, query]);
    return (
        <section
            id="library"
            className="mx-auto max-w-7xl scroll-mt-20 px-4 py-14"
        >
            <div
                className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
            >
                <div>
                    <h2
                        className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl"
                    >
                        The <span className="text-primary">Library</span>

                    </h2>

                    <p
                        className="mt-2 italic text-base-content/60"
                    >
                        Twelve lifts covering every major muscle group.

                    </p>
                </div>

                <div
                    className="flex flex-col gap-3 sm:flex-row sm: items-center"
                >
                    <label htmlFor=""
                        className="input input-bordered flex items-center gap-2 bg-base-200"
                    >
                        <Search size={16} className="text-primary"></Search>

                        <input type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by name or tag..."

                            className="w-52 bg-transparent text-sm outline-none placeholder:text-base-content/40"
                        />


                    </label>

                    <div className="relative">
                        <select name="" id=""
                            value={sort}
                            onChange={(e) => setSort(e.target.value as SortKey)}
                            className="select select-bordered w-full appearance-none bg-base-200 pr-10 font-display text-sm font-bold uppercase tracking-wider sm:w-48"
                            aria-label="Sort workouts"
                        >
                            {
                                SORT_OPTIONS.map((opt) => (
                                    <option value={opt.value} key={opt.value}>
                                        Sort · {opt.label}

                                    </option>
                                ))
                            }
                        </select>

                        <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-primary"
                        >

                        </ChevronDown>

                    </div>

                </div>

            </div>

            {visible.length === 0 ? (
                <div className="mt-12 flex flex-col items-center gap-3 rounded-xl border border-dashed border-base-300 py-20 text-center">
                    <SearchX size={36} className="text-primary" />
                    <p className="font-display text-xl font-bold uppercase">No matches found</p>
                    <p className="text-sm italic text-base-content/60">
                        Try a different name, tag, or equipment.
                    </p>
                </div>
            ) : (
                <div
                    className="mt-8 grid gap-5 sme: grid-cols-2 lg:grid-cols-3"
                >
                    {visible.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout} />
                    ))}

                </div>
            )}

        </section>
    )
}

export default LibrarySection
