"use client";

import {
    createContext, useCallback, useContext, useEffect, useMemo, useRef, useState
} from "react"

import type { ReactNode } from "react";
import type {Workout} from "./types"

export const max_plan = 5;

type ToastType = "success" | "info" | "error"
export interface ToastItem {
    id: number
    message: string;
    type: ToastType
}

interface PlanContextValue {
    plan: Workout[];
    saved: Workout[]
    done: Record< string, boolean>
    addToPlan: (workout: Workout) => void;
    saveForLater: (workout: Workout) => void;
    removeFromPlan: (id: string | number) => void;

    removeFromSaved: (id: string | number) => void;

    idInPlan: (id: string | number)  => void
    toggleDone: (id: string | number) => void

    isInPlan: (id: string | number) => void
    isSaved : (id: string | number ) => boolean
    notify: (message: string, type?: ToastType) => void


}

const PlanContext = createContext<PlanContextValue | null> (null)

const key = (id: string | number) => String(id)

const sameId = (w: Workout, id: string | number) => key(w.id) === key(id)

function load<T>(storageKey: string, fallback: T): T {
    if(typeof window === "undefined") return fallback
    try {
        const raw = window.localStorage.getItem(storageKey)
        return raw ? (JSON.parse(raw) as T): fallback
    } catch{
        return fallback
    }
}

function PlanProvider({children}: {children: ReactNode}) {
    const [plan, setPlan] = useState<Workout[]>([])
    const [saved, setSaved] = useState<Workout[]>([])

    const [done, setDone] = useState<Record<string, boolean>>({})
    const [toasts, setToasts] = useState<ToastItem[]>([])
    const [hydrated, setHydrated] = useState(false)
    const toastId = useRef(0)


    useEffect(() => {
        if(!hydrated) return 
        window.localStorage.setItem("fitlog-plan", JSON.stringify(plan));
        window.localStorage.setItem("fitlog-saved", JSON.stringify(saved))
        window.localStorage.setItem("fitlog-done", JSON.stringify(done))

    }, [plan, saved, done, hydrated])


    const notify = useCallback((message: string, type: ToastType = "success") => {
        const id = ++toastId.current
        setToasts((t) => [...t, {id, message, type}])
        window.setTimeout(() => {
            setToasts((t) => t.filter((toast) => toast.id !== id))
        }, 3000)
    }, [])

    const addToPlan = useCallback(
        (workout: Workout) => {
            if(plan.some((w) => sameId(w, workout.id))) {
                notify(`"${workout.exerciseName}" is already in today's plan`, "info")
                return
            }
            if(plan.length >= max_plan) {
                notify("Plan is full - five lifts max for today", "error")
                return
            }
            notify(`Added "${workout.exerciseName}" to today's plan`)
            setPlan((prev) => [...prev, workout])
        }, [plan, notify]
    )
}