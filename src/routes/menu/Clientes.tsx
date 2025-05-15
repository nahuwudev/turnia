import { CardSectionClients } from "@/composites/card-section";
import { TablePanel } from "@/composites/table-panel";
import { clients, columns } from "@/lib/table-clients";

export const Clientes = () => {
  return (
    <>
      <header></header>

      <section className="space-y-5">
        <CardSectionClients />
        <TablePanel columns={columns} data={clients} />
      </section>
    </>
  );
};
