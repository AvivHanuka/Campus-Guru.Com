"use client";
export const runtime = 'edge';

import CheckAuth from "@/components/common/CheckAuth";
import Navbar from "@/components/ui/navbar";
import { Table } from "@/components/ui/table";
import userService from "@/services/user-service";
import { TrashIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AdminPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    userService
      .getUsers()
      .then((response) => setUsers(response))
      .catch((_err) => {
        toast.error("Error occurred while Fetching users");
      });
  }, []);

  const deleteUser = (id: number, name: string) => {
    if (
      !window.confirm(
        `Are you sure you want to delete user with username ${name}?`
      )
    ) {
      return;
    }
    userService
      .deleteUser(id)
      .then(() => {
        toast.success(`User with username ${name} has been deleted!`);
        window.location.reload();
      })
      .catch(() => {
        toast.error("Error occurred while deleting user");
      });
  };

  const renderUsersTBody = (users: User[]) => {
    return (
      <tbody className='divide-y divide-gray-200 bg-white'>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td className='tw-table-td text-center border-r-0'>{user.id}</td>
              <td className='tw-table-td text-center'>
                {user.firstName + " " + user.lastName}
              </td>
              <td className='tw-table-td text-center'>{user.username}</td>
              <td className='tw-table-td text-center'>{user.email}</td>
              <td className='tw-table-td text-center'>{user.roles[0]}</td>
              <td className='tw-table-td text-center'>
                <div className='flex justify-center'>
                  <TrashIcon
                    onClick={() => deleteUser(user.id as number, user.username)}
                    className='h-6 w-6 stroke-red-600 cursor-pointer'
                  />
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    );
  };

  return (
    <div className='px-10 h-[70vh]'>
      <Navbar />
      <div className='sm:flex sm:items-center text-base my-5'>
        <div className='sm:flex-auto'>
          <h1 className=' font-semibold leading-6 text-gray-900 text-2xl'>
            Manage Users
          </h1>
        </div>
      </div>
      <div
        className={clsx(
          "mt-6 flow-root overflow-hidden border-slate-300 rounded-lg",
          users.length > 0 && "border"
        )}
      >
        <div className='-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
            {users.length > 0 ? (
              <div>
                <Table
                  headers={[
                    "User Id",
                    "Name",
                    "User Name",
                    "Email",
                    "Role",
                    "Action",
                  ]}
                  items={users}
                  renderComponent={renderUsersTBody}
                />
              </div>
            ) : (
              <div className='text-center'>No users found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <CheckAuth>
      <AdminPage />
    </CheckAuth>
  );
}
