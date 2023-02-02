import {Button} from 'antd'
import ToggleTheme from '../component/ToggleTheme';

function Home(){

    
    return (
        <>
            <h1>Home</h1>
            <Button type="primary">click me</Button>
            <ToggleTheme/>
        </>
    );
}

export default Home;