import './css/Home.css';
import mainCabin from '../assets/main-cabin.jpg';
import HeroText from "../assets/hero-filled.svg?react";
import { useEffect } from 'react';

const coloradoIndexes = [8, 7, 6, 5, 4, 3, 2, 1 ];
const cabinResortsIndexes = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19];
export default function Home() {document.querySelector("#hero-text > path:nth-child(19)")


    const setHeroTextLengths = () => {
        const heroText = document.querySelectorAll('#hero-text');

        const heroTextPaths = heroText[0].children;
        for (let i = 0; i < heroTextPaths.length; i += 1) {
            const path = heroTextPaths[i] as SVGGeometryElement;
            const length = path.getTotalLength();
            path.style.strokeDasharray = `${length}`;
            path.style.strokeDashoffset = `${length}`;
            



            if (coloradoIndexes.includes(i + 1)) {
                path.style.animation = 'line-anim 3.5s ease forwards, fill-middle 0.5s ease forwards 3s';
                path.style.stroke = '#FDF8EF';

            } else if (cabinResortsIndexes.includes(i + 1)) {
                path.style.animation = 'line-anim 3.5s ease forwards 4.5s, fill-other 0.5s ease forwards 7.5s';
                path.style.stroke = '#D3D3D3';
            } else {
                path.style.animation = 'line-anim 3.5s ease forwards, fill-other 0.5s ease forwards 3s';
                path.style.stroke = '#D3D3D3';
            }
        }
    }

    useEffect(() => {
      console.log('hello world')
      setHeroTextLengths();
    }, [])


    return (
        <div className='content'>
            <div className='black-shadow'>
              <img src={mainCabin} className='main-cabin'/>
              <HeroText  className='title-container'/>
              <div className='black-blur'>
              </div>
            </div>
            <div className='locations-black-intro'>
                
            </div>


        </div>
    )
}



