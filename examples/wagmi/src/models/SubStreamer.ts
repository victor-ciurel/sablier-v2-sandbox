import BigNumber from "bignumber.js";
import _ from "lodash";
import { getAccount, readContract, waitForTransaction, writeContract } from "wagmi/actions";
import { ABI, SEPOLIA_CHAIN_ID, contracts } from "../constants";
import type {
  IAddress,
  ISubStreamerCreateWithDuration,
  ISubStreamerWithdraw,
} from "../types";
import { expect } from "../utils";

export default class PeripherySubStreamer {
  static async doSubStreamerCreateWithDuration(
    state: ISubStreamerCreateWithDuration,
    log: (value: string) => void
  ) {
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
    const data = [
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
    if (tx.hash) {
      log(`SubStreams sent to the blockchain with hash: ${tx.hash}.`);
    }
    return waitForTransaction({ hash: tx.hash });
  }

  static async doWithdraw(state: ISubStreamerWithdraw) {
    const decimals = await readContract({
      address: state.token as IAddress,
      abi: ABI.ERC20.abi,
      functionName: "decimals",
    });
    const padding = new BigNumber(10).pow(new BigNumber(decimals.toString()));
    const amount = BigInt(new BigNumber(state.amount).times(padding).toFixed());

    const data: ISubStreamerWithdrawType = [
      state.lockupLinear,
      state.streamId,
      state.to,
      amount,
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
