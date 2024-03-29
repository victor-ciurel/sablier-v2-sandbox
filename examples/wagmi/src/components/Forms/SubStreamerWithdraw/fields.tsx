import _ from "lodash";
import { useCallback } from "react";
import type { ChangeEvent } from "react";
import Input from "../../Input";
import Select from "../../Select";
import useFormStore from "./store";
import { REGEX_ADDRESS, REGEX_FLOAT, REGEX_INTEGER } from "../../../constants";

export function Amount() {
  const { amount, update } = useFormStore((state) => ({
    amount: state.amount,
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
      update({ amount: value });
    },
    [update]
  );

  return (
    <Input
      label={"Amount"}
      id={"amount"}
      value={amount}
      onChange={onChange}
      format={"text"}
      placeholder={"Amount"}
    />
  );
}

export function Receiver() {
  const { receiver, update } = useFormStore((state) => ({
    receiver: state.to,
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

      update({ to: value });
    },
    [update]
  );

  return (
    <Input
      label={"Receiver"}
      id={"receiver"}
      value={receiver}
      onChange={onChange}
      format={"text"}
      placeholder={"Receiver address"}
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
