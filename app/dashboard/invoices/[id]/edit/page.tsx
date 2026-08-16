import Form from "@/app/ui/invoices/edit-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import {fetchCustomers, fetchInvoiceById} from "@/app/seed/lib/data"; //importing functions
import {notFound} from "next/navigation";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Edit",
};
export default async function Page(props: {params: Promise<{id: string}>}) {
  //passing param as a prop
  const params = await props.params; //getting params from URL
  const id = params.id; //extracting id from params
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]); //using Promise.all to parallely execute both functions

  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {label: "Invoices", href: "/dashboard/invoices"},
          {
            label: "Edit Invoice",
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
