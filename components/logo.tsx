import { Icons } from "@/components/icons"

export function Logo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
        <Icons.forms className="h-4 w-4 text-primary-foreground" />
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-lg font-semibold leading-none text-foreground">Mufar Forms</span>
          <span className="text-[10px] text-muted-foreground">by Mufar Technologies</span>
        </div>
      )}
    </div>
  )
}

export function LogoIcon() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
      <Icons.forms className="h-4 w-4 text-primary-foreground" />
    </div>
  )
}
