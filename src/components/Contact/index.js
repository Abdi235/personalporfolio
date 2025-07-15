import Loader from "react-loaders"
import "./index.scss"
import AnimatedLetters from "../AnimatedLetters" 
import { useEffect, useRef, useState } from "react"
import emailjs from "@emailjs/browser"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const refForm = useRef()

    useEffect(() => {
        const timerId = setTimeout(() => {
          setLetterClass('text-animate-hover');
        }, 3000);
      
        return () => {
          clearTimeout(timerId);
        };
      }, []);

      const sendEmail = (e) => {
        e.preventDefault() 

        // Debug: Check if environment variables are loaded
        console.log('Environment variables:', {
            serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
            templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
            publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        });

        // Check if all required variables are present
        if (!process.env.REACT_APP_EMAILJS_SERVICE_ID || 
            !process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 
            !process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
            alert('EmailJS configuration is missing. Please check your .env file.');
            return;
        }

        console.log('Attempting to send email...');

        emailjs
            .sendForm(
                process.env.REACT_APP_EMAILJS_SERVICE_ID,
                process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
                refForm.current,
                process.env.REACT_APP_EMAILJS_PUBLIC_KEY
            )
            .then(
                (result) => {
                    console.log('Email sent successfully:', result);
                    alert("Message successfully sent! I will get back to you within 1 to 2 business days.")
                    window.location.reload(false)
                }, 
                (error) => { 
                    console.error('EmailJS Error Details:', error);
                    console.error('Error status:', error.status);
                    console.error('Error text:', error.text);
                    alert(`Failed to send the message: ${error.text || error.message || 'Unknown error'}. Please try again.`)
                }
            )
      }

    return(
        <>
            <div className = "container contact-page">
                <div className = "text-zone">
                    <table>
                        <tr>
                            <td className="left-side">
                                <h1>
                                    <AnimatedLetters letterClass={letterClass} strArray = {"Contact me".split("")} idx = {15} />
                                </h1>
                                <p>
                                    <br/>
                                    Thank you for your interest in getting in touch! 
                                    <br/>
                                    <br/>I value open communication and welcome any inquiries, feedback, or collaboration opportunities. Please don't hesitate to get in touch with me by filling out the contact form.
                                    <br/>
                                    <br/>
                                    <a target = "_blank" rel = "noreferrer" href = "https://www.linkedin.com/in/mohamed-abdi-84b18518a/">
                                        <FontAwesomeIcon icon={faLinkedin}  className = "icon" color = "#4d4d4e" />
                                    </a>
                                    <a target = "_blank" rel = "noreferrer" href = "mailto:mohamedabdi.tech@gmail.com">
                                        <FontAwesomeIcon icon={faEnvelope} className = "icon" color = "#4d4d4e" />
                                    </a>
                                </p>
                            </td>
                            <td className="right-side">
                                <div className="contact-form">
                                    <form ref={refForm} onSubmit={sendEmail}>  {/* MOVED: onSubmit to form element */}
                                        <ul>
                                            <li className = "half">
                                                <input type="text" name="name" placeholder="Name" required />
                                            </li>
                                            <li className="half">
                                                <input type="email" name="email" placeholder = "Email" required />
                                            </li>
                                            <li>
                                                <input placeholder = "Subject" type="text" name="subject" required/>
                                            </li>
                                            <li>
                                                <textarea placeholder="Message" name="message" required></textarea>
                                            </li>
                                            <li>
                                                <input type="submit" className="flat-button" value="SEND" />
                                            </li>
                                        </ul>
                                    </form>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Contact