import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function AllProduct() {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState(null); // State that store products data
    const [singleProduct, setSingleProduct] = useState(null);
    const [viewSwitch, setViewSwitch] = useState(false);


    // This is to get current width of the screen
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    async function fetchProducts() {
        try {
            const response = await axios.get(
                "https://68beb31f9c70953d96ed4560.mockapi.io/api/v1/project"
            );
            setProducts(response.data);
        } catch (err) {
            console.log("Failed to fetch products. Please try again later.");
        }
    };

    useEffect(() => {
        // This useEffect contains the function fetchProducts() that fetches all the products data from the endpoint
        // https://68beb31f9c70953d96ed4560.mockapi.io/api/v1/project
        fetchProducts();
    }, []);

    function fullView(id) {
        console.log(width);
        viewSwitch ? setViewSwitch(false) : setViewSwitch(true);
        width < 1024 ? setViewSwitch(false) : setViewSwitch(true);
        (async function fetchSingleProduct () {
            try {
                const response = await axios.get(
                    `https://68beb31f9c70953d96ed4560.mockapi.io/api/v1/project/${id}`
                );
                setSingleProduct(response.data);
            } catch (err) {
                console.log("Failed to fetch product. Please try again later.");
            }
        }) ();
    }

    function viewClose() {
        setViewSwitch(false);
        setSingleProduct(null);
    }

    function deleteProduct(id) {
        (async function singleDelete() {
            try {
                const response = await axios.delete(
                    `https://68beb31f9c70953d96ed4560.mockapi.io/api/v1/project/${id}`
                );
                fetchProducts();
                setViewSwitch(false);
                setSingleProduct(null);
            } catch (err) {
                console.log("Deletion of product Failed. Please try again later.");
            }
        })();

    }

    //In order to avoid complexity, i will be saving the id and getting it in productCMS.js file for update through sessionStorage
    function updateProduct(id) {
        sessionStorage.setItem("updateContext", JSON.stringify(id));
        setTimeout(()=>{
            navigate('/products/edit/update');
        }, 3000);
    }

    return (
        <>
            {products ?
                <section className={`w-[100%] flex flex-col py-[5vh] justify-center items-start`}>
                    <div className="w-[100%] flex px-[2.5%] justify-end">
                        <text className="md:text-sm sm:text-lg text-lg font-light font-[Montserrat]">{`Showing ${products.length - 1} of 100`}</text>
                    </div>
                    <section className={`${viewSwitch ? 'blur-lg' : ''} w-[100%] flex flex-row sm:justify-start justify-center gap-x-[2.5%] gap-y-[5vh] flex-wrap px-[2%] py-[6vh]`}>
                        {products.map((product)=>{
                            return (
                                <div className="lg:w-[23%] lg:aspect-[1/1.2] md:w-[48%] md:aspect-[1/1.9] sm:w-[48%] sm:aspect-[1/1.4] w-[90%] h-[60vh] sm:h-fit border flex flex-col items-center sm:gap-y-[2%] gap-y-[5%]" onClick={()=> fullView(product.id)}>
                                    <div className="w-[100%] h-[60%]">
                                        <img className="w-full h-full object-cover" src={product.image} alt=""></img>
                                    </div>
                                    <div className="flex flex-col w-[100%] px-[2%] pb-2 gap-y-1">
                                        <text className="md:text-sm sm:text-lg text-xl font-semibold font-[Montserrat]">{product.name}</text>
                                        <div className="w-[100%] flex justify-between">
                                            <text className="sm:text-sm text-lg font-light font-[Montserrat]">{new Date(product.createdAt).toLocaleDateString("en-GB")}</text>
                                            <button className="sm:text-sm text-lg font-light font-[Montserrat] bg-green-500 rounded-xl text-center flex justify-center items-center py-0 px-1">$ {product.price}</button>
                                        </div>
                                        <div className="w-[100%] aspect-[1/0.25] truncate">
                                            <text className="md:text-sm sm:text-lg text-sm font-light font-[Montserrat]">{product.description}</text>
                                        </div>
                                    </div>
                                    <div className={`${location.pathname === '/products/update' || location.pathname === '/products/delete' ? 'flex' : 'hidden'} w-[96%] lg:hidden flex-col gap-y-6 pb-3`}>
                                        <div className="border-b border-black w-[100%] flex justify-between py-1" onClick={() => deleteProduct(product.id)}>
                                            <text className="md:text-lg sm:text-sm text-lg font-light font-[Montserrat]">Delete</text>
                                            <div className="w-[10%] aspect-square">
                                                <svg viewBox="0 0 24 24">
                                                    <g>
                                                        <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1ZM20 4h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" fill="#000000" opacity="1" data-original="#000000"></path>
                                                        <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0ZM15 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" fill="#000000" opacity="1" data-original="#000000"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="border-b border-black w-[100%] flex justify-between py-1" onClick={()=>updateProduct(product.id)}>
                                            <text className="md:text-lg sm:text-sm text-lg font-light font-[Montserrat]">Update</text>
                                            <div className="w-[10%] aspect-square">
                                                <svg viewBox="0 0 6.35 6.35">
                                                    <g>
                                                        <path d="m.998 1.496-.1-.422a.265.265 0 1 0-.516.123l.264 1.091a.265.265 0 0 0 .318.195l1.092-.261c.344-.084.219-.6-.125-.516l-.525.127a2.259 2.259 0 0 1 4.017 1.163c.029.362.577.303.527-.057C5.797 1.505 4.577.437 3.022.452 2.11.542 1.447.934.998 1.496zM4.29 4.12c-.358.074-.229.613.123.516l.525-.127A2.257 2.257 0 0 1 .92 3.347a.265.265 0 1 0-.526.057 2.794 2.794 0 0 0 3.07 2.478 2.782 2.782 0 0 0 1.881-1.036l.102.423c.065.37.624.236.514-.123L5.7 4.054c-.03-.126-.146-.212-.298-.2z" paint-order="stroke fill markers" fill="#000000" opacity="1" data-original="#000000"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                    <div className={`${viewSwitch && singleProduct ? 'lg:flex' : 'lg:hidden'} fixed hidden lg:w-[80vw] lg:h-[90vh] xl:w-[60vw] xl:h-[85vh] bg-white/95 lg:left-[10vw] xl:left-[20vw] top-[12vh] flex-col px-[2%] py-[2%] justify-between`}>
                        <div className="flex justify-end w-[100%]" onClick={viewClose}>
                            <div className="w-[2%] aspect-square">
                                <svg viewBox="0 0 320.591 320.591">
                                    <g>
                                        <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z" fill="#000000" opacity="1" data-original="#000000"></path>
                                        <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z" fill="#000000" opacity="1" data-original="#000000"></path>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="w-[100%] h-[90%] flex justify-between">
                            <div className="w-[48%] h-[100%] border flex flex-col items-start gap-y-[6%]">
                                <div className="w-[90%] break-words">
                                    <text className="lg:text-6xl xl:text-6xl font-bold font-[Montserrat]">{singleProduct && singleProduct.name}</text>
                                </div>
                                <div className="w-[100%] flex flex-row justify-between pr-[10%]">
                                    <button className="lg:text-lg xl:text-lg font-light font-[Montserrat] bg-green-500 rounded-xl text-center flex justify-center items-center py-0 px-1">$ {singleProduct && singleProduct.price}</button>
                                    <text className="lg:text-lg xl:text-lg font-light font-[Montserrat]">{singleProduct && new Date(singleProduct.createdAt).toLocaleDateString("en-GB")}</text>
                                </div>
                                <div className="w-[80%] break-words">
                                    <text className="lg:text-2xl xl:text-xl font-light font-[Montserrat]">{singleProduct && singleProduct.description}</text>
                                </div>
                                <div className={`${location.pathname === '/products/update' || location.pathname === '/products/delete' ? 'flex' : 'hidden'} lg:w-[80%] xl:w-[60%] flex-col gap-y-2`}>
                                    <div className="border-b border-black w-[100%] flex justify-between py-1" onClick={() => deleteProduct(singleProduct.id)}>
                                        <text className="lg:text-lg xl:text-lg font-light font-[Montserrat]">Delete</text>
                                        <div className="w-[10%] aspect-square">
                                            <svg viewBox="0 0 24 24">
                                                <g>
                                                    <path d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1ZM20 4h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z" fill="#000000" opacity="1" data-original="#000000"></path>
                                                    <path d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0ZM15 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z" fill="#000000" opacity="1" data-original="#000000"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="border-b border-black w-[100%] flex justify-between py-1" onClick={()=>updateProduct(singleProduct.id)}>
                                        <text className="lg:text-lg xl:text-lg font-light font-[Montserrat]">Update</text>
                                        <div className="w-[10%] aspect-square">
                                            <svg viewBox="0 0 6.35 6.35">
                                                <g>
                                                    <path d="m.998 1.496-.1-.422a.265.265 0 1 0-.516.123l.264 1.091a.265.265 0 0 0 .318.195l1.092-.261c.344-.084.219-.6-.125-.516l-.525.127a2.259 2.259 0 0 1 4.017 1.163c.029.362.577.303.527-.057C5.797 1.505 4.577.437 3.022.452 2.11.542 1.447.934.998 1.496zM4.29 4.12c-.358.074-.229.613.123.516l.525-.127A2.257 2.257 0 0 1 .92 3.347a.265.265 0 1 0-.526.057 2.794 2.794 0 0 0 3.07 2.478 2.782 2.782 0 0 0 1.881-1.036l.102.423c.065.37.624.236.514-.123L5.7 4.054c-.03-.126-.146-.212-.298-.2z" paint-order="stroke fill markers" fill="#000000" opacity="1" data-original="#000000"></path>
                                                </g>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:w-[48%] h-[100%] flex justify-center items-center">
                                <div className="w-[90%] h-[90%] bg-black">
                                    <img className="w-full h-full object-cover" src={singleProduct && singleProduct.image} alt=""></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            :
                <></>
            }
        </>
    );
}

export default AllProduct;