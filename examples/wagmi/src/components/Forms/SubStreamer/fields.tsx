import styled from "styled-components";
import _ from "lodash";
import { useCallback } from "react";
import type { ChangeEvent } from "react";
import Input from "../../Input";
import Select from "../../Select";
import useFormStore from "./store";
import { REGEX_ADDRESS, REGEX_FLOAT, REGEX_INTEGER } from "../../../constants";

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.colors.gray};
  margin: 8px 0;
`;

export function Cliff() {
  const { cliff, update } = useFormStore((state) => ({
    cliff: state.cliff,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = (() => {
        const input = e.target.value;
        if (_.isNil(input) || _.toString(input).length === 0) {
          return "";
        }
        return _.toString(input);
      })();

      if (value !== "" && !new RegExp(REGEX_INTEGER).test(value)) {
        return;
      }

      update({ cliff: value });
    },
    [update]
  );

  return (
    <Input
      label={"Cliff"}
      id={"cliff"}
      value={cliff}
      onChange={onChange}
      format={"text"}
      placeholder={"Cliff in seconds"}
    />
  );
}

export function Duration() {
  const { duration, update } = useFormStore((state) => ({
    duration: state.duration,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = (() => {
        const input = e.target.value;
        if (_.isNil(input) || _.toString(input).length === 0) {
          return "";
        }
        return _.toString(input);
      })();

      if (value !== "" && !new RegExp(REGEX_INTEGER).test(value)) {
        return;
      }

      update({ duration: value });
    },
    [update]
  );

  return (
    <Input
      label={"Duration"}
      id={"duration"}
      value={duration}
      onChange={onChange}
      format={"text"}
      placeholder={"Duration in seconds"}
    />
  );
}

export function LockupLinearContract() {
  const { lockupLinear, update } = useFormStore((state) => ({
    lockupLinear: state.lockupLinear,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = (() => {
        const input = e.target.value;
        if (_.isNil(input) || _.toString(input).length === 0) {
          return "";
        }
        return _.toString(input);
      })();

      if (value !== "" && !new RegExp(REGEX_ADDRESS).test(value)) {
        return;
      }

      update({ lockupLinear: value });
    },
    [update]
  );

  return (
    <Input
      label={"LockupLinear Contract"}
      id={"lockupLinear"}
      value={lockupLinear}
      onChange={onChange}
      format={"text"}
      placeholder={"LockupLinear contract address"}
    />
  );
}

export function StreamId() {
  const { streamId, update } = useFormStore((state) => ({
    streamId: state.streamId,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = (() => {
        const input = e.target.value;
        if (_.isNil(input) || _.toString(input).length === 0) {
          return "";
        }
        return _.toString(input);
      })();

      if (value !== "" && !new RegExp(REGEX_INTEGER).test(value)) {
        return;
      }

      update({ streamId: value });
    },
    [update]
  );

  return (
    <Input
      label={"StreamId"}
      id={"streamId"}
      value={streamId}
      onChange={onChange}
      format={"text"}
      placeholder={"Stream ID"}
    />
  );
}

export function SubStreamReceiversNumber() {
  const { receiversNumber, update } = useFormStore((state) => ({
    receiversNumber: state.receiversNumber,
    update: state.api.update,
  }));

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = (() => {
        const input = e.target.value;
        if (_.isNil(input) || _.toString(input).length === 0) {
          return "";
        }
        return _.toString(input);
      })();

      if (value !== "" && !new RegExp(REGEX_INTEGER).test(value)) {
        return;
      }

      if (+value < 1) {
        return;
      }

      const state = useFormStore.getState();
      update({ receiversNumber: value });
      if (+value < state.receivers.length) {
        const updatedReceivers = _.clone(state.receivers.slice(0, +value));
        const updatedPercentages = _.clone(state.weightsPercent.slice(0, +value));
        update({
          receivers: updatedReceivers,
          weightsPercent: updatedPercentages,
        });
      }	else if (+value > state.receivers.length) {
        const updatedReceivers = _.clone(state.receivers);
        const updatedPercentages = _.clone(state.weightsPercent);
        for (let i = state.receivers.length; i < +value; i++) {
          updatedPercentages.push(undefined);
          updatedReceivers.push(undefined);
        }
        update({
          receivers: updatedReceivers,
          weightsPercent: updatedPercentages,
        });
      }	
    },
    [update]
  );

  return (
    <Input
      label={"Receivers Number"}
      id={"receiversNumber"}
      value={receiversNumber}
      onChange={onChange}
      format={"text"}
      placeholder={"Number of sub stream receivers"}
    />
  );
}

export function SubStreamReceivers() {
  enum ChangeTarget {
    RECIPIENT,
    PERCENTAGE,
  };
  const {
   percentages,
   receivers,
   receiversNumber,
   update
  } = useFormStore((state) => ({
    percentages: state.weightsPercent,
    receivers: state.receivers,
    receiversNumber: state.receiversNumber,
    update: state.api.update,
  }));
  let receiverDivs = []
  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, index: number, target: ChangeTarget) => {
      const value = (() => {
        const input = e.target.value;
        if (_.isNil(input) || _.toString(input).length === 0) {
          return "";
        }
        return _.toString(input);
      })();

      const state = _.clone(useFormStore.getState());
      if (target == ChangeTarget.RECIPIENT) {
        if (value !== "" && !new RegExp(REGEX_ADDRESS).test(value)) {
          return;
        }
        const updatedReceivers = _.clone(state.receivers);
        updatedReceivers[index] = value;
        update({ receivers: updatedReceivers });
      } else {
        if (value !== "" && !new RegExp(REGEX_INTEGER).test(value)) {
          return;
        }
  
        if (+value < 0 || +value > 100) {
          return;
        }
        const updatedPercentages = _.clone(state.weightsPercent);
        updatedPercentages[index] = value;
        update({ weightsPercent: updatedPercentages });
      }
    },
    [update]
  );
  for (let i = 0; i < receiversNumber; i++) {
    receiverDivs.push((<Divider />));
    receiverDivs.push((
      <Input
        label={"Receiver " + (i+1)}
        id={"receiver" + i}
        value={receivers[i]}
        onChange={(e) => onChange(e, i, ChangeTarget.RECIPIENT)}
        format={"text"}
        placeholder={"Receiver " + (i+1) + " address"}
      />
    ));
    receiverDivs.push((
      <Input
        label={"Receiver " + (i+1) + " percentage"}
        id={"percentage" + i}
        value={percentages[i]}
        onChange={(e) => onChange(e, i, ChangeTarget.PERCENTAGE)}
        format={"text"}
        placeholder={"Receiver " + (i+1) + " pecentage"}
      />
    ));
  }
  return <>{receiverDivs}</>;
}
