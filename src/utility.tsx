import ArrMessage from "./interfaces/IMsgInterface";
import UserInfo from "./interfaces/IUserInfo";

export const utilityValidateEmail = (email: any): boolean => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};
export const utilityGetEmailLogged = (): string => {
  const email: string = localStorage.getItem("email") || "";
  //console.log(email);
  return email;
};
export const utilityGetUsers = (): Array<UserInfo> => {
  let users: [] = localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users") || "{}")
    : [];
  //console.log(users);
  return users;
};

export const utilityGetUserLogged = (): UserInfo | null => {
  const emailLogged = utilityGetEmailLogged();
  const users = utilityGetUsers();
  return users.find((user: any) => user.email === emailLogged) || null;
};

export const utilityGetMsgList = (): Array<ArrMessage> => {
  const msgList = JSON.parse(localStorage.getItem("msgList") || "{}");
  return msgList;
};

export const utilityUpdateMsgLS = (msgList: ArrMessage[]): void => {
  localStorage.setItem("msgList", JSON.stringify(msgList));
};
