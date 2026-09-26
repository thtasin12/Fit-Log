export default function DetailLoading() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2">
      <div className="skeleton min-h-300px rounded-xl bg-base-200 lg:min-h-560px" />
      <div className="space-y-4">
        <div className="skeleton h-10 w-3/4 bg-base-200" />
        <div className="skeleton h-4 w-full bg-base-200" />
        <div className="skeleton h-4 w-5/6 bg-base-200" />
        <div className="skeleton h-48 w-full rounded-xl bg-base-200" />
        <div className="skeleton h-6 w-40 bg-base-200" />
        <div className="skeleton h-4 w-full bg-base-200" />
        <div className="skeleton h-4 w-full bg-base-200" />
        <div className="skeleton h-12 w-64 bg-base-200" />
      </div>
    </section>
  );
}
