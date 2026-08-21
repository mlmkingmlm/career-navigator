const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-background animate-pulse">
      {/* Navbar */}
      <header className="h-20 border-b border-border/40 bg-background">
        <div className="container-custom h-full flex items-center justify-between px-4">
          <div className="h-10 w-40 rounded-lg bg-muted" />

          <div className="hidden md:flex items-center gap-8">
            <div className="h-5 w-14 rounded bg-muted" />
            <div className="h-5 w-20 rounded bg-muted" />
            <div className="h-5 w-20 rounded bg-muted" />
            <div className="h-5 w-16 rounded bg-muted" />
          </div>

          <div className="h-12 w-32 rounded-xl bg-muted" />
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="container-custom px-4 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Left */}
            <div className="space-y-6">
              <div className="h-10 w-64 rounded-full bg-muted" />

              <div className="space-y-3">
                <div className="h-14 w-full max-w-[620px] rounded bg-muted" />
                <div className="h-14 w-5/6 rounded bg-muted" />
                <div className="h-14 w-4/6 rounded bg-muted" />
              </div>

              <div className="space-y-3 max-w-xl">
                <div className="h-6 w-full rounded bg-muted" />
                <div className="h-6 w-11/12 rounded bg-muted" />
                <div className="h-6 w-4/5 rounded bg-muted" />
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="h-14 w-48 rounded-xl bg-muted" />
                <div className="h-14 w-40 rounded-xl bg-muted" />
              </div>
            </div>

            {/* Right */}
            <div className="space-y-5">
              {/* ATS card */}
              <div className="rounded-2xl border border-border p-6">
                <div className="flex gap-4">
                  <div className="h-16 w-16 shrink-0 rounded-2xl bg-muted" />

                  <div className="flex-1 space-y-3">
                    <div className="h-7 w-52 rounded bg-muted" />
                    <div className="h-5 w-full rounded bg-muted" />
                    <div className="h-5 w-5/6 rounded bg-muted" />
                  </div>
                </div>

                <div className="mt-8 space-y-3">
                  <div className="h-5 w-44 rounded bg-muted" />
                  <div className="h-3 w-full rounded-full bg-muted" />
                </div>
              </div>

              {/* Feature cards */}
              <div className="grid grid-cols-2 gap-5">
                <div className="rounded-2xl border border-border p-5 space-y-4">
                  <div className="h-14 w-14 rounded-xl bg-muted" />
                  <div className="h-6 w-40 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-4/5 rounded bg-muted" />
                </div>

                <div className="rounded-2xl border border-border p-5 space-y-4">
                  <div className="h-14 w-14 rounded-xl bg-muted" />
                  <div className="h-6 w-36 rounded bg-muted" />
                  <div className="h-4 w-full rounded bg-muted" />
                  <div className="h-4 w-4/5 rounded bg-muted" />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Lower content preview */}
        <section className="container-custom px-4 pb-20">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-48 rounded-2xl border border-border bg-muted/30" />
            <div className="h-48 rounded-2xl border border-border bg-muted/30" />
            <div className="h-48 rounded-2xl border border-border bg-muted/30" />
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeSkeleton;