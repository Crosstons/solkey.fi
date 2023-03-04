import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div class="flex h-screen bg-gray-100">
      <div class="flex h-screen bg-gray-100">
  <div class="flex flex-col flex-shrink-0 w-64 bg-teal-500 text-white">
    <div class="flex items-center justify-center h-16">
      <span class="font-bold text-xl">Sidebar</span>
    </div>
    <nav class="flex-grow">
      <ul class="flex flex-col py-4 space-y-1">
        <li class="px-5 my-3">
          <a href="#" class="flex items-center font-medium hover:text-teal-200">
            <svg class="w-6 h-6 fill-current mr-3" viewBox="0 0 24 24"><path d="M4 4v16h16V4H4zm14 14H6V6h12v12z"></path></svg>
            Dashboard
          </a>
        </li>
        <li class="px-5 my-3">
          <a href="#" class="flex items-center font-medium hover:text-teal-200">
            <svg class="w-6 h-6 fill-current mr-3" viewBox="0 0 24 24"><path d="M20 9h-5V4h-2v5h-5v2h5v5h2v-5h5v-2z"></path></svg>
            Customers
          </a>
        </li>
        <li class="px-5 my-3">
          <a href="#" class="flex items-center font-medium hover:text-teal-200">
            <svg class="w-6 h-6 fill-current mr-3" viewBox="0 0 24 24"><path d="M17 8h-2V6h-3v2H7v3h2v2h3v-2h7V8zM7 16v-3h3v3H7zm5 0v-3h3v3h-3zm5 0v-3h3v3h-3z"></path></svg>
            Orders
          </a>
        </li>
        <li class="px-5 my-3">
          <a href="#" class="flex items-center font-medium hover:text-teal-200">
            <svg class="w-6 h-6 fill-current mr-3" viewBox="0 0 24 24"><path d="M19 19H5V8h14v11zm-7-2h-2v-2h2v2zm4 0h-2v-2h2v2zm-8 0H5v-2h3v2zm8-4h-2v-2h2v2zm4 0h-2v-2h2v2zm-8-4h-2v-2h2v2zm4 0h-2v-2h2v2z"></path></svg>
            Products
          </a>
        </li>
        <li class="px-5 my-3">
          <a href="#" class="flex items-center font-medium hover:text-teal-200">
            <svg class="w-6 h-6 fill-current mr-3" viewBox="0 0 24 24"><path d="M5 5h14v2H5V5zm0 6h14v2H5v-2zm0 6h14v2H5v-2z"></path></svg>
            Settings
          </a>
        </li>
        </ul>
        </nav>
        </div>
        </div>

  <div class="flex flex-col flex-grow p-6">
    <div class="flex items-center justify-between bg-white py-4 px-6 border-b">
      <div class="flex items-center">
        <button class="text-gray-600 focus:outline-none md:hidden">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <h1 class="text-lg font-medium ml-4">Page Title</h1>
      </div>
      <div class="flex items-center">
        <button class="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md mr-4">
          Create New
        </button>
        <div class="relative">
          <button class="flex text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out">
            <img class="h-8 w-8 rounded-full object-cover" src="https://source.unsplash.com/user/erondu/1600x900" alt="Your avatar"/>
          </button>
          <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>



  );
}

export default App;
