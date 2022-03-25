import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { ExclamationIcon } from "@heroicons/react/outline";


function ExcersiceTable() {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const cancelButtonRef = useRef(null);

  const [oefeningName, setOefeningName] = useState("");
  const [kg, setKg] = useState("");
  
  const [activeData, setActiveData] = useState({
    id: "",
    kg: "",
    oefeningName: "",
  });

  const [APIData, setAPIData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);


  function handleOpenEditModal(data) {
    setOpenEditModal(true);
    setActiveData(data);
  }

  function handleOpenDeleteModal(data) {
    setOpenDeleteModal(true);
    setActiveData(data);
  }

  function handleOefeningNameChange(e) {
    setActiveData({
      ...activeData,
      oefeningName: e.target.value,
    });
  }

  function handleKgChange(e) {
    setActiveData({
      ...activeData,
      kg: e.target.value,
    });
  }

  async function editData({ id, oefeningName, kg }) {
    setOpenEditModal(false);
    try {
      await axios.put(
        `https://623b88862e056d1037f3dfb2.mockapi.io/fakeData/${id}`,
        {
          oefeningName,
          kg,
        }
      );
      setRefreshKey((oldKey) => oldKey + 1);
    } catch (e) {
      console.error(e);
    }
  }

  async function postData() {
    setOpenAddModal(false);
    try {
      await axios.post(`https://623b88862e056d1037f3dfb2.mockapi.io/fakeData`, {
        oefeningName,
        kg,
      });
      setRefreshKey((oldKey) => oldKey + 1);
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteData(id) {
    setOpenDeleteModal(false);
    try {
      await axios.delete(
        `https://623b88862e056d1037f3dfb2.mockapi.io/fakeData/${id}`
      );
      setRefreshKey((oldKey) => oldKey + 1);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(async function getData() {
    try {
      const result = await axios.get(
        `https://623b88862e056d1037f3dfb2.mockapi.io/fakeData`
      );
      setAPIData(result.data);
    } catch (e) {
      console.error(e);
    }

  }, [refreshKey]);

  return (
    <div className="relative flex flex-col mx-auto max-w-3xl my-5 px-6 sm:px-0">
      <div className="w-full flex justify-end">
        <button
          onClick={(e) => setOpenAddModal(true)}
          type="button"
          className="bg-green-600 hover:bg-green-700 rounded-md text-sm text-white px-4 py-2 text font-bold"
        >
          Toevoegen
        </button>
      </div>
      <div className="overflow-x-auto shadow-md rounded-md my-5 w-full">
        <table className="w-full text-left border-collapse table-auto rounded-md">
          <thead className="bg-orange text-white ">
            <tr>
              <th scope="col" className="px-4 py-4">
                Oefening
              </th>
              <th scope="col" className="px-4 py-4">
                kg
              </th>
              <th scope="col" className="px-4 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {APIData.map((data) => {
              return (
                <tr className="odd:bg-white even:bg-gray-100" key={data.id}>
                  <td className="px-4 py-4 text- font-bold">{data.oefeningName}</td>
                  <td className="px-4 py-4 font-bold ">{data.kg}</td>
                  <td className="px-4 py-4 text-right text-sm">
                    <button
                      type="button"
                      className="w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm mr-4 p-0 sm:p-1 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={(e) => handleOpenEditModal(data)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="w-auto inline-flex justify-center rounded-md border border-transparent shadow-sm p-0 sm:p-1 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={(e) => handleOpenDeleteModal(data)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add modal */}
      <Transition.Root show={openAddModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpenAddModal}
        >
          <div className="flex items-end justify-center sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                <form>
                  <div className="bg-white px-2 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 w-full text-center sm:mt-0 sm:text-left ">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Oefening toevoegen
                        </Dialog.Title>
                        <div className="mt-5 mb-5">
                          <span className="text-sm font-medium text-slate-700">
                            Naam oefening
                          </span>
                          <input
                            type="text"
                            placeholder="Naam oefening"
                            value={oefeningName}
                            onChange={(e) => setOefeningName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                          />
                        </div>
                        <div className="mb-5">
                          <span className="text-sm font-medium text-slate-700">
                            Aantal KG
                          </span>
                          <input
                            type="number"
                            placeholder="Aantal KG"
                            value={kg}
                            onChange={(e) => setKg(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={postData}
                    >
                      Toevoegen
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenAddModal(false)}
                      ref={cancelButtonRef}
                    >
                      Annuleren
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Edit modal */}
      <Transition.Root show={openEditModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpenEditModal}
        >
          <div className="flex items-end justify-center sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
                <form>
                  <div className="bg-white px-2 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 w-full text-`center` sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Oefening wijzigen
                        </Dialog.Title>
                        <div className="mt-5 mb-5">
                          <span className="text-sm font-medium text-slate-700">
                            Oefening
                          </span>
                          <input
                            type="text"
                            placeholder="Naam oefening"
                            value={activeData.oefeningName}
                            onChange={handleOefeningNameChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                          />
                        </div>
                        <div className="mb-5">
                          <span className="text-sm font-medium text-slate-700">
                            Aantal KG
                          </span>
                          <input
                            type="number"
                            placeholder="Aantal KG"
                            value={activeData.kg}
                            onChange={handleKgChange}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={(e) => editData(activeData)}
                    >
                      Bijwerken
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none  sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setOpenEditModal(false)}
                      ref={cancelButtonRef}
                    >
                      Annuleren
                    </button>
                  </div>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Delete modal */}
      <Transition.Root show={openDeleteModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpenDeleteModal}
        >
          <div className="flex items-end justify-center sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ExclamationIcon
                        className="h-6 w-6 text-red-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        Oefening verwijderen
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Weet je zeker dat je de oefening{" "}
                          <strong className="underline">
                            {activeData.oefeningName}
                          </strong>{" "}
                          wilt verwijderen?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-70 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={(e) => deleteData(activeData.id)}
                  >
                    Verwijderen
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={(e) => setOpenDeleteModal(false)}
                    ref={cancelButtonRef}
                  >
                    Annuleren
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

export default ExcersiceTable;
