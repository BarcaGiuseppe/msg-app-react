import React, { ChangeEvent, FC, useEffect, useState } from "react";
import {
  utilityGetEmailLogged,
  utilityGetUserLogged,
  utilityUpdateMsgLS,
} from "../utility";
import styled from "styled-components";
import ArrMessage from "../interfaces/IMsgInterface";
import UserInfo from "../interfaces/IUserInfo";

const MessageContainer = styled.div<{ ismymsg?: boolean }>((props) => ({
  padding: "8px",
  borderRadius: "8px",
  marginBottom: "8px",
  backgroundColor: props.ismymsg ? "#E6EE9C" : "#e0f7fa",
  maxWidth: "70%",
  marginLeft: props.ismymsg ? "auto" : "0",
  marginRight: props.ismymsg ? "0" : "auto",
}));

const Author = styled.div(() => ({ fontWeight: "bold", marginBottom: "4px" }));

const Timestamp = styled.div(() => ({ fontSize: "0.8em", color: "#888" }));

const Button = styled.button(() => ({
  background: "#717D7E",
  color: "white",
  fontSize: "1em",
  margin: "1em",
  padding: "0.25em 1em",
  border: "2px solid black",
}));

const MsgBox = (): JSX.Element =>
  //{ emailP }: { emailP: string }
  {
    const user: UserInfo | null = utilityGetUserLogged();
    const email: string = utilityGetEmailLogged()!;

    //console.log(emailP);

    const [input, setInput] = useState<string>();
    //const [email, setEmail] = useState<string>(utilityGetEmailLogged() || "");
    const [clickInput, setClickInput] = useState<number>(0);
    const [comments, setComments] = useState<ArrMessage[]>(
      localStorage.getItem("msgList")
        ? JSON.parse(localStorage.getItem("msgList") || "{}")
        : []
    );

    // useEffect(() => {
    //   console.log("emailP cambiataaa");
    // }, [emailP]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    };

    const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
      const target = event.target as HTMLInputElement;
      clickInput < 1 ? setInput("") : setInput(target.value);
      //clickInput < 1 ? setInput("") : setInput(event.target.value);
      setClickInput(clickInput + 1);
    };
    const handleSubmit = (): void => {
      input && addMsg(input);
    };
    const addMsg = (input: string): void => {
      const newMsgList: ArrMessage[] = [
        ...comments,
        {
          id: comments.length + 2,
          author: email || "",
          content: input,
          timestamp: new Date().toLocaleString(),
        },
      ];
      utilityUpdateMsgLS(newMsgList);
      setComments(newMsgList);
    };
    const deleteMsg = (id: number): void => {
      const newMsgList: ArrMessage[] = comments.filter((el) => el.id !== id);
      utilityUpdateMsgLS(newMsgList);
      setComments(newMsgList);
    };

    return (
      <div className="row">
        <div className="comments-container">
          <ul>
            {comments.map((el) => (
              <Message
                key={el.id}
                idMsg={el.id}
                author={el.author}
                content={el.content}
                timestamp={el.timestamp}
                isMyMessage={el.author === email}
                deleteMsg={deleteMsg}
              />
            ))}
          </ul>
        </div>
        <div className="input-container">
          <input
            value={input}
            onChange={handleInputChange}
            onClick={handleInputClick}
          />
          <Button onClick={handleSubmit}>Invia</Button>
        </div>
      </div>
    );
  };

const Message = ({
  idMsg,
  author,
  content,
  timestamp,
  isMyMessage,
  deleteMsg,
}: {
  idMsg: number;
  author: string;
  content: string;
  timestamp: string;
  isMyMessage: boolean;
  deleteMsg: (id: number) => void;
}): JSX.Element => {
  const handleClick = () => {
    const email = utilityGetEmailLogged();
    //console.log(author + " emai: " + email);
    author === email && deleteMsg(idMsg);
  };
  return (
    <MessageContainer ismymsg={isMyMessage} onClick={handleClick}>
      <Author>{author}</Author>
      <p>{content}</p>
      <Timestamp>{timestamp}</Timestamp>
    </MessageContainer>
  );
};

export default MsgBox;
