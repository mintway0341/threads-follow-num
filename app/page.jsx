"use client";

import { useState } from "react";
import { styled } from "styled-components";
import { ThreadsAPI } from "threads-api";
import bbblury from "/public/bbblurry.svg";
import threads from "/public/threads.png";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState("");
  const [tableData, setTableData] = useState([
    "username1",
    "username2",
    "username3",
    "username4",
    "username5",
    "username6",
    "username7",
    "username8",
    "username9",
    "username10",
  ]);
  const onBtnClickHandler = async () => {
    const { user } = await (await fetch(`/api?username=${username}`)).json();
    if (user === undefined) {
      alert("유저 정보가 없습니다.");
      return;
    }
  };

  return (
    <>
      <BlurryImage src={bbblury} layout="fill" objectFit="cover" />
      <Bg>
        <MainContainer>
          <Title>쓰팔넘 : Threads Follow Numbers</Title>
          <Description>쓰레드 언팔 확인</Description>
          <Row>
            <NameInput
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <Btn onClick={onBtnClickHandler}>확인</Btn>
          </Row>
          <Table>
            {tableData.map((e) => (
              <Card key={e}>
                <p>{e}</p>
                <ThreadsImage
                  src={threads}
                  onClick={() => {
                    window.open(`https://www.threads.net/@${e}`);
                  }}
                />
              </Card>
            ))}
          </Table>
        </MainContainer>
      </Bg>
    </>
  );
}

const Bg = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    110.6deg,
    rgb(156, 116, 129) -18.3%,
    rgb(67, 54, 74) 16.4%,
    rgb(47, 48, 67) 68.2%,
    rgb(27, 23, 36) 99.1%
  );
`;
const BlurryImage = styled(Image)`
  position: fixed;
  left: 0;
  top: 0;
  opacity: 0.3;
`;
const MainContainer = styled.div`
  display: flex;
  width: 80vw;
  height: 80vh;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  padding-top: 50px;
  border: none;
  background-color: #ffffff10;
  border-left: 1px solid #ffffff30;
  border-top: 1px solid #ffffff30;
  border-radius: 20px;
  backdrop-filter: blur(120px);
  -webkit-backdrop-filter: blur(120px);
  box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
`;
const Title = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: white;
  text-align: center;
`;
const Description = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: white;
  margin-top: 6px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
`;
const NameInput = styled.input`
  background-color: transparent;
  border: 1px solid #ffffffa0;
  border-radius: 5px;
  padding: 5px 10px;
  color: white;

  &::placeholder {
    color: #ffffff50;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #ffffff50;
  }

  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #ffffff50;
  }
`;
const Btn = styled.button`
  cursor: pointer;
  background-color: #7b61ff;
  color: white;
  font-weight: 700;
  border: none;
  box-shadow: 0px 5px 10px 5px #7b61ff30;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: 10px;
  &:hover {
    background-color: #6c54e3;
    box-shadow: 0px 5px 10px 5px #7b61ff50;
  }
`;
const Table = styled.div`
  height: 60vh;
  margin-top: 50px;
  gap: 10px;
  overflow: scroll;
  padding: 0 3vw;
`;
const Card = styled.div`
  width: 60vw;
  max-width: 500px;
  height: 8vh;
  background-color: #ffffff40;
  border-left: 1px solid #ffffff30;
  border-top: 1px solid #ffffff30;
  border-radius: 20px;
  backdrop-filter: blur(120px);
  -webkit-backdrop-filter: blur(120px);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  text-shadow: none;
  border-radius: 10px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-weight: 700;
`;
const ThreadsImage = styled(Image)`
  cursor: pointer;
  width: 25.9px;
  height: 30px;
`;
