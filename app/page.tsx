// page.jsx
"use client";
import { useEffect, useState } from 'react';
import React from 'react';


// This is the main React component. In Next.js, this would be your page component.
const App = () => {
    // We can use state to manage the visibility of the mobile nav menu
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('features');
    const [howItWorksData, setHowItWorksData] = useState({
        video: 'assets/videos/1.mp4',
        title: 'Normal Mode',
        description: 'In Normal Mode, the 5kWh Xbattery provides reliable power for your home, ensuring daily activities run smoothly without any interruptions.'
    });

    const animationStyles = `
    .fade-in-from-top {
        opacity: 0;
        transform: translateY(-20px);
        transition: opacity 1s ease-in-out, transform 1s ease-in-out;
    }
    .fade-in-from-top.show {
        opacity: 1;
        transform: translateY(0);
    }
    }
    .fade-in-from-left {
        opacity: 0;
        transform: translateX(-50px);
        transition: opacity 1s ease-in-out, transform 1s ease-in-out;
    }
    .fade-in-from-left.show {
        opacity: 1;
        transform: translateX(0);
    }
        .tab-button {
      padding: 0.5rem 0; /* Adjust padding for the border */
      color: #9ca3af;
      transition: color 0.3s ease;
    }
    .tab-button:hover {
      color: #fff;
    }
  `;

    // This useEffect hook handles the scroll animations and video loading.
    // In a real app, you would break this logic out into a custom hook or a dedicated file.
    // State for module management
    const [moduleCount, setModuleCount] = useState(1);
    const [power, setPower] = useState(5);
    const maxModules = 3; // Set a reasonable maximum for the display

    // Function to add a module
    const handleAddModule = () => {
        // Only add a module if we haven't reached the maximum
        if (moduleCount < maxModules) {
            setModuleCount(prevCount => prevCount + 1);
            setPower(prevPower => prevPower + 5);
        }
    };

    // Function to remove a module
    const handleRemoveModule = () => {
        // Only remove a module if there is more than one left
        if (moduleCount > 1) {
            setModuleCount(prevCount => prevCount - 1);
            setPower(prevPower => prevPower - 5);
        }
    };
    useEffect(() => {
      const howItWorksVideo = document.getElementById('howItWorksVideo');
      const howItWorksTabs = document.querySelectorAll('.how-it-works-tab-button');
      const howItWorksTitle = document.getElementById('howItWorksTitle');
      const howItWorksDescription = document.getElementById('howItWorksDescription');
  
             // Function to update the video and text based on the active tab
       const updateContent = (videoSrc: string, title: string, description: string) => {
         if (howItWorksVideo) {
           (howItWorksVideo as HTMLVideoElement).src = videoSrc;
           (howItWorksVideo as HTMLVideoElement).load();
           
           // This is the key fix: explicitly call play() after the user interaction
           const playPromise = (howItWorksVideo as HTMLVideoElement).play();
           if (playPromise !== undefined) {
             playPromise.catch((error: any) => {
               console.error("Video play failed:", error);
             });
           }
         }
        if (howItWorksTitle) {
          howItWorksTitle.textContent = title;
        }
        if (howItWorksDescription) {
          howItWorksDescription.textContent = description;
        }
      };
      
                    // Add event listeners to each tab button
       const handleTabClick = (event: Event) => {
           const clickedButton = event.currentTarget as HTMLButtonElement;
           const newVideoSrc = clickedButton.dataset.video || '';
           const newTitle = clickedButton.dataset.title || '';
           const newDescription = clickedButton.dataset.description || '';
   
           // Remove active class from all buttons
           howItWorksTabs.forEach(button => button.classList.remove('active', 'border-b-2', 'border-white'));
           // Add active class to the clicked button
           clickedButton.classList.add('active', 'border-b-2', 'border-white');
  
          // Update the state
          setHowItWorksData({
              video: newVideoSrc,
              title: newTitle,
              description: newDescription
          });
      };
  
      if (howItWorksTabs.length > 0) {
          howItWorksTabs.forEach(button => {
              button.addEventListener('click', handleTabClick);
          });
      }
  
      // Set initial content on mount
      updateContent(howItWorksData.video, howItWorksData.title, howItWorksData.description);
      
      // Cleanup function
      return () => {
          if (howItWorksTabs.length > 0) {
              howItWorksTabs.forEach(button => {
                  button.removeEventListener('click', handleTabClick);
              });
          }
      };
    }, [howItWorksData]); // Rerun the effect when howItWorksData changes
  

    useEffect(() => {
        const navToggle = document.getElementById('nav-toggle');
        const navContent = document.getElementById('nav-content');
        if (navToggle && navContent) {
            navToggle.onclick = () => {
                setIsNavOpen(prev => !prev);
            };
        }

        const heroVideo1 = document.getElementById('heroVideo1');
        const heroText1 = document.getElementById('heroText1');
        const heroText2 = document.getElementById('heroText2');
        const heroVideo2 = document.getElementById('heroVideo2');
        
        let heroText1Shown = false;
        let heroText2Shown = false;

        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.2
        };

        // Animation for the BharatBMS card
        const bharatbmsCard = document.getElementById('bharatbmsCard');
        if (bharatbmsCard) {
            const cardObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            cardObserver.observe(bharatbmsCard);
        }
        const handleVideo1TimeUpdate = () => {
          if (heroVideo1 && heroText1) {
              // Check if the video is near its end (e.g., 90% or more)
              if ((heroVideo1 as HTMLVideoElement).currentTime >= (heroVideo1 as HTMLVideoElement).duration * 0.8 && !heroText1Shown) {
                  heroText1.classList.add('show');
                  heroText1Shown = true;
                  // Remove the event listener to prevent it from firing again
                  heroVideo1.removeEventListener('timeupdate', handleVideo1TimeUpdate);
              }
          }
      };
      const handleVideo1LoadedData = () => {
        if (heroVideo1) {
             heroVideo1.addEventListener('timeupdate', handleVideo1TimeUpdate);
        }
      };

      if (heroVideo1) {
        // We listen for the video's metadata to be loaded first
          heroVideo1.addEventListener('loadeddata', handleVideo1LoadedData);
      }
      
      const cardObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    if (bharatbmsCard) {
        cardObserver.observe(bharatbmsCard);
    }
    
         // Animation for Hero Section 2 text (using IntersectionObserver)
                   const video2Observer = new IntersectionObserver((entries, observer) => {
           entries.forEach(entry => {
               if (entry.isIntersecting && heroVideo2 && heroText2 && !heroText2Shown) {
                   (heroVideo2 as HTMLVideoElement).play();
                   heroText2.classList.add('show');
                   heroText2Shown = true;
                   observer.unobserve(entry.target);
               }
           });
       }, observerOptions);
      if (heroVideo2) {
          video2Observer.observe(heroVideo2);
      }

        return () => {
          if (heroVideo1) {
            heroVideo1.removeEventListener('timeupdate', handleVideo1TimeUpdate);
          }
          if (bharatbmsCard) {
              // Disconnect the IntersectionObserver
          }
          if (heroVideo2) {
              video2Observer.disconnect();
          }
      };

    }, []);

    return (
        <div className="bg-black text-white">
            {/* Headers and other meta tags would go in the Next.js layout file */}
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />

            {/* Navigation */}
            <nav className="bg-black p-4 fixed top-0 w-full z-50">
                <div className="container mx-auto flex justify-between items-center flex-wrap">
                    {/* Logo */}
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <a href="#" className="rounded-md p-2">
                            <img src="assets/images/logo1.webp" alt="XBATTERY Logo" className="h-10 w-auto" />
                        </a>
                    </div>

                    <div className="block lg:hidden">
                        <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white">
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                            </svg>
                        </button>
                    </div>

                    <div className={`w-full flex-grow lg:flex lg:items-center lg:w-auto text-alo lg:justify-center ${isNavOpen ? '' : 'hidden'}`} id="nav-content">
                        <div className="text-sm lg:flex-grow lg:flex lg:justify-end">
                            <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-800">
                                Energy Storage
                            </a>
                            <a href="/#" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-800">
                                BharatBMS
                            </a>
                            <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-800">
                                About
                            </a>
                            <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-800">
                                Blog
                            </a>
                            <a href="#" className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4 p-2 rounded-md transition duration-300 ease-in-out hover:bg-gray-800">
                                Whitepapers
                            </a>
                        </div>
                        <div>
                            <a href="#" className="inline-block text-sm px-4 py-2 leading-none border rounded-md text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0 transition duration-300 ease-in-out">
                                Customer Portal
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section 1 */}
            <style>{animationStyles}</style>
            <section className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black z-0">
                <video id="heroVideo1" autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="/assets/videos/Xbattery-Hd.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <div className="absolute inset-0 bg-black opacity-50"></div>

                <div id="heroText1" className="relative z-10 text-center text-white p-4 fade-in-from-top">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
                        Introducing BharatBMS
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-medium max-w-3xl mx-auto">
                        Scalable up to 800V for EVs, home backup, and energy storage
                    </p>
                </div>
            </section>

            {/* BharatBMS Card Section */}
            <section className="bg-black py-16 relative z-10">
                <div id="bharatbmsCard" className="w-full bg-gray-900/70 p-8 shadow-xl card-float-in">
                    <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12">
                        <div className="lg:w-1/2 flex justify-center">
                            <img src="assets/images/chip1.webp" alt="BharatBMS Chip" className="max-w-full h-auto rounded-lg" />
                        </div>

                        <div id="bharatbmsText" className="lg:w-1/2 text-center lg:text-left fade-in-from-bottom">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-cyan-400 mb-6 leading-tight">
                                BharatBMS
                            </h2>
                            <p className="text-base sm:text-lg text-gray-300 mb-4 max-w-xl mx-auto lg:mx-0">
                                India's first universal Battery Management System scales from 5kWh setups to megawatt
                                applications, offering modular upgrades and reliable performance in tough power conditions.
                            </p>
                            <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
                                Made in India with local components, it ensures fast support and customization while driving
                                innovation in energy storage and EV products.
                            </p>
                            <div className="flex justify-center lg:justify-start">
                                <a href="#" className="gradient-border-button">
                                    <span>
                                        Know More
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hero Section 2 */}
            
            <section className="relative w-full h-screen overflow-hidden flex items-center justify-start bg-black z-10">
                <video id="heroVideo2" autoPlay muted playsInline className="absolute inset-0 w-full h-full object-cover">
                    <source src="assets/videos/XBattery_1080p.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Overlay for dimming/contrast */}
                <div className="absolute inset-0 bg-black opacity-50"></div>

                {/* Text Content */}
                <div id="heroText2" className="relative z-10 text-left text-white p-8 md:p-16 fade-in-from-left max-w-2xl mx-auto md:mx-0 md:ml-20">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 tracking-tight">
                        Power Your Home 24/7
                    </h1>
                    <p className="text-lg sm:text-xl md:text-2xl font-medium mb-8">
                        High-performance lithium battery packs designed for India
                    </p>
                    <a href="#" className="gradient-border-button">
                        <span>
                            Get Notified
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </span>
                </a>
                </div>
            </section>

            {/* Energy Customized to Your Needs Section */}
            <section className="bg-black py-16 px-4 md:px-8 lg:px-16 relative z-10">
              <div className="container mx-auto text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-from-cyan-400 to-purple-500">
        Energy Customized to Your Needs
      </h1>
      <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
        Xbattery's 5kWh system is designed to grow with your needs. Simply add
        more batteries to expand capacity and keep up with your power demands.
      </p>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-12">
        {/* Left Column: Appliances */}
        <div className="lg:w-1/2 text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Essential Appliances
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12">
                {/* Wi-Fi Router */}
                <div className="flex flex-col items-center text-center">
                    {/* The icon now has a gradient and no circular background. */}
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Wi-Fi Router</span>
                </div>
                {/* Lights - UPDATED ICON */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <path d="M12 18a6 6 0 0 0 0-12c-3.31 0-6 2.69-6 6a6 6 0 0 0 6 6Z" />
                            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Lights</span>
                </div>
                {/* Television */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <rect x={2} y={7} width={20} height={15} rx={2} ry={2} />
                            <path d="m17 7-5-5-5 5" />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Television</span>
                </div>
                {/* Laptop/Home PC */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <rect x={2} y={3} width={20} height={14} rx={2} ry={2} />
                            <path d="M2 17l10 5 10-5" />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Laptop/Home PC</span>
                </div>
                {/* Freezer */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <rect x={5} y={2} width={14} height={20} rx={2} ry={2} />
                            <line x1={12} y1={2} x2={12} y2={22} />
                            <line x1={5} y1={9} x2={19} y2={9} />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Freezer</span>
                </div>
                {/* Washer/Dryer */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                            <circle cx={12} cy={12} r={5} />
                            <path d="M12 1.5V3M12 21v1.5M2.5 12H4M20 12h1.5M5.7 5.7L4.5 4.5M19.5 19.5l-1.2-1.2M4.5 19.5l1.2-1.2M18.3 5.7l1.2-1.2" />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Washer/Dryer</span>
                </div>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                Heavy Appliances
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {/* Air Conditioner - UPDATED ICON */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <path d="M18 10h-2c0-1.66-1.34-3-3-3s-3 1.34-3 3h-2c0-1.66-1.34-3-3-3S3 8.34 3 10v4c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 1.66 1.34 3 3 3s3-1.34 3-3v-4c0-1.66-1.34-3-3-3Z" />
                            <path d="M12 5V2M12 22v-3M2 12h3M22 12h-3" />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Air Conditioner</span>
                </div>
                {/* Dishwasher */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                            <line x1={3} y1={9} x2={21} y2={9} />
                            <line x1={3} y1={15} x2={21} y2={15} />
                            <line x1={12} y1={3} x2={12} y2={21} />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Dishwasher</span>
                </div>
                {/* Electric Oven */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <rect x={3} y={3} width={18} height={18} rx={2} ry={2} />
                            <line x1={3} y1={9} x2={21} y2={9} />
                            <line x1={3} y1={15} x2={21} y2={15} />
                            <line x1={9} y1={3} x2={9} y2={21} />
                            <line x1={15} y1={3} x2={15} y2={21} />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Electric Oven</span>
                </div>
                {/* Pool Pump */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <path d="M2 12h20M12 2v20M17 17l-5 5-5-5M7 7l5-5 5 5" />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Pool Pump</span>
                </div>
                {/* Electric Vehicle - UPDATED ICON */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <path d="M17 18a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h10Z" />
                            <circle cx={7} cy={18} r={2} />
                            <circle cx={17} cy={18} r={2} />
                            <path d="M12 9v4M10 11h4" />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Electric Vehicle</span>
                </div>
                {/* Heat Pump */}
                <div className="flex flex-col items-center text-center">
                    <div className="mb-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="bg-gray-950 bg-clip-text "
                        >
                            <path d="M12 2a3 3 0 0 0-3 3v7c0 1.66 1.34 3 3 3s3-1.34 3-3V5a3 3 0 0 0-3-3Z" />
                            <path d="M12 15v6M9 18h6" />
                            <path d="M5 12h2M17 12h2M12 5h2M12 19h2" />
                        </svg>
                    </div>
                    <span className="text-gray-300 text-sm">Heat Pump</span>
                </div>
            </div>
        </div>
        {/* Right Column: Power Modules */}
        <div className="lg:w-1/2 flex flex-col items-center text-center relative mt-12 lg:mt-0">
          <div className="w-full text-center text-white z-10">
            <div
              className="text-4xl sm:text-5xl font-extrabold mb-2"
            >
              {power} kWh
            </div>
          </div>
          <div className="w-full mt-4">
            <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(power / (maxModules * 5)) * 100}%` }}
              />
            </div>
          </div>

          <div
            className="flex justify-center gap-4 mb-8 mt-24"
            id="moduleImagesContainer"
          >
            {/* Dynamically render modules based on state */}
            {[...Array(moduleCount)].map((_, index) => (
              <div key={index} className="relative">
                <img
                  src={`assets/images/xbattery.webp`}
                  alt={`Module ${index + 1}`}
                  className="h-80 w-auto rounded-lg shadow-lg"
                />
                {/* Render the remove button on the last module */}
                {index === moduleCount - 1 && moduleCount > 1 && (
                  <button
                    onClick={handleRemoveModule}
                    className="absolute top-1 left-0 -translate-x-1/2 -translate-y-1/2 w-12 h-12  bg-gray-900 text-white text-3xl rounded-full border-2 border-gray-700 hover:bg-gray-700 transition-colors duration-300 shadow-md flex items-center justify-center"
                  >
                    -
                  </button>
                )}
                {/* Render the add button on the last module, but only if there is space */}
                {index === moduleCount - 1 && moduleCount < maxModules && (
                  <button
                    onClick={handleAddModule}
                    className="absolute top-1 right-0 translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900 text-white text-3xl rounded-full border-2 border-gray-700 hover:bg-gray-700 transition-colors duration-300 shadow-md flex items-center justify-center"
                  >
                    +
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
  <div className="container mx-auto max-w-7xl">
          <div className="h-px bg-gray-700"></div>
        </div>
  {/* Xbattery 5 kWh Features & Specifications Section */}
      <div className="bg-black py-16 px-4 md:px-8 lg:px-16 relative z-10 text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8">
              <h2 className="text-2xl sm:text-2xl font-extrabold text-cyan-400 mb-4 sm:mb-0">
                Xbattery 5 kWh
              </h2>
              <div className="flex space-x-8 text-xl">
                <button 
                  onClick={() => setActiveTab('features')}
                  className={`tab-button ${activeTab === 'features' ? 'text-white border-b-2 border-white' : ''}`}
                >
                  Features
                </button>
                <button 
                  onClick={() => setActiveTab('specifications')}
                  className={`tab-button ${activeTab === 'specifications' ? 'text-white border-b-2 border-white' : ''}`}
                >
                  Specifications
                </button>
              </div>
            </div>

            {activeTab === 'features' && (
              <div id="featuresContent" className="tab-content transition-opacity duration-300 ease-in-out">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Reliable Backup
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Powers your home for up to a day during outages.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Solar Safeguard
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Stops charging automatically when the battery is full.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Intelligent Modes
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Adjusts for power cuts and restores seamlessly.
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Expandable System
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Add modules as your energy needs grow.
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'specifications' && (
              <div id="specificationsContent" className="tab-content transition-opacity duration-300 ease-in-out">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Size and Weight
                    </h4>
                    <p className="text-gray-300 text-sm">37 kgs</p>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Energy Capacity
                    </h4>
                    <p className="text-gray-300 text-sm">5 kWh</p>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Scalable
                    </h4>
                    <p className="text-gray-300 text-sm">15 kWh</p>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-lg font-bold text-white mb-2">
                      Certification
                    </h4>
                    <p className="text-gray-300 text-sm">
                      IS 17387<br />
                      IEC 61000 Series<br />
                      ROHS/UL 94V0
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="container mx-auto max-w-7xl">
          <div className="h-px bg-gray-700"></div>
        </div>
    {/* How It Works Section */}
  <section className="bg-black py-16 px-4 md:px-8 lg:px-16 relative z-10">
    <div className="container mx-auto max-w-5xl text-center">
      {" "}
      {/* Reduced max-w to 5xl */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6">
        {" "}
        {/* Reduced size */}
        How It Works
      </h2>
      <p className="text-base sm:text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
        {" "}
        {/* Reduced size and max-w */}
        You're covered at every stage of an outage. Its intelligent modes kick
        in before the power goes out, ensuring your stays powered through any
        disruption.
      </p>
      {/* Video Display Area */}
      <div
        className="relative w-full overflow-hidden rounded-lg shadow-lg mb-6"
        style={{ paddingTop: "50%" }}
      >
        {" "}
        {/* Reduced padding-top */}
        <video
          id="howItWorksVideo"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          src={howItWorksData.video}
          loop // Added loop attribute
          muted // Added muted attribute
          playsInline
        >
          {/* Initial video source will be set by JS */}
        </video>
      </div>
      {/* Tabs for How It Works */}
      <div className="flex flex-col sm:flex-row justify-center border-b border-gray-700 mb-6 space-y-2 sm:space-y-0 sm:space-x-16">
        {" "}
        {/* Reduced mb */}
        <button
          className="how-it-works-tab-button active text-sm sm:text-base"
          data-video="assets/videos/1.mp4"
          data-title="Normal Mode"
          data-description="In Normal Mode, the 5kWh Xbattery provides reliable power for your home, ensuring daily activities run smoothly without any interruptions."
        >
          Normal Operation
        </button>
        <button
          className="how-it-works-tab-button text-sm sm:text-base"
          data-video="assets/videos/2.mp4"
          data-title="Backup Power"
          data-description="When a power outage occurs, the 5kWh Xbattery instantly switches to backup mode, keeping your home powered for up to a day without interruption."
        >
          During Power Outages
        </button>
        <button
          className="how-it-works-tab-button text-sm sm:text-base"
          data-video="assets/videos/3.mp4"
          data-title="Power Restoration"
          data-description="Once the grid power is restored, the 5kWh Xbattery automatically switches back to normal mode, ensuring a smooth and seamless transition."
        >
          Power Restoration
        </button>
        <button
          className="how-it-works-tab-button text-sm sm:text-base"
          data-video="assets/videos/4.mp4"
          data-title="Solar Integration"
          data-description="The 5kWh Xbattery works seamlessly with your solar system, managing energy usage and maximizing storage to reduce your reliance on the grid."
        >
          Solar Integration
        </button>
      </div>
      {/* Dynamic Text Content */}
      <div className="text-center mt-6">
        {" "}
        {/* Reduced mt */}
        <h3
          id="howItWorksTitle"
          className="text-2xl sm:text-3xl font-extrabold text-white mb-2"
        >
          {" "}
          {/* Reduced size */}
          Normal Mode
        </h3>
        <p
          id="howItWorksDescription"
          className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto"
        >
          {" "}
          {/* Reduced size and max-w */}
          In Normal Mode, the 5kWh Xbattery provides reliable power for your
          home, ensuring daily activities run smoothly without any
          interruptions.
        </p>
      </div>
    </div>
  </section>
  {/* HomeXBattery Hero Section */}
  <section className="relative w-full">
    {/* Image: show full original size without cropping */}
    <img
      src="assets/images/houseXbattery.webp"
      alt="Home X Battery"
      className="w-full h-auto"
    />
    {/* Text: absolute on top-center with margin */}
    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-center text-black z-10 px-4">
      <h2 className=" text-4xl md:text-5xl font-bold mb-2">
        Reliable Energy Storage for Your Home
      </h2>
      <p className="text-lg md:text-xl max-w-3xl mx-auto">
        Xbattery blends seamlessly into your home, occupying minimal space while
        providing reliable energy storage. It helps manage energy efficiently,
        lowers electricity bills, and ensures dependable backup power during
        outages.
      </p>
    </div>
  </section>
  <section className="bg-black py-20 px-4 md:px-12 lg:px-20 text-white">
    <div className="max-w-7xl mx-auto text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-extrabold gradient-text">
        Latest Blogs
      </h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {/* Blog Card 1 */}
      <div className="bg-gray-950 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="bg-white p-1">
          <img
            src="assets/images/download__6_.webp"
            alt="Blog 1"
            className="w-full h-56 object-cover rounded-t-lg"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Jul 7, 2025</span>
            <span className="bg-black bg-opacity-80 text-white text-xs font-medium px-3 py-1 rounded-full">
              Active Balancing
            </span>
          </div>
          <h3 className="text-base font-bold mb-2">
            Switched Capacitor Based Active Balancing: A Guide
          </h3>
          <p className="text-sm text-gray-300 mb-4">
            Active charge balancing in Li-ion battery packs improves efficiency,
            battery life, and safety. Learn how it works and why...
          </p>
          <a
            href="#"
            className="text-sm font-medium text-white hover:underline inline-flex items-center"
          >
            Read More →
          </a>
        </div>
      </div>
      {/* Blog Card 2 */}
      <div className="bg-gray-950 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="bg-white p-1">
          <img
            src="assets/images/Active_Charge_Balancing_of_Li-ion_Batteries__1_.webp"
            alt="Blog 2"
            className="w-full h-56 object-cover rounded-t-lg"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">May 15, 2025</span>
            <span className="bg-black bg-opacity-80 text-white text-xs font-medium px-3 py-1 rounded-full">
              Li-ion Battery Packs
            </span>
          </div>
          <h3 className="text-base font-bold mb-2">
            Active Charge Balancing of Li-ion Batteries: A Guide
          </h3>
          <p className="text-sm text-gray-300 mb-4">
            Active charge balancing in Li-ion battery packs improves efficiency,
            battery life, and safety. Learn how it works and why...
          </p>
          <a
            href="#"
            className="text-sm font-medium text-white hover:underline inline-flex items-center"
          >
            Read More →
          </a>
        </div>
      </div>
      {/* Blog Card 3 */}
      <div className="bg-gray-950 rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <div className="bg-white p-1">
          <img
            src="assets/images/Untitled_design.webp"
            alt="Blog 3"
            className="w-full h-56 object-cover rounded-t-lg"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Apr 2, 2025</span>
            <span className="bg-black bg-opacity-80 text-white text-xs font-medium px-3 py-1 rounded-full">
              BESS
            </span>
          </div>
          <h3 className="text-base font-bold mb-2">
            Role of Contactors in BESS and BMS
          </h3>
          <p className="text-sm text-gray-300 mb-4">
            In a BESS, contactors (K1–K4) manage safe connections for charging
            and discharging. The BMS controls them, enabling pr...
          </p>
          <a
            href="#"
            className="text-sm font-medium text-white hover:underline inline-flex items-center"
          >
            Read More →
          </a>
        </div>
      </div>
    </div>
    {/* View All Blogs Button */}
    <div className="mt-12 text-center">
      <a href="#" className="gradient-border-button">
        <span>View All Blogs →</span>
      </a>
    </div>
  </section>
  <section className="bg-black py-16 px-4 md:px-8 lg:px-16 text-white">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-8">
        Get the updates from Xbattery
      </h2>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-0 max-w-2xl mx-auto">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-1 px-6 py-4 bg-transparent border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition duration-300 sm:rounded-l-lg sm:rounded-r-none rounded-lg sm:border-r-0"
        />
        <button className="px-8 py-4 bg-transparent border border-gray-600 text-white font-semibold hover:border-cyan-400 hover:text-cyan-400 transition duration-300 sm:rounded-r-lg sm:rounded-l-none rounded-lg mt-4 sm:mt-0 w-full sm:w-auto">
          Get Notified
        </button>
      </div>
    </div>
  </section>
  {/* Footer */}
  <footer className="bg-gray-950 text-white py-16 px-4 md:px-8 lg:px-16">
    <div className="max-w-7xl mx-auto">
      {/* Main Footer Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Company Info and Social Icons */}
        <div className="lg:col-span-6">
          {/* First Line: Logo and Social Icons */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">XBATTERY</h2>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-white text-black p-2 rounded hover:bg-gray-200 transition duration-300"
              >
                <i className="far fa-envelope text-lg" />
              </a>
              <a
                href="#"
                className="bg-white text-black p-2 rounded hover:bg-gray-200 transition duration-300"
              >
                <i className="fab fa-twitter text-lg" />
              </a>
              <a
                href="#"
                className="bg-white text-black p-2 rounded hover:bg-gray-200 transition duration-300"
              >
                <i className="fab fa-linkedin text-lg" />
              </a>
            </div>
          </div>
          {/* Second Line: Description */}
          <p className="text-gray-300 text-base leading-relaxed">
            Xbattery™ is building lithium battery packs in India, including
            electronics and software, to help businesses, EVs and grids store
            energy affordably and access it on demand.
          </p>
        </div>
        {/* Products */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-6">Products</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Xbattery 5kWh
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                BharatBMS
              </a>
            </li>
          </ul>
        </div>
        {/* Resources */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Blog
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Whitepapers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Learn
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                API
              </a>
            </li>
          </ul>
        </div>
        {/* Company */}
        <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Careers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Media
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Support
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-12 pt-8">
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Xbattery Energy Private Limited. All rights reserved. Terms
            and Privacy.
          </p>
        </div>
      </div>
    </div>
  </footer>
        </div>
    );
};

export default App;