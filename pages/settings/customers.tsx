import { AlertModal } from "@/components/AlertModal";
import { SettingsLayout } from "@/components/SettingsLayout";
import { deleteCustomer, useCustomers } from "@/data/customer";
import { CustomerResponse } from "@/types/customer";
import { invariant } from "@/utils/invariant";
import { NextPage } from "next";
import { ComponentProps } from "pages/_app";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";

const Settings: NextPage<ComponentProps> = ({ setShowAddCustomerForm }) => {
  const { data: customers } = useCustomers();
  const [showDeleteModal, toggleDeleteModal] =
    useState<CustomerResponse | null>(null);

  if (!customers) return null;

  return (
    <SettingsLayout
      label="Customers"
      buttonText="Add Customer"
      onButtonClick={() => setShowAddCustomerForm(true)}
    >
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Title
                    </th>

                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={customer.logo || undefined}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {customer.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {customer.address.line1}
                        </div>
                        <div className="text-sm text-gray-500">
                          {customer.address.city}
                        </div>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <a
                          onClick={() => toggleDeleteModal(customer)}
                          href="#"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Delete
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <AlertModal
          show={!!showDeleteModal}
          onConfirm={async () => {
            invariant(showDeleteModal, "`showDeleteModal` is null");
            await deleteCustomer(showDeleteModal.id);
          }}
          Icon={TrashIcon}
          onClose={() => toggleDeleteModal(null)}
          title="Delete Customer"
          description={`Are you sure you want to delete ${showDeleteModal?.name}?`}
        />
      </div>
    </SettingsLayout>
  );
};

export default Settings;
