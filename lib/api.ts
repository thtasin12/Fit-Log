import type {Workout} from "./types"
import {fallbackWorkouts} from "./fallback"

const Api = "https://api.abcz.workers.dev/api/fitlog"


function asStringArray(value: unknown): string[] {
    if(Array.isArray(value)){
        return value.map((v) => String(v).trim()).filter(Boolean) 
    }

    if(typeof value === "string" && value.trim()) {
        return value
            .split(",")
            .map((v) => v.trim())
            .filter(Boolean)
    }
    return []
}

function firstNumber(...values: unknown[]): string{
    for (const v of values) {
        if (typeof v === "string" && v.trim()) return v.trim()
        
        if(typeof v === "number" && !Number.isNaN(v)) return String(v) 
    }
    return "";
}



