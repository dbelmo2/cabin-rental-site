import './css/Home.css';
import mainCabin from '../assets/main-cabin.jpg';


export default function Home() {
    return (
        <div className='content'>
            <div className='black-shadow'>
              <img src={mainCabin} className='main-cabin'/>
              <div className='title'>
                <h2 className='title-one'> Experience </h2>
                <h1 className='title-two' > Colorado </h1>
                <h2 className='title-three'> Cabin Resorts </h2>
              </div>
            </div>
        </div>
    )
}



