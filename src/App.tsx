import { useEffect, useRef, useState } from "react";
import "./App.css";
import music from "./assets/happy-birthday2.mp3";
import hbd from "./assets/hbd.png";
import ballon2 from "./assets/ballon3.png";
import ballon4 from "./assets/balloon.png";
import ballon3 from "./assets/ballon4.png";



function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [_, setIsPlaying] = useState(false);
  const [count, setCount] = useState(0);

  function lightOn(lightNumber:string, color:string){
    let element = document.getElementById(lightNumber);
    element?.setAttribute("style", `box-shadow:0px 0px 40px 10px ${color}, 0px 0px 80px 30px ${color};`)
  }

  useEffect(() => {
    lightOn("light1", "#46f23d")
    lightOn("light2", "#0df7ff")
    lightOn("light3", "#ff0000")
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [count]);



  // function lightOff(lightNumber:string){
  //   document.getElementById(lightNumber)?.style.boxShadow = "none";
  // }

  function turnOnTheLight(){
    let lightButton = document.getElementById("light-button");
    let hangingLight = document.getElementById("hanging-light");
    hangingLight?.setAttribute("style", "top: -0;")
    document.getElementById("background")?.classList.add("light-on");
    lightButton?.classList.add("fade-off");
    document.getElementById("ballon-container")?.classList.remove("fade-off")
    setTimeout(function(){
      lightButton?.classList.add("hide")
    }, 9000)
    setTimeout(function(){
      document.getElementById("happy-birthday")?.classList.remove("fade-off")
    }, 9000)
    setTimeout(function(){
      document.getElementById("message")?.classList.remove("fade-off")
    }, 9000)
    setCount((count) => count + 1);
  }


const texts : string[] = [
  "Happy Birthday, Adeolu! 🎂",
  "I hope today brings you as much joy", "as you've brought into my life over the years.",
  "You have a heart of gold,","and our friendship has been a source of endless strength and happiness.",
  "I pray this year brings you all the blessings", "success","and love you deserve.",
  "May your days be filled with laughter","your dreams be fulfilled","and your heart overflow with joy.",
  "Here’s to celebrating you and all the wonderful moments we've shared","and to many more to come!",
  "Yours truly, Oyinkansola"
];
const [currentIndex, setCurrentIndex] = useState(0);
const [isVisible, setIsVisible] = useState(false);
const [isAnimating, setIsAnimating] = useState(false)
  function showMessages() {
  setIsAnimating(true);
  setIsVisible(true);
    
  }

  useEffect(()=>{
    if(!isAnimating) return;
    
    const interval = setInterval(()=>{
      
      setIsVisible(false);
      setTimeout(()=>{
        setCurrentIndex((prevIndex)=>{
          if(prevIndex + 1 < texts.length){
            return prevIndex +1;
          }else{
            setIsAnimating(false);
            clearInterval(interval);
            return prevIndex
          }
        });
        setIsVisible(true)
      },1000)
    }, 4000);
    return () => clearInterval(interval);
  }, [ isAnimating,texts.length]);
  


  return (
    <>
    <div id="background" className="background">

<div id="ballon-container" style={{transition: "5s"}} className="fade-off">
      <div id="ballon" className="ballon1">
        <img src={ballon2} alt="" />
      </div>

      <div id="ballon" className="ballon2">
        <img src={ballon3} alt="" />
      </div>

      <div id="ballon" className="ballon3">
        <img src={ballon4} alt="" />
      </div>
      <div id="ballon" className="ballon4">
        <img src={ballon4} alt="" />
      </div>

      </div>
     
     <audio loop ref={audioRef}>
        <source src={music} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div id="hanging-light" className="hanging-light">
        <div className="light-bulb-container light-bulb-container-animation1">
          <div id="light1"></div>
        </div>

        <div className="light-bulb-container light-bulb-container-animation2">
          <div id="light2"></div>
        </div>

        <div className="light-bulb-container light-bulb-container-animation3">
          <div id="light3"></div>
        </div>
      </div>

      {/* <div style={{paddingTop:"200px"}}> */}
      <div id="happy-birthday" style={{transition: "5s"}} className="happy-birthday fade-off">
        <img src={hbd} width={100} alt="" />
      </div>
      {/* </div> */}

     
      <div id="message" style={{transition:"5s"}} className="message fade-off">
      <button onClick={() => showMessages()}>
          A Message for you
        </button>
      </div>

      <div style={{zIndex:50000}} className="the-message">
      <p className={`message-p ${isVisible ? 'fade-in' : "fade-out"}`}>
        {texts[currentIndex]}
      </p>
      </div>

      {/* <div className="the-message">
        <p id="message1" className="message-p faded" >Happy birthday my love</p>
        <p id="message2" className="message-p faded" >Wishing you long life and prosperity</p>
      </div> */}

      
     
      <div id="light-button" className="light-button">
        <button onClick={() => turnOnTheLight()}>
          Turn on the light
        </button>
       
      </div>
      </div>
    </>
  );
}

export default App;
