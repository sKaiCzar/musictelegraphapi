import { useState } from 'react'
import axios from 'axios';

function App() {
 
const [search,setSearch]=useState('');
const [results,setResults]=useState([]);
function handleChange(e) {
  setSearch(e.target.value);
   }

async function searchByKeyword() {
  if(search.length==0)
  {
    alert("Enter a non empty string")
  }
  else{

  try {
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: {search},
        maxResults: 25,
        key: 'AIzaSyACM0M49GGGSNPkNswe0RokUnUx5Vi6pn8', // Replace with your actual YouTube API key
        type: 'video',
        videoCategoryId: '10'
      }
    });

    setResults(response.data.items);
    // console.log(response.data.items);
    // for (const item of results) {
    //   console.log(`[${item.id.videoId}] Title: ${item.snippet.title}`);
    // }
  } catch (error) {
    alert('Error fetching YouTube search results')


    console.error('Error fetching YouTube search results:', error);
  }
}
}
// searchByKeyword();


  return (
        <div className=' d-flex flex-column justify-content-center align-items-center'>
          <h1 className="m-2"> YT SEARCH </h1>
          <input className="form-control form-control-lg w-75 border border-danger m-3 " type="text" value={search} onChange={handleChange} ></input>
          <button type="button" className="d-flex btn btn-primary m-3 " onClick={searchByKeyword} >Search</button>
          <div>
          <ol>
              {results.map((result, key) => (
                <li key={key}>
                  {result.snippet.title} - <a href={`https://www.youtube.com/watch?v=${result.id.videoId}` } target="_blank" rel="noopener noreferrer" >Watch Video</a>
                </li>
              ))}
            </ol>
          </div>
        </div>
       
      
  )
}

export default App
