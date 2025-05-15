import supabase from "@/lib/supabase";
import { endOfDay, endOfMonth, startOfMonth } from "date-fns";

// Helper para obtener el inicio y fin del mes actual
const getMonthRange = () => {
  const now = new Date(); // 2025-05-15T06:30:00-03:00
  const currentStart = startOfMonth(now); // 2025-05-01T00:00:00-03:00
  const currentEnd = endOfDay(endOfMonth(now)); // 2025-05-31T23:59:59.999-03:00
  return { currentStart, currentEnd };
};

// Helper para obtener el inicio del día actual
const getTodayRange = () => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1
  );
  return { startOfDay, endOfDay };
};

// Citas de hoy
export const getTodayAppointments = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user?.id) {
    throw new Error("No hay usuario autenticado");
  }
  const { startOfDay, endOfDay } = getTodayRange();
  const now = new Date(); // Hora actual: 2025-05-15T08:51:00-03:00

  const { data, error } = await supabase
    .from("appointments")
    .select("id, appointment_date")
    .eq("user_id", session.session.user.id)
    .eq("status", "confirmed") // Filtrar por status
    .gte("appointment_date", startOfDay.toISOString())
    .lte("appointment_date", endOfDay.toISOString())
    .order("appointment_date", { ascending: true });

  if (error) throw error;

  // Filtrar citas futuras (mayores a la hora actual)
  const futureAppointments = data.filter(
    (appointment) => new Date(appointment.appointment_date) > now
  );

  return {
    count: futureAppointments.length,
    next: futureAppointments[0]?.appointment_date,
  };
};

// Citas por confirmar
export const getPendingAppointments = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user?.id) {
    throw new Error("No hay usuario autenticado");
  }
  const { data, error } = await supabase
    .from("appointments")
    .select("id")
    .eq("status", "pending")
    .eq("user_id", session.session.user.id);

  if (error) throw error;
  return data.length;
};

// Ingresos del mes
export const getMonthlyIncome = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session?.session?.user?.id) {
    throw new Error("No hay usuario autenticado");
  }

  // Rango del mes actual
  const { currentStart, currentEnd } = getMonthRange();

  // Consulta para el mes actual
  const query = supabase
    .from("invoices")
    .select("amount, status")
    .eq("user_id", session.session.user.id) // Filtrar por usuario autenticado
    .eq("status", "paid")
    .gte("issue_date", currentStart.toISOString())
    .lte("issue_date", currentEnd.toISOString())
    .order("issue_date", { ascending: true });

  const { data, error } = await query;

  if (error) {
    console.error("Error en getMonthlyIncome (current):", error);
    throw error;
  }

  const current = data.reduce(
    (sum, invoice) => sum + Number(invoice.amount),
    0
  );

  // Mes anterior
  const prevStartDate = new Date(
    currentStart.getFullYear(),
    currentStart.getMonth() - 1,
    1
  );
  const prevStart = startOfMonth(prevStartDate);
  const prevEnd = endOfDay(endOfMonth(prevStart));

  // Consulta para el mes anterior
  const prevQuery = supabase
    .from("invoices")
    .select("amount, status")
    .eq("user_id", session.session.user.id)
    .eq("status", "paid")
    .gte("issue_date", prevStart.toISOString())
    .lte("issue_date", prevEnd.toISOString())
    .order("issue_date", { ascending: true });

  const { data: prevData, error: prevError } = await prevQuery;

  if (prevError) {
    console.error("Error en getMonthlyIncome (previous):", prevError);
    throw prevError;
  }

  const previous = prevData.reduce(
    (sum, invoice) => sum + Number(invoice.amount),
    0
  );

  const percentageChange =
    previous > 0 ? ((current - previous) / previous) * 100 : 0;
  return { current, percentageChange };
};

// Ingresos totales
export const getTotalIncome = async () => {
  const { data, error } = await supabase.from("invoices").select("amount");
  if (error) throw error;
  const total = data.reduce((sum, invoice) => sum + Number(invoice.amount), 0); // Corregido a Number
  return total;
};

// Citas completadas
export const getCompletedAppointments = async () => {
  const { data, error } = await supabase
    .from("appointments")
    .select("id")
    .eq("attended", true);

  if (error) throw error;
  return data.length;
};

// Total clientes
export const getTotalClients = async () => {
  const { count, error } = await supabase
    .from("profiles")
    .select("id", { count: "exact" });
  if (error) throw error;
  return count;
};

// Horas facturadas
export const getBilledHours = async () => {
  const { data, error } = await supabase
    .from("invoices")
    .select("hours_billed");
  if (error) throw error;
  const total = data.reduce(
    (sum, invoice) => sum + (invoice.hours_billed || 0),
    0
  );
  return total;
};

// Facturas emitidas
export const getIssuedInvoices = async () => {
  const { count, error } = await supabase
    .from("invoices")
    .select("id", { count: "exact" });
  if (error) throw error;
  return count;
};

// Nuevos clientes
export const getNewClients = async () => {
  const { currentStart } = getMonthRange();
  const { count, error } = await supabase
    .from("profiles")
    .select("id", { count: "exact" })
    .gte("created_at", currentStart.toISOString());

  if (error) throw error;
  return count;
};

// Facturas pendientes
export const getPendingInvoices = async () => {
  const { data, error } = await supabase
    .from("invoices")
    .select("amount")
    .eq("status", "pending");

  if (error) throw error;
  const count = data.length;
  const totalPending = data.reduce(
    (sum, invoice) => sum + Number(invoice.amount),
    0
  ); // Corregido a Number
  return { count, totalPending };
};

// Clientes activos (simplificado: clientes con citas recientes)
export const getActiveClients = async () => {
  const { currentStart } = getMonthRange();
  const { data, error } = await supabase
    .from("appointments")
    .select("user_id")
    .gte("appointment_date", currentStart.toISOString())
    .not("user_id", "is", null);

  if (error) throw error;
  const uniqueClients = new Set(data.map((appt) => appt.user_id)).size;
  return uniqueClients;
};

// Valor promedio por cliente
export const getAverageClientValue = async () => {
  const { data, error } = await supabase
    .from("invoices")
    .select("amount, user_id");
  if (error) throw error;

  const totalAmount = data.reduce(
    (sum, invoice) => sum + Number(invoice.amount),
    0
  );
  const uniqueClients = new Set(data.map((invoice) => invoice.user_id)).size;
  return uniqueClients > 0 ? totalAmount / uniqueClients : 0;
};
