import React from 'react'

function Clustor() {
  return (
    <div>


<div id="defaultModal" tabindex="-1" aria-hidden="true" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div class="relative p-4 bg-white rounded-lg shadow sm:p-5">
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5">
                <h3 class="text-lg font-semibold text-gray-900">
                  Clustur Name Supply : 69
                </h3>
            </div>

            <form action="#">
                <div class="grid gap-4 mb-4 sm:grid-cols-1">

                    <div>
                        <label for="name" class="block mb-2 text-lg font-medium text-gray-900">Token List</label>
                        <input type="text" id="disabled-input" aria-label="disabled input" class=" bg-gray-100 border border-gray-300 text-gray-900 text-md mb-6 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value="Address : 3" disabled/>
                        <input type="text" id="disabled-input" aria-label="disabled input" class=" bg-gray-100 border border-gray-300 text-gray-900 text-md mb-6 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value="Address : 3" disabled/>
                        <input type="text" id="disabled-input" aria-label="disabled input" class=" bg-gray-100 border border-gray-300 text-gray-900 text-md mb-6 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" value="Address : 3" disabled/>
                    </div>
                    <div className="">
                        <div className="flex justify-start">
                        <label for="price" class="block mb-2 ml-2 text-sm font-medium text-gray-900">Amount</label>
                        </div>
                        <input type="number" name="price" id="price" class="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block item-center p-2.5" placeholder="$2999" required=""/>
                    </div>
                   
                </div>
                <div class="flex items-center justify-center">
  <div
    class="inline-flex shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
    role="group">
    <button
      type="button"
      class="inline-block rounded-l bg-purple-700 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-purple-800 focus:bg-purple-600 focus:outline-none focus:ring-0 active:bg-purple-700"
      data-te-ripple-init
      data-te-ripple-color="light">
      Faucet
    </button>
    <button
      type="button"
      class="inline-block bg-purple-700 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-purple-800 focus:bg-purple-600 focus:outline-none focus:ring-0 active:bg-purple-700"
      data-te-ripple-init
      data-te-ripple-color="light">
      TokenAccounts
    </button>
        <button
      type="button"
      class="inline-block bg-purple-700 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-purple-800 focus:bg-purple-600 focus:outline-none focus:ring-0 active:bg-purple-700"
      data-te-ripple-init
      data-te-ripple-color="light">
      Issue
    </button>
    <button
      type="button"
      class="inline-block rounded-r bg-purple-700 px-6 pt-2.5 pb-2 text-xs font-medium leading-normal text-white transition duration-150 ease-in-out hover:bg-purple-800 focus:bg-purple-600 focus:outline-none focus:ring-0 active:bg-purple-700"
      data-te-ripple-init
      data-te-ripple-color="light">
      Redeem
    </button>
  </div>
</div>
            </form>
        </div>
    </div>
</div>
    </div>
  )
}

export default Clustor