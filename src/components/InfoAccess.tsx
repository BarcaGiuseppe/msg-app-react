import { FC } from "react";
import { utilityGetEmailLogged, utilityGetUserLogged } from "../utility";
import styled from "styled-components";

const Button = styled.button<{ $primary?: boolean }>`
  background: ${(props) => (props.$primary ? "#BF4F74" : "white")};
  color: ${(props) => (props.$primary ? "white" : "#BF4F74")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #bf4f74;
  border-radius: 3px;
`;
const InfoAccess = ({ onClickLogout }: { onClickLogout: any }): JSX.Element => {
  const user = utilityGetUserLogged();
  const email = utilityGetEmailLogged();
  //console.log(user.lastAccess);
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
