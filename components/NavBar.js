import { useRouter } from "next/router"

function NavBar() {
    const router = useRouter();
    const handleLogout = () => {
        while((localStorage.getItem('basic_auth'))){
          localStorage.removeItem('basic_auth')
        }
        router.push("/login")
    }
    return (
        <nav className="flex justify-center w-full bg-gray-600 py-4">
          <div className="flex justify-between w-4/5">
            <h1 className='self-center text-white text-xl font-bold'>PROJECT TEST</h1>
            <button className="btn btn-outline text-white" onClick={() => handleLogout()}>Log Out</button>
          </div>
        </nav>
    )
}

export default NavBar
