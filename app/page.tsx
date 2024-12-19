'use client'
// import Image from "next/image";
// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation";
// import { handleSignOut } from './actions/cognitoActions'
// import Head from 'next/head'

// const Home: React.FC = () => {
//   const router = useRouter();

//   const handelShopify = async()=>{
//     router.push('/api/auth/')
//   }
//   const handleLogout = async() => {
//     await handleSignOut();
//   }
//   return (
//     <>
//       <Head>
//         <title>One Stop Vyapaar</title>
//         <meta name="description" content="Integrate Shopify with Amazon Multi-Channel Fulfillment seamlessly." />
//       </Head>

//       <main className="bg-gray-50">
//         {/* Navbar */}
//         <header className="flex justify-between items-center py-6 px-10 bg-white shadow">
//           <h1 className="text-2xl font-bold text-indigo-600">One Stop Vyapaar</h1>
//           <nav className="space-x-6">
//             <a href="#features" className="text-gray-600 hover:text-indigo-600">Features</a>
//             <a href="#pricing" className="text-gray-600 hover:text-indigo-600">Pricing</a>
//             <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600">How It Works</a>
//             <a href="#contact" className="text-gray-600 hover:text-indigo-600">Contact Us</a>
//           </nav>
//           <button className='p-2 rounded-md bg-black text-white' onClick={handelShopify}>Connect Shopify</button>
//         </header>

//         {/* Hero Section */}
//         <section className="flex flex-col items-center justify-center text-center bg-indigo-600 text-white py-20 px-4">
//           <h2 className="text-4xl font-bold mb-4">Effortless Shopify and Amazon Fulfillment Integration</h2>
//           <p className="max-w-2xl text-lg mb-8">One Stop Vyapaar lets you connect your Shopify store with Amazon's multi-channel fulfillment, simplifying inventory, shipping, and order management.</p>
//           <button className="bg-white text-indigo-600 px-6 py-3 rounded-md font-semibold hover:bg-indigo-100">Get Started for Free</button>
//         </section>
//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <Link
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
//             href="/auth/signup"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Signup
//           </Link>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
//             href="/auth/login"
//             rel="noopener noreferrer"
//           >
//             Login
//           </a>
//           <button onClick={handleLogout}>
//           Log out
//           </button>
            
          
//         </div>

//         {/* Features Section */}
//         <section id="features" className="py-20 px-10 bg-gray-50">
//           <h3 className="text-3xl font-semibold text-center mb-12">Features</h3>
//           <div className="grid md:grid-cols-3 gap-8">
//             <FeatureCard title="Seamless Integration" description="Connect Shopify and Amazon with a few clicks." />
//             <FeatureCard title="Centralized Dashboard" description="Manage orders, inventory, and fulfillment in one place." />
//             <FeatureCard title="Automated Syncing" description="Keep stock levels and order statuses updated in real time." />
//           </div>
//         </section>
        

//         {/* Pricing Section */}
//         <section id="pricing" className="py-20 px-10 bg-white text-gray-800">
//           <h3 className="text-3xl font-semibold text-center mb-12">Pricing</h3>
//           <div className="flex justify-center space-x-8">
//             <PricingCard plan="Basic" price="$29/month" features={["Basic Integration", "Limited Orders", "Email Support"]} />
//             <PricingCard plan="Pro" price="$59/month" features={["Advanced Integration", "Unlimited Orders", "Priority Support"]} />
//             <PricingCard plan="Enterprise" price="Custom" features={["Custom Solutions", "Dedicated Support", "API Access"]} />
//           </div>
//         </section>

//         {/* How It Works Section */}
//         <section id="how-it-works" className="py-20 px-10 bg-gray-50 text-gray-800">
//           <h3 className="text-3xl font-semibold text-center mb-12">How It Works</h3>
//           <div className="max-w-4xl mx-auto text-center space-y-6">
//             <p>1. Sign up and connect your Shopify store.</p>
//             <p>2. Authorize access to Amazon Multi-Channel Fulfillment.</p>
//             <p>3. Start syncing products and processing orders effortlessly.</p>
//           </div>
//         </section>

//         {/* Contact Section */}
//         <section id="contact" className="py-20 px-10 bg-white text-gray-800 text-center">
//           <h3 className="text-3xl font-semibold mb-6">Contact Us</h3>
//           <p className="mb-8">Have questions? Reach out to our team for support.</p>
//           <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700">Get in Touch</button>
//         </section>

//         {/* Footer */}
//         <footer className="py-6 text-center text-gray-600 bg-gray-200">
//           &copy; {new Date().getFullYear()} One Stop Vyapaar. All rights reserved.
//         </footer>
//       </main>
//     </>
//   )
// }

// interface FeatureCardProps {
//   title: string
//   description: string
// }

// const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md text-center">
//     <h4 className="text-xl font-semibold mb-2">{title}</h4>
//     <p className="text-gray-600">{description}</p>
//   </div>
// )

// interface PricingCardProps {
//   plan: string
//   price: string
//   features: string[]
// }

// const PricingCard: React.FC<PricingCardProps> = ({ plan, price, features }) => (
//   <div className="bg-gray-100 p-8 rounded-lg shadow-md text-center">
//     <h4 className="text-xl font-semibold text-indigo-600 mb-2">{plan}</h4>
//     <p className="text-2xl font-bold mb-4">{price}</p>
//     <ul className="mb-6 space-y-2">
//       {features.map((feature, idx) => (
//         <li key={idx} className="text-gray-600">{feature}</li>
//       ))}
//     </ul>
//     <button className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700">Choose Plan</button>
//   </div>
// )

// export default Home


import React from 'react';
import { ArrowRight, Check, Facebook, Instagram, Link2, Mail, MapPin, Package, PanelsTopLeft, Phone, RefreshCcw, TwitterIcon, Youtube } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


const Navbar = () => {
  const router = useRouter();
  return (
    <nav className="flex justify-between items-center py-6 px-8 max-w-7xl mx-auto">
      <div className="text-[#1a365d] text-2xl font-bold">Logo</div>
      
      <div className="hidden md:flex items-center space-x-8">
        <Link href="#" className="text-[#1a365d] hover:text-blue-700">Features</Link>
        <Link href="#" className="text-[#1a365d] hover:text-blue-700">Pricing</Link>
        <Link href="#" className="text-[#1a365d] hover:text-blue-700">How It Works</Link>
        <Link href="#" className="text-[#1a365d] hover:text-blue-700">Contact Us</Link>
        <button className="bg-white text-blue-600 px-6 py-2 rounded-full border border-blue-600 hover:bg-blue-50 transition-colors" onClick={()=>router.push('/auth/signup')}>
          Sign Up
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const router = useRouter();
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Column */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-[#1a365d] leading-tight">
            Effortless Shopify<br />
            and Amazon<br />
            Fulfillment Integration
          </h1>
          
          <p className="text-gray-600 text-lg max-w-md">
            One Stop Vyapaar lets you connect your Shopify store with Amazon's multi-channel fulfillment, simplifying inventory, shipping, and order management
          </p>
          
          <div className="flex space-x-4">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-colors" onClick={()=>router.push('/auth/signup')}>
              Signup
            </button>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-full border border-blue-600 hover:bg-blue-50 transition-colors" onClick={()=>router.push('/auth/login')}>
              Login
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="relative">
          <div className="relative z-10">
            <Image 
              src='/hero.jpg'
              alt="hero_image" 
              width={600}
              height={600}
              className="w-full h-auto"
            />
            
            {/* Consultation Badge */}
            <div className="absolute top-4 right-4 bg-white rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
              <div className="bg-red-100 p-2 rounded-full">
                <Phone className="text-red-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Seamless</p>
                <p className="text-xs text-gray-600">Integration</p>
              </div>
            </div>

            {/* Support Badge */}
            <div className="absolute bottom-4 right-4 bg-white rounded-lg px-4 py-2 shadow-lg flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <Package className="text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-semibold">Personalized</p>
                <p className="text-xs text-gray-600">Recomendations</p>
              </div>
            </div>
          </div>
          
          {/* Background Circle */}
          <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 w-96 h-96 bg-yellow-300 rounded-full -z-10" />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-6 rounded-xl text-center hover:shadow-lg transition-shadow duration-300">
      <div className="w-16 h-16 bg-blue-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
        <Icon className="text-blue-600 text-2xl" />
      </div>
      <h3 className="text-xl font-semibold text-[#1a365d] mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="text-blue-600 font-medium inline-flex items-center hover:gap-2 transition-all duration-300">
        Learn More <ArrowRight className="text-xl" />
      </button>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: Link2,
      title: "Seamless Integration",
      description: "Connect Shopify and Amazon with a few clicks"
    },
    {
      icon: PanelsTopLeft,
      title: "Centralized Dashboard",
      description: "Manage orders, inventory, and fulfillment in one place"
    },
    {
      icon: RefreshCcw,
      title: "Automated Syncing",
      description: "Keep stock levels and order statuses updated in real time"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1a365d] mb-4">Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque sed eros ut ligula mattis commodo.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingCard = ({ 
  title, 
  subtitle, 
  price, 
  buttonText, 
  buttonClass, 
  features, 
  isPopular 
}: any) => {
  return (
    <div className={`p-8 rounded-3xl ${isPopular ? 'bg-white shadow-xl' : 'bg-gray-100'}`}>
      <h3 className="text-2xl font-bold text-[#1a365d] mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{subtitle}</p>
      
      <div className="mb-6">
        {price === 'Free' ? (
          <span className="text-3xl font-bold text-[#1a365d]">Free</span>
        ) : (
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-[#1a365d]">${price}</span>
            <span className="text-gray-600 ml-2">/month</span>
          </div>
        )}
      </div>

      <button className={buttonClass}>
        {buttonText}
      </button>

      <div className="mt-8 space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center text-gray-600">
            <Check className="text-blue-600 mr-2" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


const Pricing = () => {
  const plans = [
    {
      title: "Basic",
      subtitle: "Basic Workflow",
      price: "29",
      buttonText: "Get Started",
      buttonClass: "w-full py-3 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors",
      features: [
        "Basic Integration",
        "Limited Orders",
        "Email Support"
      ],
      isPopular: false
    },
    {
      title: "Pro",
      subtitle: "Advanced Workflow",
      price: "59",
      buttonText: "Get Started",
      buttonClass: "w-full py-3 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors",
      features: [
        "Advanced Integration",
        "Unlimited Orders",
        "Priority Support"
      ],
      isPopular: true
    },
    {
      title: "Enterprise",
      subtitle: "Advanced admin & security",
      price: "Custom",
      buttonText: "Contact Sales",
      buttonClass: "w-full py-3 px-6 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors",
      features: [
        "Custom Solutions",
        "Dedicated Support",
        "API Access"
      ],
      isPopular: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-[#1a365d] mb-16">
          Choose the plan that fits your needs.
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
};


const Footer = () => {
  return (
    <footer className="bg-[#1a365d] text-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* About Us */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative">
              About Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400 -mb-2"></span>
            </h3>
            <p className="text-gray-300 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore 
              magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris nisi ut aliquip ex ea 
              commodo consequat.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400 -mb-2"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">About</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Help</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Terms & Conditions</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 relative">
              Contact Info
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400 -mb-2"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-400 text-xl mt-1" />
                <p className="text-gray-300">
                  647 Linda Street<br />
                  Phoenixville, PA 19460,<br />
                  USA
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-blue-400" />
                <div className="text-gray-300">
                  <p>+1 234 567 8900</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-400" />
                <a href="mailto:knowmore@email.com" className="text-gray-300 hover:text-white transition-colors">
                  knowmore@email.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

function page() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Footer/>
    </div>
  )
}

export default page;