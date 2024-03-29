import BigNumber from "bignumber.js";
import _ from "lodash";
import { getAccount, waitForTransaction, writeContract } from "wagmi/actions";
import { ABI, SEPOLIA_CHAIN_ID, contracts } from "../constants";
import type {
  IAddress,
  ISubStreamerCreateWithDuration,
  ISubStreamerWithdraw,
} from "../types";
import { expect } from "../utils";

export default class PeripherySubStreamer {
  static async doSubStreamerCreateWithDuration(state: ISubStreamerCreateWithDuration) {
console.info("state", state);
    const receivers = state.receivers.map(
      function(receiver) {
        return receiver as IAddress;
      }
    );
    const percentages = state.weightsPercent.map(
      function(percent) {
        return BigInt(percent);
      }
    );
    const data: ISubStreamerCreateWithDurationType = [
      BigInt(state.streamId),
      state.lockupLinear as IAddress,
      receivers,
      percentages,
      BigInt(state.cliff),
      BigInt(state.duration),
    ];

    console.info("Payload", data);

    const tx = await writeContract({
      address: contracts[SEPOLIA_CHAIN_ID].SablierV2SubStreamer,
      abi: ABI.SablierV2SubStreamer.abi,
      functionName: "createLinearSubStreamsWithDuration",
      args: data,
    });
    return waitForTransaction({ hash: tx.hash });
  }

  static async doWithdraw(payload: ISubStreamerWithdraw) {
    const data: ISubStreamerWithdrawType = [
      state.lockupLinear,
      state.streamId,
      state.receiver,
      state.amount,
    ];
    console.info("Payload", data);

    const tx = await writeContract({
      address: contracts[SEPOLIA_CHAIN_ID].SablierV2SubStreamer,
      abi: ABI.SablierV2SubStreamer.abi,
      functionName: "withdraw",
      args: data,
    });
    return waitForTransaction({ hash: tx.hash });
  }
}
