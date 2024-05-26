import React , {useEffect , useState , useContext, useCallback}from 'react'
import './PropertyCard.css'
import { useParams } from 'react-router-dom';
import { getResidency , saveRes , unsaveRes , addReview , deleteReview , getmetaMaskAddress , getUserData} from '../../utils/api';
import useAuthCheck from '../../hooks/useAuthCheck'
import MetaMask from '../MetaMask/MetaMask';

import { Navigate, useNavigate } from 'react-router-dom'
// import { getUser } from '../../../../server/controller/userController';

const PropertyCard = () => {

  

  const[address , setAddress] = useState('');
  const[address2 , setAddress2] = useState('');

  const[bookText , setBookText] = useState('Booked')

useEffect(()=>{
  const getAdd = async() =>{
    const address =  await getmetaMaskAddress(localStorage.getItem("email"));
    console.log(address)
    setAddress(address);
   }
 
 
   getAdd();
},[])


console.log(address)


  

  const navigate = useNavigate();


  const {validateLogin }= useAuthCheck();
  const isLogin = validateLogin();
  console.log(isLogin)



    const { id } = useParams();
    console.log(id)


  

    const handleClick = () => {
      navigate(`/property/${id}`);
    };

    const[saveOpen , setSaveOpen] = useState(true)

    const [property, setProperty] = useState([]);

    const [review, setReview] = useState('')

    const [book , setBook] = useState(false);

    const handleChange = (event) => {
      const value = event.target.value;
        setReview(value)
    };
    console.log(review)

    useEffect(() => {
      
      const fetchData = async () => {
        try {
          const response = await getResidency(id)
          const data = await response;
          console.log(data)
          setProperty(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);

    const onSave =  async() =>{
      const res =  await saveRes(id);
      console.log(res)
      setSaveOpen(false);

    }

    const onUnSave =  async() =>{
      const res =  await unsaveRes(id);
      setSaveOpen(true)
      navigate(`/property/${id}`);
      console.log(res)

    }

    const onAddReview = async()=>{
      const res = await addReview(id , review , 4);
      console.log(res)
      setReview('')
      navigate(`/property/${id}`);
    }


    const onClickBook = () =>{
      setBook(true);
    }
    


    
  
    
   const comments =property.reviews
   console.log(comments)

   console.log("propertyy " ,property.owner)
   const getuser = async()=>{
    if(property.owner){
    const data = await getUserData(property.owner);
    console.log(data)
    console.log("post add : " ,data?.metaMaskAddress);
    setAddress2(data?.metaMaskAddress)

    }
  }
  
  getuser();
  console.log("add2" ,address2)

  return (
    <section className='propertyCard-wrapper'>

<div className="propertyC">
        <img src={property?.image} alt="img"  className='propertyC-img'/>
        <div className="infoC">
            <span>
            <h2 className="propertyC-title">{property?.title}</h2>
            <p className="propertyC-price">{property?.price}/-</p>
            </span>
            <p className='propertyC-desc'>{property?.description}</p>
            <p className='propertyC-loc'>{property?.location}</p>
            <span>
            <p className='propertyC-country'>{property?.country}</p>
          { 
           isLogin  && saveOpen? 
            <div className="save-btn">
            <button id='save-btn' onClick={onSave} > Save</button>
            </div>
             :
            isLogin && <div className="save-btn">
            <button id='save-btn' onClick={onUnSave} >UnSave</button>
            </div>

                 }  

         {isLogin && <div className="save-btn">
            <button id='save-btn' onClick={onClickBook} >{bookText}</button>
            </div>
}

            </span>
        </div>

        { book && <MetaMask setBook={setBook}  id={id} price ={property?.price} address = {address} address2={address2} setBookText= {setBookText}/>}
       
      { 
       isLogin &&
      <div className="review">
       
       <label htmlFor="review"><h3>Add Review</h3></label>
        <input 
        name="review"
        value={review}
        onChange={handleChange}
        type='text'
        id='review'  
        placeholder='Leave your review here...'/>

         <div className="review-btn">
        <button id='review-btn' onClick={onAddReview}>AddReview</button>
        </div>
       </div>
     }
       <div className="reviews">
          <h3>All Reviews</h3>
          <ul>
          {comments && Array.isArray(comments) &&
            comments.map((comment)=>(
              <div className="comments">
                <div>
                <p>{comment.comment}</p>
                <h6>-{comment.author.userName}</h6>
                </div>


              { 
              
              //  userEmail=== &&
              localStorage.getItem("email")===comment.author.email&&
              
                <div className="review-btn">
                <button id='review-btn'  onClick={ ()=>{const res =deleteReview( id , comment._id) ;console.log(res)}}>delete</button>
                </div>

              }

              </div>
            ))
          }
          </ul>
             

        </div>

       
    </div>

   


</section>
  )
}

export default PropertyCard