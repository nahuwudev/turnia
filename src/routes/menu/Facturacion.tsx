import { CardSectionFacturacion } from "@/composites/card-section";
import { LineChartSection } from "@/composites/charts-section";
import { TablePanel } from "@/composites/table-panel";
import { columns, facturacion } from "@/lib/table-facturacion";

export const Facturacion = () => {
  return (
    <>
      <header className="">
        <CardSectionFacturacion />
      </header>

      <section className="my-5 space-y-5">
        <TablePanel columns={columns} data={facturacion} />
      </section>

      <section className="my-5 space-y-5 w-[90%] mx-auto">
          <LineChartSection />
      </section>
    </>
  );
};
