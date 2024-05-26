
import { toast } from 'react-toastify';
const useAuthCheck = () => {
   
    const validateLogin = ()=>{
      const token = localStorage.getItem("token");
        if(token){
            return true
        }
        else return false;
    }
  return (

    {
        validateLogin
      
    }
  )
}

export default useAuthCheck