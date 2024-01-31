import { FC } from "react";
import { utilityGetEmailLogged, utilityGetUserLogged } from "../utility";
import styled from "styled-components";
import UserInfo from "../interfaces/IUserInfo";

const Button = styled.button<{ $primary?: boolean }>((props) => ({
  background: "#717D7E",
  color: "white",
  fontSize: "1em",
  margin: "1em",
  padding: "0.25em 1em",
  border: "2px solid black",
  borderRadius: "3px",
}));

interface InfoAccessProps {
  onClickLogout: () => void;
}

const InfoAccess: React.FC<InfoAccessProps> = ({
  onClickLogout,
}): JSX.Element => {
  const user: UserInfo | null = utilityGetUserLogged();
  const email: string | undefined = utilityGetEmailLogged();
  return user && user.counter > 1 ? (
    <>
      <div className="rowI">
        <div>
          <h1 className="">Bentornat* {email}</h1>
          <p>Numero accessi: {user.counter}</p>
          <p>Ultimo accesso: {user.lastAccess.toString()}</p>
        </div>
        <div>
          <Button onClick={onClickLogout}>Logout</Button>
        </div>
      </div>
    </>
  ) : (
    <>
      <h1 className="">Benvenut* {email}</h1>
      <Button onClick={onClickLogout}>Logout</Button>
    </>
  );
};

export default InfoAccess;
