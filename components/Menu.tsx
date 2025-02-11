import React from 'react'

function Menu() {
  return (
    <nav className="block w-full max-w-screen-lg px-4 py-2 mx-auto bg-black-400 bg-opacity-90 sticky top-3 shadow rounded-xl lg:px-8 lg:py-3 backdrop-blur-lg backdrop-saturate-150 z-[9999] mt-10">
    <div className="container flex flex-wrap items-center justify-between mx-auto text-white">
        <a href="#"
        className="mr-4 block cursor-pointer py-1.5 text-base text-white font-semibold">
            James Victor Alvarez
        </a>
        <div className="hidden lg:block">
        <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="flex items-center p-1 text-sm gap-x-2 text-white">
            <a href="#" className="flex items-center">About</a>
            </li>
            <li className="flex items-center p-1 text-sm gap-x-2 text-white">
            <a href="#" className="flex items-center">Projects</a>
            </li>
        </ul>
        </div>
        <button
        className="relative ml-auto h-6 max-h-[40px] w-6 max-w-[40px] select-none rounded-lg text-center align-middle text-xs font-medium uppercase text-inherit transition-all hover:bg-transparent focus:bg-transparent active:bg-transparent disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none lg:hidden"
        type="button">
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">

        </span>
        </button>
    </div>
    </nav>
  )
}

export default Menu