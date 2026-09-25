import type { Workout } from "./types"
import { fallbackWorkouts } from "./fallback"

const Api = "https://api.abcz.workers.dev/api/fitlog"


function asStringArray(value: unknown): string[] {
    if (Array.isArray(value)) {
        return value.map((v) => String(v).trim()).filter(Boolean)
    }

    if (typeof value === "string" && value.trim()) {
        return value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
    }
    return []
}

function firstNumber(...values: unknown[]): number {
       for (const v of values) {
            const n = Number(v);
            if (!Number.isNaN(n) && v !== null && v !== undefined && v !== "") return n;
        }
        return 0;
    

}

function firstText(...values: unknown[]): string {
  for (const v of values) {
    if (typeof v === "string" && v.trim()) return v.trim()
    if (typeof v === "number" && !Number.isNaN(v)) return String(v);
  }
  return ""
}

export function normalizeWorkout(raw: any): Workout {
    const image = firstText(raw?.image, raw?.img, raw?.imageUrl, raw?.picture)

    return {
        id: raw?.id ?? raw?._id ?? Math.random().toString(36).slice(2),
        exerciseName: firstText(
            raw?.exerciseName,
            raw?.workoutName,
            raw?.name,
            raw?.title
        ),
        image: image || "/banner.png",
        bodyPart: asStringArray(
            raw?.bodyPart ?? raw?.category ??
            raw?.categories ?? raw?.tags ??
            raw?.muscle
        ),
        equipments: asStringArray(
            raw?.equipments ?? raw?.equipment ?? raw?.equipmentsRequired
        ),
        description: firstText(raw?.description, raw?.details, raw?.summary),
        instructions: asStringArray(raw?.instructions ?? raw?.steps).slice(0, 8),
        duration: firstNumber(
            raw?.duration, raw?.durationMinutes, raw?.time
        ),

        calories: firstNumber(raw?.calories,
            raw?.caloriesBurned, raw?.kcal
        ),

        rating: firstNumber(raw?.rating, raw?.stars),

        difficulty: firstText(
            raw?.difficulty, raw?.level
        ) || "Beginner",

        sets: (raw?.sets ?? firstNumber(raw?.setCount
        )) || 3,

        reps: firstText(raw?.reps, raw?.repetitions) || "8-12",

    }


}

async function fetchJson(url: string): Promise<unknown> {
    const res = await fetch(url, {next: {revalidate: 300}});

    if(!res.ok) throw new Error(`Request failed: ${res.status}`)

    return res.json()

}

function extractList(data: any): any[] {
    if(Array.isArray(data)) return data
    if(Array.isArray(data?.data)) return data.data
    if(Array.isArray(data?.workouts)) return data.workouts

    if(Array.isArray(data?.exercises)) return data.exercises

    if(Array.isArray(data?.result)) return data.result
    return [];
}

export async function getWorkouts(): Promise<Workout[]> {
    try{
        const data = await fetchJson(Api)
        const list = extractList(data)
        if(!list.length) throw new Error("Empty API response")
        return list.map(normalizeWorkout)
    }
    catch{
        return fallbackWorkouts
    }
}


export async function getWorkout(id: string): Promise<Workout | null> {
    try {
        const data = await fetchJson(`${Api}/${id}`)

        const raw: any = (data as any)?.data ?? (data as any)?.workout ?? data

        const workout = normalizeWorkout(raw)
        if(workout.exerciseName) return workout
        throw new Error ("Invalid record")
    } catch {
        return (
            fallbackWorkouts.find((w) => String(w.id) === String(id)) ?? null
        )
    }
}