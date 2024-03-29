import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { SEPOLIA_DAI } from "../../../constants";
import type { IStoreFormLinear } from "../../../types";

const initial: Omit<IStoreFormLinear, "api"> = {
  error: undefined,
  logs: [],

  amount: undefined,
  cancelability: true,
  cliff: undefined,
  duration: undefined,
  recipient: undefined,
  token: undefined,
  transferability: true
};

const prefill: Omit<IStoreFormLinear, "api"> = {
  error: undefined,
  logs: [],

  amount: "100",
  cancelability: true,
  cliff: undefined,
  duration: "86400", // 1 day
  recipient: "0x50BD15B9f7b70F632c7042b0511E6F2baFfad44a",
  token: SEPOLIA_DAI,
  transferability: true,
};

const useStoreForm = createWithEqualityFn<IStoreFormLinear>(
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
      update: (updates: Partial<IStoreFormLinear>) =>
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
