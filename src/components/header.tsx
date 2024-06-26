import {
  FaSearch,
  FaShoppingBag,
  FaSignInAlt,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import { User } from "../types/types";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface Propstype {
  user: User | null;
}

const Header = ({ user }: Propstype) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);
  const logOutHandler = async () => {
    try {
      await signOut(auth);
      toast.success("Sign Out Successfully !");

      setIsOpen(false);
    } catch (error) {
      toast.error("Sign Out Failed!");
    }
  };
  return (
    <nav className="header">
      <Link onClick={() => setIsOpen(false)} to={"/"}>
        HOME
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/search"}>
        <FaSearch />
      </Link>
      <Link onClick={() => setIsOpen(false)} to={"/cart"}>
        <FaShoppingBag />
      </Link>

      {user?._id ? (
        // <>
        //   <button onClick={() => setIsOpen((prev) => !prev)}>
        //     <FaUser />
        //   </button>
        //   <dialog open={isOpen}>
        //     <div>
        //       {user.role === "admin" && (
        //         <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
        //           Admin{" "}
        //         </Link>
        //       )}
        //       <Link onClick={() => setIsOpen(false)} to="/orders">
        //         Orders
        //       </Link>
        //       <button onChange={logOutHandler}>
        //         <FaSignOutAlt />
        //       </button>
        //     </div>
        //   </dialog>
        // </>
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          {isOpen && (
            <div className="dialog-overlay">
              <div className="dialog-content">
                {user.role === "admin" && (
                  <Link onClick={() => setIsOpen(false)} to="/admin/dashboard">
                    Admin
                  </Link>
                )}
                <Link onClick={() => setIsOpen(false)} to="/orders">
                  Orders
                </Link>
                <button onClick={logOutHandler}>
                  <FaSignOutAlt />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <Link to={"/login"}>
          <FaSignInAlt />
        </Link>
      )}
    </nav>
  );
};

export default Header;
