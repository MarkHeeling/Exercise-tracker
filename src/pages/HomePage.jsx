import React from "react";

function HomePage(){
    return(
        <div className="relative flex justify-center bg-white overflow-hidden min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block xl:inline">
                    Een simpele tool voor al je
                  </span>{" "}
                  <span className="block text-orange xl:inline">
                    oefeningen
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex justify-center">
                  <div className="rounded-md shadow">
                    <a
                      href="/sport-tracker"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-orange hover:bg-orange-700 md:py-4 md:text-lg md:px-10"
                    >
                      Start met bijhouden
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    )
}

export default HomePage;