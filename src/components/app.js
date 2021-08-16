import React, { useState, useEffect } from 'react';
import Edm from './edm';
import Pop from './pop';
import Hiphop from './hiphop';
import List from './list'
import { Credentials } from './auth';
import axios from 'axios';

const App = () => {

const auth = Credentials()

const [playlist, setPlaylist] = useState()

const [musicList, setMusicList] = useState([])
const [hiphopList, setHipHopList] = useState([])

const [token, setToken] = useState('');

useEffect(() => {
    
    axios('https://accounts.spotify.com/api/token', {
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Basic ' + btoa(auth.ClientId + ':' + auth.ClientSecret)      
      },
      data: 'grant_type=client_credentials',
      method: 'POST'
    })
    .then(newtoken => {      
      setToken(newtoken.data.access_token);

      axios('https://api.spotify.com/v1/browse/new-releases?limit=10', {
        method: 'GET',
        headers: { 'Authorization' : 'Bearer ' + newtoken.data.access_token}
      })
      .then (response => {        
        console.log(response)
        setMusicList(response.data.albums.items);
      })
      
    });
    
  },[])
  const trigger ={
    'hip':true,
  
  }
const handleClickHiphop = ()=>{
  console.log('clicked')
  trigger['hip'] =true;
  const arr =[]
  for(let i = 0; i < musicList.length;i++){
    axios(`https://api.spotify.com/v1/search?q=${musicList[i].artists[0].name}&type=artist&limit=1`, {
      method: 'GET',
      headers: { 'Authorization' : 'Bearer ' + token}
    })
    .then ((response) => {      
      if(musicList[i]['album_type'] === 'single' &&  musicList[i].artists[0].name === response.data.artists.items[0].name){
        if(response.data.artists.items[0].genres.includes('rap')){
          arr.push(musicList[i])
            
        }
      }
    })
  }
  setHipHopList(arr)
  console.log(trigger.hip, hiphopList)
  }


const renderTable = ()=>{
    console.log('rendering')
     
          // {console.log('hiphoplist',hiphopList)}
        
         {/* <tr>
           <td>{user.artists[0].name}</td>
           <td>{user.name}</td>
           <td>{user['release_date']}</td>
           <td><img src={user.images[1].url}/></td>
         </tr> */}
         console.log('hiphopff',hiphopList)
        //  console.log(hiphopList.map(user => {
        //   return (
        //     <tr>
        //       <td>{user.artists[0].name}</td>
        //       <td>{user.name}</td>
        //       <td>{user['release_date']}</td> 
        //       <td><img src={user.images[1].url}/></td>
        //     </tr>
        //   )
        // }))
         return musicList.map(user => {
          return (
            <tr>
              <td>{user.artists[0].name}</td>
              <td>{user.name}</td>
              <td>{user['release_date']}</td> 
              <td><img src={user.images[1].url}/></td>
            </tr>
          )
        })
    
  }


    
const handleClickPop = ()=>{
    console.log('clicked pop')
    setMusicList('Pop');
}
const handleClickEdm = ()=>{
    console.log('clicked edm')
    setMusicList('Edm');
}

    return (
        <div className= 'wrapper'>
             <div className= 'musicComponents'>
            <Edm edmHandler={handleClickEdm}/>
            <Hiphop hiphopHandler={handleClickHiphop}/>
            <Pop popHandler={handleClickPop}/>
            </div>
            <div>
      
          <table>
              <thead>
                <tr>
                  <th>Artist</th>
                  <th>Song</th>
                  <th>Release Date</th>
                  <th>Cover Photo</th>
                </tr>
              </thead>
              <tbody>{trigger['hip']===true ? renderTable(): null}</tbody>
          </table>
        </div>
              
            
           
        </div>
    )
};

export default App;