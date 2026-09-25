import Image from "next/image";


const Footer = () => {
  return (
    <footer
    className="border-t border-base-300 bg-base-200"
    >

        <div
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 sm:flex-row"
        >
            <div
            className="flex items-center gap-2"
            >

                <Image
                src="/logo.png" alt="FitLog logo" width={22} height={22}
                >

                </Image>

                <span
                className="font-display text-lg font-bold uppercase tracking-wider"
                >
                    FitLog

                </span>

            </div>

            <p 
            className="text-sm text-base-content/60"
            >
                © 2026 FitLog - Workout Library.
            </p>

            <span className="italic">

                Train hard, log honest.
            </span>

        </div>

    </footer>
  )
}

export default Footer
