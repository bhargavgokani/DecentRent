import React , {useState , useEffect} from 'react'
import './OwnedResCard.css'
import { Link, NavLink } from 'react-router-dom'
import { getResidency , deleteResidency } from '../../utils/api';
import { Navigate, useNavigate } from 'react-router-dom'
const OwnedResCard = (props) => {

    // const { id } = useParams();
    const id = props.property._id
    console.log(id)

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/update/${id}`);
    };
    // const[saveOpen , setSaveOpen] = useState(true)

    const [property, setProperty] = useState([]);

    useEffect(() => {
      // Your data fetching logic here
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


const onDelete = async()=>{
  await deleteResidency(id);
  
}
  return (
    <section className='ownedpropertyCard-wrapper'>

    <div className="propertyO">
            <img src={property?.image} alt="img"  className='propertyO-img'/>
            <div className="infoO">
                <span>
                <h2 className="propertyO-title">{property?.title}</h2>
                <p className="propertyO-price">{property?.price}/-</p>
                </span>
                <p className='propertyO-desc'>{property?.description}</p>
                <p className='propertO-loc'>{property?.location}</p>
                <span>
                <p className='propertyO-country'>{property?.country}</p>

                <div className="own-btns">

                <div className="update-btn">
                <button id='update-btn' onClick={handleClick}  >
                  Update
                </button>
                </div>

                <div className="delete-btn" >
                <button id='delete-btn' onClick={onDelete} >Delete</button>
                </div>

                </div>
  
                </span>
            </div>
    
        </div>
    
    </section>
  )
}

export default OwnedResCard