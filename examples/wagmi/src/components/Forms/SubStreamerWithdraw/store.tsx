import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { SEPOLIA_DAI } from "../../../constants";
import type { ISubStreamerWithdraw } from "../../../types";

const initial: Omit<ISubStreamerWithdraw> = {
  error: undefined,
  logs: [],

  amount: undefined,
  lockupLinear: undefined,
  streamId: undefined,
  to: undefined,
};

const prefill: Omit<ISubStreamerWithdraw> = {
  error: undefined,
  logs: [],

  amount: 100,
  lockupLinear: undefined,
  streamId: undefined,
  to: "0xAb3B85eA4f70085216FD093271fF73D77F98DAE4",
};

const useStoreForm = createWithEqualityFn<ISubstreamerCreateWithDuration>(
  (set) => ({
    ...initial,
    api: {
      log: (value: string) =>
        set((prev) => {
          return {
            logs: [...prev.logs, value],
          };
        }),
      update: (updates: Partial<ISubstreamerCreateWithDuration>) =>
        set((_prev) => {
          return {
            ...updates,
          };
        }),
      reset: () =>
        set((_prev) => {
          return initial;
        }),
    },
  }),
  shallow
);

export { initial, prefill };
export default useStoreForm;
