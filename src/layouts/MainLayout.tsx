import type { ReactNode } from 'react'

interface MainLayoutProps {
  sidebar: ReactNode
  main: ReactNode
  rightPane: ReactNode
  footer: ReactNode
  headerActions?: ReactNode
}

export function MainLayout({
  sidebar,
  main,
  rightPane,
  footer,
  headerActions,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4 sm:p-6 lg:gap-6 lg:p-8">
        <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/80 px-4 py-3 shadow-card backdrop-blur dark:border-white/5 dark:bg-slate-900/60 sm:px-6">
          <div className="flex items-center gap-2">
            <img
              src="/logo-light.svg"
              alt="NexusAI Studio"
              className="h-10 dark:hidden"
            />
            <img
              src="/logo-dark.svg"
              alt="NexusAI Studio"
              className="hidden h-10 dark:block"
            />
          </div>
          <div className="flex items-center gap-3">{headerActions}</div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[320px_1fr_360px] xl:grid-cols-[340px_1fr_380px]">
          <aside className="order-1 flex flex-col gap-4 lg:order-none">
            {sidebar}
          </aside>
          <section className="order-3 flex flex-col gap-4 lg:order-none">
            {main}
            {footer}
          </section>
          <aside className="order-2 lg:order-none">{rightPane}</aside>
        </div>
      </div>
    </div>
  )
}

