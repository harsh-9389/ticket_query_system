import {useNavigate} from 'react-router-dom'

const Home = ()=>{
    const navigate = useNavigate();

    const handleClick_register = () => {
        navigate('/register');
    }
    const handleClick_login = () => {
        navigate('/login');
    }

    return (
        <>
            <button onClick={handleClick_register}> Register </button>
            <button onClick={handleClick_login}> Login </button>
            <h1> hello </h1>
        </>
    )
}

export default Home;