import React  , {useState , useEffect}from 'react'
import './SavedResCard.css'
import { useParams } from 'react-router-dom';
import { getResidency , saveRes , unsaveRes } from '../../utils/api';

const SavedResCard = (props) => {
    // const { id } = useParams();
    const id = props.property._id
    console.log(id)

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


    const onUnSave =  async() =>{
      const res =  await unsaveRes(id);
      //setSaveOpen(true)
      console.log(res)

    }

  return (
    <section className='savedpropertyCard-wrapper'>

    <div className="propertyS">
            <img src={property?.image} alt="img"  className='propertyS-img'/>
            <div className="infoS">
                <span>
                <h2 className="propertyS-title">{property?.title}</h2>
                <p className="propertyC-price">{property?.price}/-</p>
                </span>
                <p className='propertyS-desc'>{property?.description}</p>
                <p className='propertyS-loc'>{property?.location}</p>
                <span>
                <p className='propertyS-country'>{property?.country}</p>
    
                <div className="unsave-btn">
                <button id='unsave-btn' onClick={onUnSave} >UnSave</button>
                </div>
                </span>
            </div>
    
            {/* <div className="review">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum fugit assumenda numquam repudiandae quas itaque facere reprehenderit, amet aliquam nihil accusamus, expedita error, corrupti soluta nemo possimus asperiores ipsa a blanditiis fuga dignissimos? Nulla.
            </div> */}
        </div>
    
    </section>
  )
}

export default SavedResCard