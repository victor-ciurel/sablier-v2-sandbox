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
  token: undefined,
};

const prefill: Omit<ISubStreamerWithdraw> = {
  error: undefined,
  logs: [],

  amount: 100,
  lockupLinear: "0x7a43F8a888fa15e68C103E18b0439Eb1e98E4301",
  streamId: 950,
  to: "0xAb3B85eA4f70085216FD093271fF73D77F98DAE4",
  token: "0x776b6fC2eD15D6Bb5Fc32e0c89DE68683118c62A",
};

const useStoreForm = createWithEqualityFn<ISubstreamerCreateWithDuration>(
  (set) => ({
    ...initial,
    loading: false,
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
