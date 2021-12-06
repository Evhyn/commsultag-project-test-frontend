import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useForm } from 'react-hook-form';
import AlertRequiredField from "../AlertRequiredField";
import { useRouter } from "next/router"

function LoginForm() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful }, reset } = useForm();

    const loginForm = async(data,e)=>{
        e.preventDefault();
    
        const encodedString = Buffer.from(data.username+':'+data.password).toString('base64');
        
        try{
          const response = await fetch('http://localhost:8080/api/v1/user/validateLogin', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Basic '+encodedString
            },
          })
          const content = await response.json();
          if(response.status==200){
            localStorage.setItem("basic_auth", JSON.stringify(encodedString));
            router.push("/")
          }
        }
        catch(error){
          loginError("Your Username or password is incorrect")
        }
        
        reset('', {
          keepValues: false,
        })
        
    }

    const loginError = (text) => toast.error(text, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        toastId: "login",
    });

    return (
        <section>
            <div className="card shadow-lg">
                <div className="card-body">
                
                    <form className="w-full max-w-sm" onSubmit={handleSubmit(loginForm)}>
                        <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                            Username
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="username" 
                            type="text"
                            name="username"
                            {...register("username", {
                                required: "Required"
                            })}
                            />
                            {
                            errors?.username &&
                            <AlertRequiredField/>                            
                            }
                        </div>
                        </div>
                        <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                            Password
                            </label>
                        </div>
                        <div className="md:w-2/3">
                            <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                            id="password" 
                            type="password"
                            name="password"
                            {...register("password", {
                                required: "Required"
                            })}
                            />
                            {
                            errors?.password &&
                            <AlertRequiredField/>                            
                            }
                        </div>
                        </div>
                        
                        <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        
                        <div className="">
                            <button className="shadow bg-gray-500 hover:bg-gray-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="submit" disabled={isSubmitting}>
                            
                            
                            { isSubmitting ?
                            <div className=" flex justify-center items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                            </div>
                            :
                            <p className=''> Log In</p>
                            }
                            </button>
                        </div>
                        </div>
                    </form>
                
                </div>
            </div>
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
        </section>
    )
}

export default LoginForm
