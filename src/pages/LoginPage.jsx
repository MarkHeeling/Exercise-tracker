import React from "react";

function loginpage() {
  return (
    <div className="w-full py-20">
      <form className="w-1/3 m-auto shadow-md p-5 rounded-md bg-white">
        <label class="flex flex-col mb-5">
          <span class="text-sm font-medium text-slate-700">Gebruikersnaam</span>
          <input
            type="text"
            placeholder="Gebruikersnaam"
            value=""
            class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          />
        </label>
        <label class="flex flex-col mb-8 ">
          <span class="text-sm font-medium text-slate-700">Wachtwoord</span>
          <input
            type="text"
            placeholder="Wachtwoord"
            value=""
            class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400"
          />
        </label>
        <button
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange hover:bg-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          type="button"
        >
          Inloggen
        </button>
      </form>
    </div>
  );
}

export default loginpage;
