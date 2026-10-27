import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function StoreLayout(){
    return (
        <div className="app-container">
            <Navbar/>
            <main>
                <Outlet/>
            </main>
            <Footer/>
        </div>      
    )
}