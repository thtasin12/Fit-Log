

const Loading = () => {
    return (
        <section className="mx-auto max-w-7xl px-4 py-14">
            <p 
            className="mb-8 text-center font-display text-lg font-bold uppercase tracking-[0.3em] text-primary"
            >
                Loading workouts…
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="overflow-hidden rounded-xl border border-base-300 bg-base-200"
                    >
                        <div className="skeleton aspect-4/3 w-full rounded-none bg-base-300" />
                        <div className="space-y-3 p-4">
                            <div className="skeleton h-4 w-1/3 bg-base-300" 
                            ></div>


                            <div className="skeleton h-6 w-3/4 bg-base-300"></div>
                            <div className="skeleton h-3 w-1/2 bg-base-300" ></div>
                            <div className="skeleton h-3 w-2/3 bg-base-300" > </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Loading
