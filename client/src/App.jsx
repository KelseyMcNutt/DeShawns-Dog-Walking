import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from "reactstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Dogs } from "./Dogs/Dogs";
import { Route, Routes } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar/NavBar";

export const App = () => {
  return (
    <div className="App">
      <>
      
      <Routes>
      <Route path="/" element={
              <>
              <NavBar color="light" expand="md"/>
              <Outlet/>
              </>
            } >
      
      <Route path="/">
            <Route index element={<Dogs />} />
      </Route>
      
      
      </Route>
      </Routes>
      </>
    </div>
  );
}

export default App;
