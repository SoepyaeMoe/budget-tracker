import { useAuthContext } from '../App.jsx';
import Layout from './Layout.jsx';


const Home = () => {
    const { user } = useAuthContext();
    return (
        <Layout>
            <div>{user.fullname}</div>
        </Layout>
    )
}

export default Home