import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useRouter } from "next/router"
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/NavBar";
import Table from "../components/Table";
import { React, useState, useEffect } from "react"
import Loader from "react-loader-spinner";


export default function Home() {
  
  

  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if(!(localStorage.getItem('basic_auth'))){
      router.push("/login")
    } else {
      setLoading(false)
    }
    
  },[]);

  

  if(loading){
    return(
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Loader type="Bars" color="#4C5270" height={80} width={80}/>
      </div>
    )
  } 
  else {
    return (
      <div className="flex flex-col items-center justify-center">
        <Header/>
        <Navbar/>

        <main className="w-full px-4 md:w-5/6">
          <Table/>
        </main>

        <Footer/>

        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          transition={Zoom}
        />
      </div>
    )
  }
}

