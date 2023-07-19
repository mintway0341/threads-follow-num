"use client";

import { useState } from "react";
import { styled } from "styled-components";
import bbblury from "/public/bbblurry.svg";
import threads from "/public/threads.png";
import Image from "next/image";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selected, setSelected] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [ok, setOk] = useState("확인");
  const onBtnClickHandler = async () => {
    try {
      setOk("로딩중");
      const data = await (
        await fetch(`/api?username=${username}&password=${password}`)
      ).json();
      setOk("확인");
      setFollowers(data.followers);
      setFollowing(data.following);
      const werMinusIng = data.followers.filter(
        (el) => !data.following.includes(el)
      );
      const ingMinusWer = data.following.filter(
        (el) => !data.followers.includes(el)
      );
      switch (selected) {
        case 1:
          setTableData(data.followers);
          break;
        case 2:
          setTableData(data.following);
          break;
        case 3:
          setTableData(ingMinusWer);
          break;
        case 4:
          setTableData(werMinusIng);
      }
    } catch (e) {
      setOk("확인");
      alert("비밀번호를 확인해주세요.");
    }
  };

  return (
    <>
      <BlurryImage src={bbblury} layout="fill" objectFit="cover" />
      <Bg>
        <MainContainer>
          <Title>쓰팔넘 : Threads Follow Numbers</Title>
          <Description>쓰레드 언팔 확인</Description>
          <Notice>*비밀번호를 수집하지 않습니다. 걱정마세요.</Notice>
          <Column>
            <NameInput
              placeholder="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <NameInput
              placeholder="password"
              value={password}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Btn onClick={onBtnClickHandler}>{ok}</Btn>
          </Column>
          <TableSelectRow>
            <TableSelect
              bgColor={selected === 1 ? "#ffffff80" : "transparent"}
              onClick={() => {
                setSelected(1);
                setTableData(followers);
              }}
            >
              팔로워
            </TableSelect>
            <TableSelect
              bgColor={selected === 2 ? "#ffffff80" : "transparent"}
              onClick={() => {
                setSelected(2);
                setTableData(following);
              }}
            >
              팔로잉
            </TableSelect>
            <TableSelect
              bgColor={selected === 3 ? "#ffffff80" : "transparent"}
              onClick={() => {
                setSelected(3);
                setTableData(following.filter((el) => !followers.includes(el)));
              }}
            >
              팔로잉 - 팔로워
            </TableSelect>
            <TableSelect
              bgColor={selected === 4 ? "#ffffff80" : "transparent"}
              onClick={() => {
                setSelected(4);
                setTableData(followers.filter((el) => !following.includes(el)));
              }}
            >
              팔로워 - 팔로잉
            </TableSelect>
          </TableSelectRow>
          <Table>
            {tableData
              ? tableData.map((e) => (
                  <Card key={e}>
                    <p>{e}</p>
                    <ThreadsImage
                      src={threads}
                      alt={e}
                      onClick={() => {
                        window.open(`https://www.threads.net/@${e}`);
                      }}
                    />
                  </Card>
                ))
              : null}
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
  margin-top: 0px;
`;
const Notice = styled.p`
  font-size: 10px;
  font-weight: 400;
  color: white;
  margin-top: 10px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 5px;
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
  background-color: #4a74ff;
  color: white;
  font-weight: 700;
  border: none;
  box-shadow: 0px 5px 10px 5px #4a74ff30;
  border-radius: 5px;
  padding: 5px 10px;
  &:hover {
    background-color: #3f65e0;
    box-shadow: 0px 5px 10px 5px #4a74ff50;
  }
`;
const TableSelectRow = styled.div`
  width: 75vw;
  max-width: 600px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  background-color: #ffffff40;
  border-left: 1px solid #ffffff30;
  border-top: 1px solid #ffffff30;
  border-radius: 40px;
  backdrop-filter: blur(120px);
  -webkit-backdrop-filter: blur(120px);
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;
const TableSelect = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  padding: 10px 4px;
  word-break: keep-all;
  background-color: ${(props) => props.bgColor};
  text-shadow: none;
  &:hover {
    background-color: #ffffff50;
  }
`;
const Table = styled.div`
  height: 60vh;
  margin-top: 20px;
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
