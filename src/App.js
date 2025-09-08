import { Routes, Route, Link } from "react-router-dom";
import AllProduct from "./Pages/products";
import ProductCMS from "./Pages/productCMS";

function App() {
  return (
    <div className="w-[100%] flex flex-col">
      <div className="w-[100%] h-[8vh] border border-b border-black flex justify-between px-[3%] items-center">
        <text className="font-[Montserrat] text-lg hidden md:flex">Product</text>
        <div className="flex flex-row w-[100%] md:w-[50%] justify-between items-center">
          <Link className="flex justify-center items-center border-black w-[30%] font-medium font-[Montserrat] text-xs md:text-sm lg:text-lg" to="/products">Products</Link>
          <Link className="flex justify-center items-center border-black w-[30%] font-medium font-[Montserrat] text-xs md:text-sm lg:text-lg" to="/products/create">Product CMS</Link>
          <Link className="flex justify-center items-center border-black w-[30%] font-medium font-[Montserrat] text-xs md:text-sm lg:text-lg" to="/products/update">Product update</Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<AllProduct/>} />
        <Route path="/products" element={<AllProduct/>} />
        <Route path="/products/create" element={<ProductCMS/>} />
        <Route path="/products/update" element={<AllProduct/>} />
        <Route path="/products/delete" element={<AllProduct/>} />
        <Route path="/products/edit/update" element={<ProductCMS/>} />
      </Routes>
    </div>
  );
}

export default App;
