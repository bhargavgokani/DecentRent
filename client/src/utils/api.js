import axios from 'axios';
import {toast} from 'react-toastify';

export const api = axios.create({
    baseURL: "http://localhost:8082/api"
})


//residencie api

export const getAllResidency = async()=>{
    try{
    const res = await api.get('/residency/getAllResidency' ,  {
        timeout : 10*1000
    } )
    console.log(res.data)
    return res

    } catch(error){
    toast.error("something went wrong")
    throw error 
   }
}

export const getSavedRes = async()=>{
    try{

        const token = localStorage.getItem('token');
        if(!token){
            return
        }

    const res = await api.get('/residency/getsavedRes' ,  {
        headers: {
         'Authorization': `Bearer ${token}`
       
        }
      })
    console.log(res.data)
    return res

    } catch(error){
    toast.error("something went wrong")
    throw error 
   }
}


export const getOwnedRes = async()=>{
    try{

        const token = localStorage.getItem('token');
        if(!token){
            return
        }

    const res = await api.get('/residency/getOwnedRes' ,  {
        headers: {
         'Authorization': `Bearer ${token}`
       
        }
      })
    console.log(res.data)
    return res

    } catch(error){
    toast.error("something went wrong")
    throw error 
   }
}

export const getResidency = async(id)=>{
    try{
        const res = await api.get(`residency/${id}/getResidency` , {
            timeout : 10*1000
        })
        console.log(res.data.Residency)
        return res.data.Residency
    }
    catch(error){
        toast.error("something went wrong")
        throw error
    }
}

export const createResidency = async(  title , description ,image, price , location , country) =>{
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return
        }
        const res = await api.post('/residency/createResidency' , { title , description ,image, price , location , country} , {
            headers: {
             'Authorization': `Bearer ${token}`
           
            }
          })
         
        console.log(res)
        toast.success(res.data)
        return res
         
    }
    catch(error){
        toast.error("something went wrong")
        throw error
    }
}

export const deleteResidency = async( id) =>{
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return
        }
        
        const res = await api.get(`/residency/${id}/deleteResidency` , {
            headers: {
             'Authorization': `Bearer ${token}`
            }
          })
         
        console.log(res.data)
        toast.success(res.data)
        return res
         
    }
    catch(error){
        toast.error("something went wrong")
        throw error
    }
}

export const updateResidency = async( id ,title , description , image , price , location , country ) =>{
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return
        }
        const res = await api.post(`residency/${id}/updateResidency`, { title , description , image , price , location , country} , {
            headers: {
             'Authorization': `Bearer ${token}`
           
            }
          })
         
        console.log(res)
        toast.success(res.data.message)
        return res.data.Residency
         
    }
    catch(error){
        toast.error("something went wrong")
        throw error
    }
}


//user api

export const register = async( userName , email , password , metaMaskAddress) =>{
    try{
        const res =  await api.post('/user/register' , {userName , email , password , metaMaskAddress});

        console.log(res)
        toast.success(res.data)

    } catch(error){
        toast.error("something went wrong")
        throw error
    }
}

export const login = async(email , password)=>{
    try{
        const res = await api.post('/user/login' , {email , password});
        console.log(res)
        console.log(res.data.Token)
        const token = res.data.Token;
        localStorage.setItem('token', token);
        toast.success("login successfully !" , {
            position: "top-center"
          })
        return res;
    }
    catch(error){
        toast.error("something went wrong")
        throw error
    }
}
export const getmetaMaskAddress = async(email) =>{
    console.log(email)
    console.log("hi")
    try{
     
        const res = await api.post('/user/getAddress' , {email});
        // console.log(res.data.user.metaMaskAddress)
        console.log(res)
        return res.data.user.metaMaskAddress;
    }
    catch(error){
        // toast.error("something went wrong")
        throw error
    }
}

export const getUserData = async(id) =>{
    console.log(id);
    try{

        const res = await api.post('/user/getUser' , {id});
        // console.log(res.data.user.metaMaskAddress)
        console.log(res)
        return res.data.user;

    }  catch(error){
        // toast.error("something went wrong")
        throw error
    }
}

export const logout = async()=>{
    try{
    const token = localStorage.getItem('token');
    if(!token){
        return
    }
     const res = await api.get('/user/logout' , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      } )

    localStorage.removeItem('token');
    toast.success(res.data ,  {
        position: "top-center"
      })

    }
    catch(error){
        toast.error("something went wrong")
        throw error
    }
}

export const saveRes = async( id  )=>{
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return
        }
         
        const res = await api.get(`/user/${id}/save` , {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          } )

          toast.success(res.data , {
            position : "top-center"
          })

    } catch(error){
        toast.error("something went wrong")
        throw error
    }
}

export const unsaveRes = async(id)=>{
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return
        }
         
        const res = await api.get(`/user/${id}/unsave` ,  {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }  )

          toast.success(res.data , {
            position : "top-center"
          })

    } catch(error){
        toast.error("something went wrong")
        throw error
    }
}

//review api

export const addReview = async(id , comment , rating)=>{
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return
        }

        const res =await api.post(`review/${id}` , { comment , rating} , {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          } )
          
          console.log(res.data.Residency)
          toast.success(res.data.message, {
            position : "top-center"
          })


    }catch(error){
        toast.error("something went wrong")
        throw error
    }
}

export const deleteReview = async(id , reviewId)=>{
    try{
        const token = localStorage.getItem('token');
        if(!token){
            return
        }

        const res =await api.get(`review/${id}/${reviewId}` , {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          } )
          
          console.log(res.data)
          toast.success(res.data, {
            position : "top-center"
          })


    }catch(error){
        toast.error("something went wrong")
        throw error
    }
}

