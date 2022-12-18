import "../styles/globals.css";
import { UserStore } from "../context/user-context";
import { useEffect ,useState} from "react";
import { useRouter } from 'next/router';
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const use = async () => {
      (await import("flowbite/dist/flowbite")).default;
      (await import("tw-elements")).default;
    };
    use();
  }, []);

  const router = useRouter();
    const [pageLoading, setPageLoading] = useState(false);
    useEffect(() => {
        const handleStart = () => { setPageLoading(true); };
        const handleComplete = () => { setPageLoading(false); };
    
        router.events.on('routeChangeStart', handleStart);
        router.events.on('routeChangeComplete', handleComplete);
        router.events.on('routeChangeError', handleComplete);
      }, [router]);

      
  if (pageLoading){return (<div className='mylaoding'> <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>Please wait </div>)} else {return <UserStore>
    <Component {...pageProps} />
  </UserStore>}

}

export default MyApp;
