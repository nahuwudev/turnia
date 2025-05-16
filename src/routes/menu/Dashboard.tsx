import { NextDates } from "@/composites/next-dates";
import { CardSectionDashboard } from "@/composites/card-section";
import { LastActivity } from "@/composites/latest-activity";
import { useStoreProfile } from "@/store/profle-store";
import { Skeleton } from "@/components/ui/skeleton";

export const Dashboard = () => {
  const { profile, loading, error } = useStoreProfile();
  if (error) return <div>Error: {error}</div>;


  return (
    <>
      <header className="p-10 space-y-5">
        {loading ? (
          <Skeleton className="h-10 bg-white w-full rounded-full" />
        ) : (
          <h1 className="text-4xl font-bold text-slate-600">
            Bienvenido {profile?.full_name}!
          </h1>
        )}
        <CardSectionDashboard />
      </header>
      <section className="p-10 grid grid-cols-1 xl:grid-cols-2 gap-5 space-y-5">
        <NextDates />
        <LastActivity />
      </section>
    </>
  );
};
