import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginForm from "../components/Form/LoginForm";
import { React, useState, useEffect } from "react"
import { useRouter } from "next/router"
import Loader from "react-loader-spinner";

export default function Login() {
    
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if(!(localStorage.getItem('basic_auth'))){
            setLoading(true)
        } else {
            router.push("/")
        }
      },[]);

    if(loading){
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
            
                <Header/>

                <main className="flex flex-col items-center justify-center w-full flex-1 px-10 text-center">
                    
                    <section className="pb-10">
                        <h1 className="text-2xl font-bold text-gray-700">
                            Commsult AG Project Test Login
                        </h1>
                    </section>

                    <LoginForm/>
                </main>

                <Footer/>

            
            </div>
        )
    } else {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <Loader type="Bars" color="#4C5270" height={80} width={80}/>
            </div>
        )
    }
}
