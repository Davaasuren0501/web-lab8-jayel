import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";

const SideNav = () => {
  const router = useRouter();
  const signOut = () => {
    deleteSession();
    deleteCookie("token");
    deleteCookie("userId");
    router.replace("/login");
  };
  const deleteSession = async () => {
    const token = getCookie("token");
    token;
    axios
      .delete(`/api/get-session/${token}`)
      .then((res) => {
        res;
      })
      .catch((err) => {
        err;
      });
  };
  return (
    <Navbar fluid={true} rounded={true} className="bg-red-500">
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://static.vecteezy.com/system/resources/previews/000/609/739/non_2x/finance-logo-and-symbols-vector-concept-illustration.jpg"
          className="mr-3 w-16 "
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Hello Dear
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="https://www.pngitem.com/pimgs/m/575-5759580_anonymous-avatar-image-png-transparent-png.png"
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Link href="/">
          <p
            className={`hover:text-gray-400 duration-200 ${
              router.pathname === "/" ? "text-blue-500" : ""
            }`}
          >
            орлого
          </p>
        </Link>
        <Link href="/deposit">
          <p
            className={`hover:text-gray-400 duration-200 ${
              router.pathname === "/deposit" ? "text-blue-500" : ""
            }`}
          >
            зарлага
          </p>
        </Link>
        <Link href="/report">
          <p
            className={`hover:text-gray-400 duration-200 ${
              router.pathname === "/report" ? "text-blue-500" : ""
            }`}
          >
            тайлан
          </p>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default SideNav;
