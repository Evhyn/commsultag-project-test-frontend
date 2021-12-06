import { useState, useEffect } from "react"
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useForm } from 'react-hook-form';


function AddButton({setUpdateTable, successNotif, failedNotif}) {
    
    const backend_url = "http://localhost:8080"
    
    const { register, handleSubmit, formState: { isSubmitting, isSubmitSuccessful }, setValue, getValues } = useForm();

    const [modalAdd, setModalAdd] = useState('modal');

    const handleModalAdd=()=>{
        
        setValue("name", null)
        setValue("name", null)
        setValue("quantity", null)
        setValue("price", null)
        
        setModalAdd("modal modal-open")
    }

    const submitAddForm = async(data,e)=>{
        e.preventDefault();
        console.log(data)
        setModalAdd("modal")
        
        const addStockRes = await fetch(backend_url+`/api/v1/stock/`, 
        {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            'Authorization': 'Basic '+JSON.parse(localStorage.getItem('basic_auth')),
          },
          body: JSON.stringify(data),
        });
        
        if(addStockRes.status==200){
          setModalAdd("modal")
          setUpdateTable(true)
          successNotif("Successfully Added")
        }else{
          failedNotif("Error occurred, please try again.");
        }
        
    
    }


    return (
        <div className='flex justify-end'> 
            <button 
              className="bg-gray-300 hover:bg-gray-400 transition duration-300 ease-in-out text-gray-800 text-sm font-bold py-2 px-4 rounded-lg"
              onClick={()=>handleModalAdd()}
            >
              Add Stock +
            </button>
            <div className={modalAdd}>
              <div className="modal-box">

                <form className="form-control gap-4 grid justify-items-center" onSubmit={handleSubmit(submitAddForm)}>
                  <div>
                    <label className="input-group input-group-sm ">
                      <span className='w-20'>Name</span> 
                      <input 
                        className="input input-bordered input-sm" 
                        type="text"
                        id="name"
                        name="name"
                        {...register("name", {
                          required: "Required"
                        })}
                      /> 
                    </label>
                  </div>

                  <div>
                    <label className="input-group input-group-sm">
                      <span className='w-20'>Quantity</span> 
                      <input 
                        className="input input-bordered input-sm" 
                        type="number"
                        id="quantity"
                        name="quantity"
                        {...register("quantity", {
                          required: "Required"
                        })}
                      /> 
                    </label>
                  </div>

                  <div>
                    <label className="input-group input-group-sm">
                      <span className='w-20'>Price</span> 
                      <input 
                        className="input input-bordered input-sm" 
                        type="number"
                        id="price"
                        name="price"
                        {...register("price", {
                          required: "Required"
                        })}
                      /> 
                    </label>
                  </div>
                  <div className="modal-action flex justify-center">
                    <button 
                      className="bg-green-500 hover:bg-green-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg"
                      type="submit"
                    >
                      Add
                    </button>                    
                    
                    <label className="bg-red-500 hover:bg-red-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg" onClick={()=>setModalAdd("modal")}>
                      Cancel
                    </label>
                  </div>
                </form>

              </div>
            </div>
          </div>
    )
}

export default AddButton
