import React , {useState} from 'react'
import {ethers} from 'ethers';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './MetaMask.css';
import { Navigate, useNavigate } from 'react-router-dom';

const MetaMask = ({setBook , price , address , address2 , setBookText , id}) => {

    const navigate = useNavigate();

    console.log("from ",address)
    console.log("to " ,address2)

    const [startDate, setStartDate] = useState(new Date());

    const [errMsg , setErrMsg] = useState(null);
    const [defaultAc , setDefaultAc] = useState(null);
    const [useBal , setUserBal] = useState(null);
    // const[book , setBook] = useState('Book')

    const connectWallet = () =>{
       if(window.ethereum){
        window.ethereum.request({method : 'eth_requestAccounts'})
        .then((res)=>{
            accountChanged([res[0]]);
        })
       }else{
        setErrMsg("install the metamask");
       }
    }

    const accountChanged = (acName) =>{
        setDefaultAc(acName);
    }

    const exchangeRateINRtoETH = 0.000000003; // Example exchange rate (1 INR = 0.0003 ETH)

        // Calculate the amount of Ether equivalent to 100 rupees
        const rupeesAmount = price; // Amount in rupees to share
        const etherAmount = rupeesAmount * exchangeRateINRtoETH;

        const etherToWei = (ether) => {
            return Math.round(ether * 10**18).toString();
        };
        // Convert Ether amount to wei
        const valueInWei = etherToWei(etherAmount);
        console.log(valueInWei)


    const sendTransaction = async () => {
        console.log("helllo")
        setBook(false)
        
        try {
            
           

            const transactionParameters = {
                // from: "0x292be7f468Ad1986f251cFe0afd671Ac9B1567c1",
                // to: "0x063b0bae5Df1938D58650E6268F5b6dde66d1560",
                from : address,
                to : address2,
               
             
                value: valueInWei, // Amount of Ether to send (in wei)
                
            };

          
    
            const res = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [transactionParameters]
            });
            console.log("Transaction successful:", res);
            if(res){
                await setBookText('Booked')
            }
            navigate(`/property/${id}`);
        } catch (error) {
            console.error("Error sending transaction:", error);
            alert("Error sending transaction: " + error.message);
        }
    };

    console.log(startDate)
 
  return (
    // <div>
    //     <p>Address : {defaultAc}</p>
    //     <p>balance :</p>
    //     <button onClick={sendTransaction}>connect</button>
    //     {errMsg}


    // </div>
    <div className="book_outer">

         
         <div className="date">
            <p > select the date</p>
         <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
         </div>

         <button className='pay' onClick={sendTransaction}>
            pay from metamask
         </button>

    </div>
  )
}

export default MetaMask