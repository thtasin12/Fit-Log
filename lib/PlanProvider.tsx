"use client";

import {
    createContext, useCallback, useContext, useEffect, useMemo, useRef, useState
} from "react"

import type { ReactNode } from "react";
import type { Workout } from "./types";

export const max_plan = 5;

type ToastType = "success" | "info" | "error"
export interface ToastItem {
    id: number
    message: string;
    type: ToastType
}

interface PlanContextValue {
    plan: Workout[];
    saved: Workout[];

    done: Record<string, boolean>;
    addToPlan: (workout: Workout) => void;


    saveForLater: (workout: Workout) => void;
    removeFromPlan: (id: string | number) => void;


    removeFromSaved: (id: string | number) => void

    toggleDone: (id: string | number) => void;


    isInPlan: (id: string | number) => boolean
    isSaved: (id: string | number) => boolean;

    notify: (message: string, type?: ToastType) => void
}

const PlanContext = createContext<PlanContextValue | null>(null)

const key = (id: string | number) => String(id)

const sameId = (w: Workout, id: string | number) => key(w.id) === key(id)

function load<T>(storageKey: string, fallback: T): T {
    if (typeof window === "undefined") return fallback
    try {
        const raw = window.localStorage.getItem(storageKey)
        return raw ? (JSON.parse(raw) as T) : fallback
    } catch {
        return fallback
    }
}

function PlanProvider({ children }: { children: ReactNode }) {
    const [plan, setPlan] = useState<Workout[]>([])
    const [saved, setSaved] = useState<Workout[]>([])

    const [done, setDone] = useState<Record<string, boolean>>({})
    const [toasts, setToasts] = useState<ToastItem[]>([])
    const [hydrated, setHydrated] = useState(false)
    const toastId = useRef(0)


    useEffect(() => {

        setPlan(load("fitlog-plan", []));

        setSaved(load("fitlog-saved", []));

        setDone(load("fitlog-done", {}));

        setHydrated(true);

    }, []);


    const notify = useCallback((message: string, type: ToastType = "success") => {
        const id = ++toastId.current
        setToasts((t) => [...t, { id, message, type }])
        window.setTimeout(() => {
            setToasts((t) => t.filter((toast) => toast.id !== id))
        }, 3000)
    }, [])

    const addToPlan = useCallback(
        (workout: Workout) => {
            if (plan.some((w) => sameId(w, workout.id))) {
                notify(`"${workout.exerciseName}" is already in today's plan`, "info")
                return
            }
            if (plan.length >= max_plan) {
                notify("Plan is full - five lifts max for today", "error")
                return
            }
            notify(`Added "${workout.exerciseName}" to today's plan`)
            setPlan((prev) => [...prev, workout])
        }, [plan, notify]
    )

    const saveForLater = useCallback(
        (workout: Workout) => {
            if (saved.some((w) => sameId(w, workout.id))) {
                notify(`"${workout.exerciseName}" is already saved`, "info");
                return;
            }
            notify(`Saved "${workout.exerciseName}" for later`);
            setSaved((prev) => [...prev, workout]);
        },
        [saved, notify]
    );

    const removeFromSaved = useCallback(
        (id: string | number) => {
            const target = saved.find((w) => sameId(w, id));
            if (target) notify(`Removed "${target.exerciseName}" from saved`, "info");
            setSaved((prev) => prev.filter((w) => !sameId(w, id)));
        },
        [saved, notify]
    );

    const removeFromPlan = useCallback(
        (id: string | number) => {
            const target = plan.find((w) => sameId(w, id));
            if (target) notify(`Removed "${target.exerciseName}" from today's plan`, "info")
            setPlan((prev) => prev.filter((w) => !sameId(w, id)))
        }, [plan, notify]
    )

    const toggleDone = useCallback(
        (id: string | number) => {
            const nextDoneState = !done[key(id)]
            notify(
                nextDoneState ? "Workout marked as done. Nice Work!" : "Marked as not done",
                nextDoneState ? "success" : "info"
            )
            setDone((prev) => ({ ...prev, [key(id)]: nextDoneState }))
        }, [done, notify]
    )


    const isInPlan = useCallback((id: string | number) => plan.some((w) => sameId(w, id)), [plan])

    const isSaved = useCallback((id: string | number) => saved.some((w) => sameId(w, id)), [saved])

    const value = useMemo(
        () => ({
            plan,
            saved,
            done,
            addToPlan,
            saveForLater,
            removeFromPlan,
            removeFromSaved,
            toggleDone,
            isInPlan,
            isSaved,
            notify,
        }),
        [
            plan, saved,done,
            addToPlan,
            saveForLater,
            removeFromPlan, removeFromSaved, toggleDone, isInPlan, isSaved, notify,
        ]
    );

    return (
        <PlanContext.Provider value={value}>
            {children}

            <div
                className="toast toast-end toast-bottom z-100"
            >
                {
                    toasts.map((t) => (
                        <div
                            key={t.id}
                            className={
                                `alert ${t.type === "success" ? "alert-success text-primary-content" : t.type === "error" ? "alert-error" : "alert-info"} shadow-lg `
                            }
                        >
                            <span className="text-sm font-medium">{t.message}</span>
                        </div>
                    ))
                }
            </div>
        </PlanContext.Provider>
    )
}

export function usePlan():
    PlanContextValue {
    const ctx = useContext(PlanContext)
    if (!ctx) throw new Error("usePlan must be used within <PlanProvider")

    return ctx
}