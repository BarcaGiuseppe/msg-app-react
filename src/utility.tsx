import ArrMessage from "./components/IMsgInterface";

export const utilityValidateEmail = (email: any) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
export const utilityGetEmailLogged = () => {
  const email = localStorage.getItem("email");
  //console.log(email);
  return email;
};
export const utilityGetUsers = () => {
  let users: any = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users") || "{}")
    : [];
  //console.log(users);
  return users;
};

export const utilityGetUserLogged = () => {
  const emailLogged = utilityGetEmailLogged();
  const users = utilityGetUsers();
  return users.find((user: any) => user.email === emailLogged);
};

export const utilityGetMsgList = () => {
  const msgList = JSON.parse(localStorage.getItem("msgList") || "{}");
};

export const utilityUpdateMsgLS = (msgList: ArrMessage[]) => {
  localStorage.setItem("msgList", JSON.stringify(msgList));
};
