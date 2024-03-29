import { shallow } from "zustand/shallow";
import { createWithEqualityFn } from "zustand/traditional";
import { SEPOLIA_DAI } from "../../../constants";
import type { ISubStreamerCreateWithDuration } from "../../../types";

const initial: Omit<ISubStreamerCreateWithDuration, "api"> = {
  error: undefined,
  logs: [],

  cliff: undefined,
  duration: undefined,
  lockupLinear: undefined,
  receivers: [],
  receiversNumber: undefined,
  streamId: undefined,
  weightsPercent: [],
};

const prefill: Omit<ISubStreamerCreateWithDuration, "api"> = {
  error: undefined,
  logs: [],

  cliff: "0",
  duration: "0",
  lockupLinear: "0x138Ca7b03fa90da5106B9a4C754a3339C9c6cCE9",
  receivers: ["0xAb3B85eA4f70085216FD093271fF73D77F98DAE4", "0x1D19cdCF692F4BB262579A5cd7609B4B1621CEf2"],
  receiversNumber: 2,
  streamId: "908",
  weightsPercent: ["50", "50"],
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
