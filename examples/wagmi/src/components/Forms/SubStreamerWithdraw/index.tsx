import styled from "styled-components";
import {
  Amount,
  LockupLinearContract,
  Receiver,
  StreamId,
  Token,
} from "./fields";
import { useCallback } from "react";
import LoadingOverlay from "react-loading-overlay";
import { PeripherySubStreamer } from "../../../models";
import useStoreForm, { prefill } from "./store";
import _ from "lodash";
import { useAccount } from "wagmi";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 16px;
  gap: 16px;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray};
  margin: 8px 0;
`;

const Button = styled.button``;

const Error = styled.p`
  color: ${(props) => props.theme.colors.red};
  margin-top: 16px;
`;

const Logs = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;

  label {
    font-weight: 700;
  }

  ul {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 12px;
    margin: 0 !important;
  }
`;

const Actions = styled.div`
  gap: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  & > div {
    height: 20px;
    width: 1px;
    background-color: ${(props) => props.theme.colors.gray};
    margin: 0px;
  }
`;

function SubStreamerWithdraw() {
  const { isConnected } = useAccount();
  const { loading, error, logs, update } = useStoreForm((state) => ({
    loading: state.loading,
    error: state.error,
    logs: state.logs,
    update: state.api.update,
  }));

  const onWithdraw = useCallback(async () => {
    if (isConnected) {
      const state = useStoreForm.getState();
      try {
        state.api.update({ error: undefined });
        state.api.update({ loading: true });
        await PeripherySubStreamer.doWithdraw(state, state.api.log);
      } catch (error) {
        state.api.update({ error: _.toString(error) });
      }
      state.api.update({ loading: false });
    }
  }, [isConnected]);

  const onPrefill = useCallback(() => {
    update(prefill);
  }, [update]);

  return (
    <LoadingOverlay
      active={loading}
      spinner
      text='Loading...'
    >
      <Wrapper>
        <LockupLinearContract />
        <StreamId />
        <Receiver />
        <Token />
        <Amount />
        <Divider />
        <Actions>
          <Button onClick={onPrefill}>Prefill form</Button>
          <div />
          <Button onClick={onWithdraw}>Withdraw</Button>
        </Actions>
        {error && <Error>{error}</Error>}
        {logs.length > 0 && (
          <>
            <Divider />
            <Logs>
              <label>Logs</label>
              <ul>
                {logs.map((log) => (
                  <li key={log}>{log}</li>
                ))}
              </ul>
            </Logs>
          </>
        )}
      </Wrapper>
    </LoadingOverlay>
  );
}

export default SubStreamerWithdraw;
