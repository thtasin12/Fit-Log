import Image from "next/image"
import { ArrowDown, Dumbbell } from "lucide-react"

const Hero = () => {
  return (
    <section
    className="relative overflow-hidden border-b border-base-300 bg-base-200"
    >
        <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl">

        </div>

        <div
        className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-24"
        >

            <div>

                <p className="mb-5 inline-flex items-center gap-3 font-display text-sm font-semibold uppercase tracking-[0.35em] text-primary">
                    <span className="h-px w-10 bg-primary
                    ">
                    </span>
                        Workout Library


                </p>

                <h1
                className="font-display text-4xl font-bold uppercase leading-[1.05] sm:text-4xl lg:text-6xl"
                >
                    Train with intent.
                    <span className="text-primary"> Log every set.</span>



                </h1>


                <p
                className="mt-6 max-w-lg text-lg italic leading-relaxed text-base-content/70"
                >

                    FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.

                </p>

                <a href="#library" className="btn btn-primary mt-9 font-display text-sm font-bold uppercase tracking-widest">

                    <Dumbbell size={18} />
                    Browse workouts
                    <ArrowDown size={16} />
                </a>


            </div>

            <div className="relative">

            <div className="absolute -inset-6 rounded-full bg-primary/10 blur-3xl">

            </div>

            <Image
            src="/banner.png"
            alt="Athlete training on a machine"
            width={640} height={640}
            priority
            className="relative mx-auto w-full max-w-md drop-shadow-[0_0_40px_rgba(204,255,0,0.15)]"
            >

            </Image>
            </div>            
        </div>

    </section>
  )
}

export default Hero
