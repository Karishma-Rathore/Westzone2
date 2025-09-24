'use client'
 import { useEffect,useState } from "react";
 import { PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";


 export default function PushNotification(){
    const [pushData,setPushData] = useState([]);

useEffect (()=>{
    const fakeData = [
        {
          username: 'AI Quizon',
          emailPhone: 'duty.wales@icloud.com/+9712678767667',
          phone:'0',
          title:'free delivery',
          message:'no subscription',
          date:'2/09/2025',
      },
      {
        username: 'AI Quizon',
        emailPhone: 'duty.wales@icloud.com/+9712678767667',
        phone:'0',
        title:'free delivery',
        message:'no subscription',
        date:'2/09/2025',
    },
    {
        username: 'AI Quizon',
        email: 'duty.wales@icloud.com/+9712678767667',
        phone:'0',
        title:'free delivery',
        message:'no subscription',
        date:'2/09/2025',
    },
    {
        username: 'AI Quizon',
        email: 'duty.wales@icloud.com/+9712678767667',
        phone:'0',
        title:'free delivery',
        message:'no subscription',
        date:'2/09/2025',
    },
    {
        username: 'AI Quizon',
        email: 'duty.wales@icloud.com/+9712678767667',
        phone:'0',
        title:'free delivery',
        message:'no subscription',
        date:'2/09/2025',
    },
    {
        username: 'AI Quizon',
        email: 'duty.wales@icloud.com/+9712678767667',
        phone:'0',
        title:'free delivery',
        message:'no subscription',
        date:'2/09/2025',
    },
];
    setPushData(fakeData);
},[]);
return(

    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Sent Push Notification List</h1>
  
      <div className="flex justify-between mb-4">
            <input type ="text" placeholder="Sent Push Notification Title Search" className= "border rounded px-4 py-2 w-full"
            />

        </div>



        <div className="flex flex-col space-y-4">
       
        <div className="flex justify-end space-x-2">
          <button className="bg-white text-gray-800 px-4 py-2 mb-4 rounded hover:bg-gray-500">
            + Send New
          </button>
          <button className="bg-white text-gray-800 px-4 py-2 mb-4 rounded hover:bg-gray-500">
            Search
          </button>

     


        </div>
      </div>












      <div className="overflow-x-auto border rounded">
        <table className="min-w-full table-auto text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase border-b">
            <tr>
              <th className="px-4 py-2">User Name</th>
             
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Message</th>
               <th className="px-4 py-2">Date</th>



            </tr>
          </thead>
          <tbody>
            {pushData.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.username}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">{item.phone}</td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.message}</td>
                <td className="px-4 py-2">{item.date}</td>
                
              <td className="px-4 py-2">
    



    <Link
href={`/promotionregister/${idx+1}`} 
className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-2"
>
<PencilIcon className='h-5 w-5'/>Edit
</Link>
</td>



              </tr>
            ))}
          </tbody>
        </table>
      </div>


<p  className="mt-4 text-sm text-gray-500">Showing{ pushData.length} enteries</p>
   </div>
)

}









 