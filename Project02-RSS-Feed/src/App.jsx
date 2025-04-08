
import { useEffect, useState } from 'react'
import './App.css'
import Feed from './components/Feed'
import Logo from './components/Logo'

function App() {
  const[data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedFeed = localStorage.getItem('feed')

    if(storedFeed) {
      setData(JSON.parse(storedFeed))
      setLoading(false)
    }
    else getDataFromServer("http://localhost:4000/")

  },[])


  const getDataFromServer = async url => {
    try {
      const response = await fetch(url)
      if(!response.ok){
        throw new Error(`Http error! Status : ${response.status}`)
      }
      const fetchedData = await response.json()
      setData(fetchedData)
      localStorage.setItem("feed" , JSON.stringify(fetchedData))
    } catch(error) { 
      console.error("error fetching data", error.message)

    } finally{
      setLoading(false)

    }
  }


  return (
    <>
    <h1 className='text-4xl font-semibold text-center p-4'>RSS Feed</h1>
    <div className='w-3/4 max-w-lg border mx-auto p-5 rounded-3xl shadow-2xl m-8 bg-stone-50'>

      {
        loading ? <p>Loading..</p> :

        <>
        <div  className='bg-black rounded-xl flex p-6 justify-center m-4 mb-10'>
          {/* <img src="https://cdn-images-1.medium.com/max/606/1*rOPLUJ3W6FUA3rO1U1IeuA@2x.png" alt="Netflix tech blog logo"
          className='bg-black px-6 py-2 rounded-3xl mb-4' 
          /> */}

          <Logo />
        </div>

        {
          data.map((item, i) => 
          <Feed
          key={i}
          title={item.title}
          link={item.link}
          pubDate={item.pubDate}
          />
          ) 
        }
        </>
      }
    </div>
    </>
  )
}

export default App
