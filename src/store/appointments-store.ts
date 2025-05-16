import { create } from "zustand";
import { persist } from "zustand/middleware";
import supabase from "@/lib/supabase";
import { Database } from "@/lib/database.types";
import { addDays, startOfDay, endOfDay } from "date-fns";

// Usar el tipo de la view en lugar de la tabla
type Appointment = Database["public"]["Views"]["appointments_details_view"]["Row"];

interface TodayAppointments {
  count: number;
  list: Appointment[],
  next: string | null;
}

interface AppointmentsState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  initialize: () => Promise<void>;
  clearAppointments: () => void;
  getTodayAppointments: () => TodayAppointments;
  getPendingAppointments: () => number;
  getNextAppointments: (limit: number) => Appointment[];
}

export const useStoreAppointments = create<AppointmentsState>()(
  persist(
    (set, get) => ({
      appointments: [],
      loading: true,
      error: null,
      initialize: async () => {
        set({ loading: true, error: null });
        try {
          const {
            data: { session },
            error: sessionError,
          } = await supabase.auth.getSession();
          if (sessionError) {
            set({ error: sessionError.message, loading: false });
            return;
          }

          if (!session?.user) {
            set({ appointments: [], loading: false });
            return;
          }

          // Fetch appointments from today to 30 days in the future using the view
          const now = new Date();
          const start = startOfDay(now);
          const end = endOfDay(addDays(now, 30));

          const { data, error } = await supabase
            .from("appointments_details_view") // Cambiar a la view
            .select("*")
            .eq("user_id", session.user.id) // Crucial para seguridad
            .gte("appointment_date", start.toISOString())
            .lte("appointment_date", end.toISOString())
            .order("appointment_date", { ascending: true });

          if (error) {
            set({ error: error.message, loading: false });
            return;
          }

          set({ appointments: data || [], loading: false });
        } catch (err) {
          set({
            error: err instanceof Error ? err.message : "Error desconocido",
            loading: false,
          });
        }
      },
      clearAppointments: () =>
        set({ appointments: [], loading: false, error: null }),
      getTodayAppointments: () => {
        const appointments = get().appointments;
        const now = new Date();
        const { startOfDay: start, endOfDay: end } = {
          startOfDay: startOfDay(now),
          endOfDay: endOfDay(now),
        };

        const todayAppointments = appointments.filter(
          (appt) =>
            appt.status === "confirmed" &&
            appt.appointment_date && // Asegurarse de que appointment_date no sea null
            new Date(appt.appointment_date) >= start &&
            new Date(appt.appointment_date) <= end &&
            new Date(appt.appointment_date) > now
        );

        return {
          count: todayAppointments.length,
          list: todayAppointments,
          next: todayAppointments[0]?.appointment_date || null,
        };
      },
      getPendingAppointments: () => {
        const appointments = get().appointments;
        return appointments.filter((appt) => appt.status === "pending").length;
      },
      getNextAppointments: (limit: number) => {
        const appointments = get().appointments;
        const now = new Date();
        const futureAppointments = appointments
          .filter(
            (appt) =>
              appt.status === "confirmed" &&
              appt.appointment_date && // Asegurarse de que appointment_date no sea null
              new Date(appt.appointment_date) > now
          )
          .slice(0, limit);
        return futureAppointments;
      },
    }),
    {
      name: "appointments-storage",
      partialize: (state) => ({ appointments: state.appointments }),
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          const { state, version } = JSON.parse(str);
          // Invalidate data older than 1 hour
          const now = Date.now();
          const oneHour = 1000 * 60 * 60;
          const lastUpdated = state.appointments[0]?.updated_at
            ? new Date(state.appointments[0].updated_at).getTime()
            : 0;
          if (now - lastUpdated > oneHour) {
            localStorage.removeItem(name);
            return null;
          }
          return { state, version };
        },
        setItem: (name, value) =>
          localStorage.setItem(name, JSON.stringify(value)),
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);