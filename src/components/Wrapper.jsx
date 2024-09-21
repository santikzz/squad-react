import "../App.css";
import BottomNav from "@/components/BottomNav";
import Header from "@/components/Header";
import DesktopSidenav from "@/components/DesktopSidenav";

const Wrapper = ({ children }) => {

    return (
        <div className="flex h-screen flex-col bg-white lg:bg-gray-200">
            <Header />
            <div className="flex flex-1 overflow-hidden">
                <DesktopSidenav />
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
            <BottomNav ></BottomNav>
        </div>
    );
}

export default Wrapper;