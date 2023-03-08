import {useContext} from 'react'
import { ThemeContext } from '../context/theme'
import {BrightnessHighFill, BrightnessHigh } from 'react-bootstrap-icons'

import Head from 'next/head' // see which next folder is there head

const ToggleTheme = ()=>{

    const [theme, setTheme] = useContext(ThemeContext);
    return (
        <>
        <Head>
            <link rel="stylesheet" href={`/css/${theme}.css`} />
        </Head>
        <div>

            {(theme=='light') ?
             (<BrightnessHigh style={{fontSize: "24px"}} onClick={()=>{
                setTheme("dark");
                localStorage.setItem("theme","dark");
             }
                }/>) :
             (<BrightnessHighFill style={{fontSize: "24px"}} onClick={()=>{
                setTheme("light"); 
                localStorage.setItem("theme","light");
             }
                }/>)
            }
        </div>
        
        
            {/* <div>{theme}</div> */}
        </>
    )
}

export default ToggleTheme;