"use client";
import { useGlobalContext } from "@/contexts/WalletContext";
import { useState, useEffect } from "react";
import { doLogin, sign } from "@/services/Web3Service";

export default function Home() {
  const { wallet, setWallet } = useGlobalContext();

  async function btnLoginClick() {
    try {
      const result = await doLogin();

      if (result !== null && result !== undefined) setWallet(result);
    } catch (err) {
      console.log(err);
    }
  }

  async function signMessage() {
    try {
      const result = await sign();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      {!wallet ? (
        <button
          onClick={btnLoginClick}
          className="ease-linear  text-black sm:mt-8 dark:hover:bg-gray-900 duration-150 dark:bg-neutral-800 dark:border-purple-700 flex items-center border border-purple-900 justify-center rounded bg-white px-3 py-2 hover:bg-purple-900 hover:text-white hover:shadow-md "
        >
          <p>{"Conectar a carteira"}</p>
        </button>
      ) : (
        <>
          <div className="ease-linear  text-black sm:mt-8 dark:hover:bg-gray-900 duration-150 dark:bg-neutral-800 dark:border-purple-700 flex items-center border border-purple-900 justify-center rounded bg-white px-3 py-2 hover:bg-purple-900 hover:text-white hover:shadow-md ">
            <div>{wallet.slice(0, 6) + "..." + wallet.slice(-3)}</div>
          </div>
          <div
            onClick={signMessage}
            className="mt-6 rounded border p-3 cursor-pointer text-center"
          >
            <p>Claim Airdrop</p>
          </div>
        </>
      )}{" "}
    </main>
  );
}
