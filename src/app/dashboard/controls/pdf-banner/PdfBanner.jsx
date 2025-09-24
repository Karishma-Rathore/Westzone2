'use client'
 import { useEffect,useState } from "react";
 import { PencilIcon,ArrowLeftIcon,ArrowsUpDownIcon ,PauseIcon, TrashIcon,PlayIcon} from "@heroicons/react/24/solid";
import Link from "next/link";


 export default function PdfBanner(){
    const [pdfData,setPdfData] = useState([]);

useEffect (()=>{
    const fakeData = [
        {
          name: 'back to school 2 to 31st August 2025-wz.pdf',
         
      },
      {
        name: 'Indian Independence Day 15th to 19th August 2025.pdf',
       
    },
    {
        name: 'Summer Deals 8th to 12th August 2025.pdf ',
        
    },
    {
        name: 'AI Quizon.pdf',
       
    },
    {
        name: 'AI Quizon.pdf',
       
    },
    {
        name: 'AI Quizon.pdf',
       
    },
];
    setPdfData(fakeData);
},[]);
return(

    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Pdf Banner List</h1>
  
      <div className="flex justify-between mb-4">
            <input type ="text" placeholder=" Pdf Banner Title" className= "border rounded px-4 py-2 w-full"
            />

        </div>



        <div className="flex flex-col space-y-4">
       
        <div className="flex justify-end space-x-2">
          <button className="bg-white text-gray-800 px-4 py-2 mb-4 rounded hover:bg-gray-500">
            + Pdf Upload
          </button>
          <button className="bg-white text-gray-800 px-4 py-2 mb-4 rounded hover:bg-gray-500">
            Search
          </button>

          <button className="bg-red-500 text-white px-4 py-2 mb-4 rounded hover:bg-gray-500">
            <ArrowLeftIcon className="h-4 w-4"/>Clear
          </button>


        </div>
      </div>












      <div className="overflow-x-auto border rounded">
        <table className="min-w-full table-auto text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase border-b ">
            <tr>
        <th className="px-4 py-2">
          <div className="flex items-center gap-2">Name<ArrowsUpDownIcon className="h-4 w-4 text-gray-800"/></div>

        </th>


            </tr>
          </thead>
          <tbody>
            {pdfData.map((item, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{item.name}</td>
               
                <td className="px-4 py-2">
              </td>
              <td className="px-4 py-2">
                <div className="flex justify-end gap-2">
                <Link
                   href={`/promotionregister/${idx+1}`} 
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 flex items-center gap-">
                        <PencilIcon className='h-4 w-4'/>Edit

                   </Link>


                  
                  <Link
                   href="#" 
                      className="bg-green-500 text-white px-3 py-1 rounded flex items-center gap-2 ">
<PlayIcon className='h-4 w-4'/>Start

</Link> 

<Link
                   href={`#`} 
                      className="bg-red-500 text-white px-3 py-1 rounded flex items-center gap-2 ">
<TrashIcon className='h-5 w-5'/>

</Link>



</div>
</td>



              </tr>
            ))}
          </tbody>
        </table>
      </div>


<p  className="mt-4 text-sm text-gray-500">Showing{ pdfData.length} enteries</p>
   </div>
)

}









 