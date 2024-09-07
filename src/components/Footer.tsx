
import PeaksSvg from '../assets/animated-wave.svg?react';
import { IconButton } from '@mui/material';


import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa6";

import { FaPhone } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaEnvelope } from "react-icons/fa6";



export default function Footer() {
    return (
        <div className='footer-container'>
                <PeaksSvg className='footer-svg'/>
                <div className='footer-content'>
                    <div className='footer-about-us'>
                        <div className='footer-about-us-title'>
                            More About Us
                        </div>
                        <div className='footer-about-us-text'>
                        Driven by our deep love for Colorado's natural beauty, we founded Experience Colorado™ to provide more than just a place to stay—our cabin resorts are an invitation to connect with nature. Surrounded by towering pines and majestic peaks, we invite you to experience the serenity and wonder of the wilderness, whether you're here for adventure or relaxation
                        </div>
                    </div>

                    <div className='footer-contact-us'>
                        <div className='footer-social-media'>
                            <div className='footer-social-media-title'> 
                                Connect With Us
                            </div>
                            <ul className='footer-social-media-list'>
                                <li className='footer-social-media-link'>
                                    <IconButton style={{ backgroundColor: 'white'}}>
                                        <FaXTwitter color='black'/>
                                    </IconButton>
                                    <div style={{ paddingLeft: 15}}>
                                        Follow us on X
                                    </div>
                                </li>
                                <li className='footer-social-media-link'>
                                    <IconButton  style={{ backgroundColor: '#323232'}}>
                                        <FaTiktok color='#fff'/>
                                    </IconButton>
                                    <div style={{ paddingLeft: 15}}>
                                        Follow us on TikTok
                                    </div>
                                </li>
                                <li className='footer-social-media-link'>
                                    <IconButton style={{ backgroundColor: '#1877F2'}}>
                                        <FaFacebookF color='#fff'/>
                                    </IconButton>
                                    <div style={{ paddingLeft: 15}}>
                                        Like us on Facebook
                                    </div>
                                </li>
                                <li className='footer-social-media-link'>
                                    <IconButton style={{ backgroundColor: '#E1306C'}}>
                                        <FaInstagram color='#fff'/>
                                    </IconButton>
                                    <div style={{ paddingLeft: 15}}>
                                        Follow us on Instagram
                                    </div>
                                </li>
                                <li className='footer-social-media-link'>
                                    <IconButton style={{ backgroundColor: '#e60023'}}>
                                        <FaPinterest color='#fff'/>
                                    </IconButton>
                                    <div style={{ paddingLeft: 15}}>
                                        Follow us on Pinterest
                                    </div>
                                </li>
                            </ul>   
                        </div>
                        <div className='footer-contact-info'>
                            <div className='footer-contact-info-title'>
                                Contact Us
                            </div>
                            <ul className='footer-social-media-list'>
                                <li className='footer-contact-info-item'>
                                    <IconButton disabled>
                                        <FaHouse color='#fff'/>
                                    </IconButton>
                                    <div style={{ paddingLeft: 15}}>
                                        Aspen Ridge Cabin Rentals
                                        1234 Mountain View Lane
                                        Evergreen, CO 80439
                                        USA                                    
                                    </div>
                                </li>
                                <li className='footer-contact-info-item'>
                                    <IconButton disabled>
                                        <FaPhone color='#fff'/>
                                    </IconButton>
                                    <div style={{ paddingLeft: 15}}>
                                        {"(303) 555-7890"}
                                    </div>
                                </li>
                                <li className='footer-contact-info-item'>
                                    <IconButton disabled>
                                        <FaEnvelope color='#fff'/>
                                    </IconButton>
                                    <div style={{ paddingLeft: 15}}>
                                        contact@experiencecolorado.com
                                    </div>
                                </li>
                            </ul>  
                        </div>

                    </div>
                    


                </div>
        </div>
        
    )
}