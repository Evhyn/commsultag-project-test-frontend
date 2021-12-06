import { useState, useEffect } from "react"
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useForm } from 'react-hook-form';
import AddButton from "./AddButton";

function Table() {
  const backend_url = "http://localhost:8080"
  const [stock, setStock] = useState();
  const { register, handleSubmit, formState: { isSubmitting, isSubmitSuccessful }, setValue, getValues } = useForm();
  
  const [updateTable, setUpdateTable] = useState(true);

  useEffect(
    async() => {

      if(updateTable){
        const stockRes = await fetch(backend_url+'/api/v1/stock/', 
        {
          headers:{
                    'Authorization': 'Basic '+JSON.parse(localStorage.getItem('basic_auth')),
                  },
        });
        const stockData = await stockRes.json()
        setStock(stockData)
        
        setUpdateTable(false)
      }
      
  },[updateTable]);
  
  const [modalTable, setModalTable] = useState('modal');
  const handleModalTable=(data)=>{
    
    setValue("id", data.id)
    setValue("name", data.name)
    setValue("name", data.name)
    setValue("quantity", data.quantity)
    setValue("price", data.price)
    
    setModalTable("modal modal-open")
  }


  

  const submitUpdateForm = async(data,e)=>{
    e.preventDefault();
    
    const updateStockRes = await fetch(backend_url+`/api/v1/stock/${data.id}/`, 
    {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+JSON.parse(localStorage.getItem('basic_auth')),
      },
      body: JSON.stringify(data),
    });
    
    if(updateStockRes.status==200){
      setModalTable("modal")
      setUpdateTable(true)
      successNotif("Successfully updated")
    }else{
      failedNotif("Error occurred, please try again.");
    }

  }

  const handleDelete = async (id) => {
    
    const deleteStockRes = await fetch(backend_url+`/api/v1/stock/${id}/`, 
    {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+JSON.parse(localStorage.getItem('basic_auth')),
      },
    });

    if(deleteStockRes.status==200){
      setModalTable("modal")
      setUpdateTable(true)
      successNotif("Successfully deleted")
    }else{
      failedNotif("Error occurred, please try again.");
    }
    
  }

  const successNotif = (text) => toast.success(text, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    toastId: "success",
  });

  const failedNotif = (text) => toast.error(text, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    toastId: "failed",
  });

    return (
        <section className='mt-28 mb-28 space-y-6'>
          <AddButton setUpdateTable={setUpdateTable} successNotif={successNotif} failedNotif={failedNotif}/>
            <div className="overflow-x-auto card bordered shadow-lg">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>ID</th> 
                    <th>Name</th> 
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead> 
                <tbody>
                  {
                    stock?.map((item)=>
                    <tr className="hover cursor-pointer hover:active" onClick={()=>handleModalTable(item)} key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                    </tr>
                    )
                  }
                </tbody>
              </table>
            </div>

            <div className={modalTable}>
              <div className="modal-box">

                <form className="form-control gap-4 grid justify-items-center" onSubmit={handleSubmit(submitUpdateForm)}>
                  <div>
                    <label className="input-group input-group-sm ">
                      <span className='w-20'>Id</span> 
                      <input 
                        disabled="disabled"
                        className="input input-bordered input-sm" 
                        type="number"
                        id="id"
                        name="id"
                        {...register("id", {
                          required: "Required"
                        })}
                      /> 
                    </label>
                  </div>
                  
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
                      Update
                    </button>
                    
                    <label className="bg-yellow-500 hover:bg-yellow-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg" onClick={()=>handleDelete(getValues("id"))}>
                      Delete
                    </label>
                    
                    <label className="bg-red-500 hover:bg-red-700 transition duration-300 ease-in-out text-white font-bold py-2 px-4 rounded-lg" onClick={()=>setModalTable("modal")}>
                      Close
                    </label>
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


export default Table