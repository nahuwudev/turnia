import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Edit, Trash } from "lucide-react";

export type Client = {
  id: string; // id de tipo string
  name: string;
  email: string;
  phoneNumber: string;
  incoming: number;
};

export const clients: Client[] = [
  {
    id: "1",
    email: "laura.martinez@email.com",
    phoneNumber: "+34 612 345-678",
    incoming: 1250,
    name: "Laura Martinez",
  },
  {
    id: "2",
    email: "laura.martinez@email.com",
    phoneNumber: "+34 612 345-678",
    incoming: 1250,
    name: "Laura Martinez",
  },
  {
    id: "3",
    email: "laura.martinez@email.com",
    phoneNumber: "+34 612 345-678",
    incoming: 1250,
    name: "Laura Martinez",
  },
  {
    id: "4",
    email: "laura.martinez@email.com",
    phoneNumber: "+34 612 345-678",
    incoming: 1250,
    name: "Laura Martinez",
  },
];

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase flex flex-col">
          <span>{row.getValue("email")}</span>
          <span>{row.getValue("phoneNumber")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "phoneNumber", 
    header: "",
    cell: () => null,
  },
  {
    accessorKey: "incoming",
    header: () => <div className="text-right">Total facturado</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("incoming"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
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
            onClick={() => console.log(row.original.id)}
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
