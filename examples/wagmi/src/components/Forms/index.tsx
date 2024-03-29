import styled from "styled-components";
import { useState } from "react";
import LockupLinear from "./LockupLinear";
import LockupDynamic from "./LockupDynamic";
import Headless from "./Headless";
import SubStreamer from "./SubStreamer";
import SubStreamerWithdraw from "./SubStreamerWithdraw";
import { useAccount } from "wagmi";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.gray};
`;

const Tabs = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray};
  display: flex;
  align-items: center;
  height: 80px;
`;

const Tab = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  & > p {
    font-weight: 600;
  }

  &:after {
    content: "";
    display: none;
    position: absolute;
    bottom: -1px;
    width: 100%;
    height: 2px;
    border-radius: 1px;
    background-color: ${(props) => props.theme.colors.orange};
  }

  &[data-active="true"] {
    &:after {
      display: flex;
    }
    & > p {
      color: ${(props) => props.theme.colors.orange};
    }
  }

  &:not([data-active="true"]) {
    cursor: pointer;
    &:hover,
    &:active {
      &:after {
        display: flex;
        background-color: ${(props) => props.theme.colors.dark};
      }
    }
  }
`;

function Forms() {
  const [tab, setTab] = useState(0);
  const { isConnected } = useAccount();

  if (!isConnected) {
    return false;
  }

  return (
    <Wrapper>
      <Tabs>
        <Tab data-active={tab === 0} onClick={() => setTab(0)}>
          <p>Lockup Linear</p>
        </Tab>
        <Tab data-active={tab === 1} onClick={() => setTab(1)}>
          <p>SubStreamer</p>
        </Tab>
        <Tab data-active={tab === 2} onClick={() => setTab(2)}>
          <p>SubStreamer Withdraw</p>
        </Tab>
      </Tabs>
      {tab === 0 && <LockupLinear />}
      {tab === 1 && <SubStreamer />}
      {tab === 2 && <SubStreamerWithdraw />}
    </Wrapper>
  );
}

export default Forms;
