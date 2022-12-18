import { createContext, useState } from "react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import axios from "axios";
const initialState = {
  lastname: "",
  firstname: "",
  email: "",
  password: "",
  bornDate: 18,
  sex: "male",
  phone: "",
};
const UserContext = createContext();
export const UserStore = (props) => {
  const [err, setErr] = useState("");
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const [regist, setRegist] = useState({
    lastname: "",
    firstname: "",
    email: "",
    password: "",
    bornDate: "",
    sex: "male",
    phone: "",
  });
  const setLastName = (k) => {
    setRegist({ ...regist, lastname: k });
    regist.lastname;
  };
  const setFirstName = (k) => {
    setRegist({ ...regist, firstname: k });
    regist.firstname;
  };
  const setEmail = (k) => {
    setRegist({ ...regist, email: k });
    regist.lastname;
  };
  const setPassword = (k) => {
    setRegist({ ...regist, password: k });
    regist.password;
  };
  const setbornDate = (k) => {
    setRegist({ ...regist, bornDate: k });
    regist.bornDate;
  };

  const SingUp = () => {
    regist.firstname.length;
    if (
      regist.firstname.length != 0 &&
      regist.lastname.length != 0 &&
      (regist.email.indexOf("@") != -1 || regist.email.indexOf(".") != -1) &&
      regist.password.length > 5 &&
      regist.bornDate != 0
    ) {
      setErr("");
      axios
        .post("/api/users", {
          name: regist.firstname,
          surname: regist.lastname,
          email: regist.email,
          password: regist.password,
          age: regist.bornDate,
        })
        .then((res) => {
          res;
        })
        .catch((err) => {
          err;
        });
      router.replace("/login");
      return;
    }
    if (regist.firstname.length === 0) {
      setErr("Error firstname ");
      return;
    }
    if (regist.lastname.length === 0) {
      setErr("Error lastname ");
      return;
    }
    if (regist.email.indexOf("@") === -1 || regist.email.indexOf(".") === -1) {
      setErr("Error email");
      return;
    }

    if (regist.password.length < 5) {
      setErr("Password must have more than 5 characters.");
      return;
    }
    if (regist.bornDate === 0) {
      setErr("Please enter your date of birth.");
      return;
    }
  };
  return (
    <UserContext.Provider
      value={{
        regist,
        modal,
        regist,
        setErr,
        setRegist,
        setLastName,

        setbornDate,
        setPassword,
        setEmail,
        err,
        setFirstName,
        SingUp,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContext;
