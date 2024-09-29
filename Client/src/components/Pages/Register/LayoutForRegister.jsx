import { Outlet } from "react-router-dom"
import './index.css'

const LayoutForRegister = () => {
    return (
        <main className="App">
            <Outlet />
        </main>
    )
};

export default LayoutForRegister;
