import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import { Edit, Trash } from "lucide-react";

export type Facturacion = {
  idFactura: string;
  client: string;
  email: string;
  date: Date;
  import: number;
  status: "Pendiente" | "Pagada" | "Cancelada";
};

export const facturacion: Facturacion[] = [
  {
    idFactura: "F001",
    client: "Laura Martinez",
    email: "laura.martinez@email.com",
    date: new Date("2025-05-01"),
    import: 1250,
    status: "Pendiente",
  },
  {
    idFactura: "F002",
    client: "Carlos Gómez",
    email: "carlos.gomez@email.com",
    date: new Date("2025-04-28"),
    import: 890,
    status: "Pagada",
  },
  {
    idFactura: "F003",
    client: "Ana Torres",
    email: "ana.torres@email.com",
    date: new Date("2025-05-02"),
    import: 1540,
    status: "Cancelada",
  },
  {
    idFactura: "F004",
    client: "Miguel Sánchez",
    email: "miguel.sanchez@email.com",
    date: new Date("2025-03-15"),
    import: 2100,
    status: "Pagada",
  },
];

export const columns: ColumnDef<Facturacion>[] = [
  {
    accessorKey: "idFactura",
    header: "N° factura",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("idFactura")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Cliente",
    cell: ({ row }) => {
      return (
        <div className="lowercase flex flex-col">
          <span>{row.getValue("client")}</span>
          <span className="text-slate-400 text-sm">{row.original.email}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "client",
    header: "",
    cell: () => null,
  },
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ row }) => {
      const date: Date = row.getValue("date");
      const formatted = format(date, "dd MMMM yyyy", { locale: es });
      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "import",
    header: () => <div className="text-right">Importe</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("import"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Estado",
    cell: ({ row }) => {
      return (
        <div className="lowercase flex flex-col">{row.getValue("status")}</div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 justify-end">
          <button
            className="flex items-center"
            onClick={() => console.log(row.original.idFactura)}
          >
            <Edit className="text-green-400 w-5" />
          </button>

          <button className="flex items-center">
            <Trash className="text-red-400 w-5" />
          </button>
        </div>
      );
    },
  },
];
