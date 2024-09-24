// import React from 'react'

// export default function SearchBar() {
//   return (
//     <div>
//       <div className="search-bar ">
//                     <input type='text' />
//                     <button className='btn' style={{ backgroundColor:"rgb(48, 48, 244)" ,color:"white"}}>
//                         Search
//                     </button>
//                 </div>
//     </div>
//   )
// }
import React from "react";
import { HiLocationMarker } from "react-icons/hi";

const SearchBar = ({ filter, setFilter }) => {
  return (
    <div className=" search-bar col-md-6 ">
      <HiLocationMarker color="var(--blue)" size={25} />
      <input
        placeholder="Search ..."
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button className='btn' style={{ backgroundColor:"rgb(48, 48, 244)" ,color:"white" , marginLeft:"20px"}}>
                         Search
                    </button>
    </div>
  );
};

export default SearchBar;
