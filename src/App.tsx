import "./App.css";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import LoginForm from "./components/LoginForm";
import {
  utilityGetEmailLogged,
  utilityGetUserLogged,
  utilityGetUsers,
} from "./utility";
import MsgBox from "./components/MsgBox";
import InfoAccess from "./components/InfoAccess";

const App = (): JSX.Element => {
  const [email, setEmail] = useState<string>(utilityGetEmailLogged());
  /*const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });*/
  useEffect(() => {
    //setEmail(email+email.length);
    //console.log("DidMount");
    //console.log(utilityGetEmailLogged());
  }, [email]);

  //const emailLength = useMemo(() => email.length, [email]);

  const saveEmailLogged = (email: any): void => {
    setEmail(email);
    localStorage.setItem("email", email);
  };
  const deleteEmailLogged = (): void => {
    //console.log("Email rimossa correttamente");
    setEmail("");
    localStorage.removeItem("email");
  };
  const onClickLogin = (email: any): void => {
    saveEmailLogged(email);
    saveUserToStorage();
  };
  // useCallback(
  //   (email: any) => {
  //     saveEmailLogged(email);
  //     saveUserToStorage();
  //   },
  //   [email]
  // );

  const onClickLogout = (): void => {
    deleteEmailLogged();
  };

  const saveUserToStorage = (): void => {
    const user = utilityGetUserLogged();
    if (!!user) {
      updateUser(user);
    } else {
      saveNewUser();
    }
  };

  const updateUser = (user: any): void => {
    const users = utilityGetUsers();
    const newUsers = users.map((u: any) =>
      u.email === user.email
        ? {
            ...u,
            onAccess: new Date().toLocaleString(),
            lastAccess: u.onAccess,
            counter: u.counter + 1,
          }
        : u
    );
    //users = newUsers;
    //setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  const saveNewUser = (): void => {
    const users = utilityGetUsers();
    const email = utilityGetEmailLogged();
    //console.log(email);
    const newUsers = [
      ...users,
      {
        email: email,
        onAccess: new Date().toLocaleString(),
        lastAccess: "",
        counter: 1,
      },
    ];
    //users = newUsers;
    //setUsers(newUsers);
    localStorage.setItem("users", JSON.stringify(newUsers));
  };

  return (
    <div>
      {!!email ? (
        /*<WelcomePage
          onClickLogout={onClickLogout}
          //users={users}
          //setUsers={setUsers}
          //getEmailLogged={utilityGetEmailLogged}
          //getUserLogged={utilityGetUserLogged}
        />*/
        <>
          <InfoAccess onClickLogout={onClickLogout} />
          <MsgBox
          //emailP={email}
          />
        </>
      ) : (
        <LoginForm onClickLogin={onClickLogin} />
      )}
    </div>
  );
};

export default App;
