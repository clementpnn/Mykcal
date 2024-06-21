import { cn } from "@/libs/utils"

export default function H2({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h2 className={cn(["scroll-m-20 pb-2 text-3xl font-semibold tracking-tight"], className)}>
      {children}
    </h2>
  )
}