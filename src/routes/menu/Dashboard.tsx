import { CardSectionDashboard } from "@/composites/card-section";
import { LastActivity } from "@/composites/latest-activity";
import { NextDates } from "@/composites/next-dates";
import { useAuthStore } from "@/store/auth-store";

export const Dashboard = () => {
  const {profile} = useAuthStore();

  return (
    <>
      {/* Header */}
      <header className="p-10 space-y-5">
        <h1 className="text-4xl font-bold text-slate-600">Bievenido {profile?.full_name}!</h1>
        <CardSectionDashboard />
      </header>
      <section className="p-10 grid grid-cols-1 xl:grid-cols-2 gap-5 space-y-5">
        <NextDates />
        <LastActivity />
      </section>
    </>
  );
};
