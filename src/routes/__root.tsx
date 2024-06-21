import NotFound from "@/components/error/notFound";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <div className="h-screen flex flex-col items-center mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <Outlet />
    </div>
  ),
  notFoundComponent: () => {
    return <NotFound />
  },
});