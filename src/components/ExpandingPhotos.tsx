import tallCabinTwo from '../assets/slider/tall-cabin-two-opt.jpg';
import tallCabinThree from '../assets/slider/tall-cabin-three-opt.jpg';
import squirrelPhoto from '../assets/slider/squirrel-photo-opt.jpg';
import './css/ExpandingPhotos.css';
import OutlinedDiv from './OutlinedDiv';


// TODO: Optimize remaining photos, delete unused ones.

export default function ExpandingPhotos() {


    return (
        <div className='locations-photos'>

        <div className='locations-photos-slider'>
            <OutlinedDiv outerDivClassName='locations-photos-header' innerDivClassName=''>
                    Like never before
            </OutlinedDiv>
            <div className='locations-photo-container'>
                <img src={squirrelPhoto} className='locations-photo'/>
                <div className='locations-photo-text-container'>
                    <div className='locations-photo-text-title'>
                    <span style={{ fontSize: 40}}>Unfiltered</span> Wildlife
                    </div>
                    <div className='locations-photo-text-desc'>
                    Experience Colorado's diverse wildlife right from the comfort of your cabin retreat
                    </div>
                </div>
            </div>
            <div className='locations-photo-container'>
                <img src={tallCabinTwo} className='locations-photo'/>
                <div className='locations-photo-text-container'>
                    <div className='locations-photo-text-title'>
                        <span style={{ fontSize: 40}}>Pure</span> Nature
                    </div>
                    <div className='locations-photo-text-desc'>
                    From wooded trails to mountain views and snowy fields, surround yourself in nature
                    </div>
                </div>
            </div>
            <div className='locations-photo-container'>
                <img src={tallCabinThree} className='locations-photo'/>
                <div className='locations-photo-text-container'>
                    <div className='locations-photo-text-title'>
                    <span style={{ fontSize: 40}}>Maximum</span> Comfort
                    </div>
                    <div className='locations-photo-text-desc'>
                    Our cabins offer cozy, comfortable living with everything you need for a relaxing getaway
                    </div>
                </div>
            </div>
        </div>

</div>
)
}