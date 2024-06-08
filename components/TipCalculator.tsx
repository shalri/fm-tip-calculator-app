"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState<number | null>(0);
  const [tipPercentage, setTipPercentage] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(0);
  const [customTip, setCustomTip] = useState<string | number>("");
  const [tip, setTip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const calculateTip = useCallback(() => {
    const billAmount = bill || 0;
    if (numberOfPeople > 0) {
      const tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
      const totalAmount =
        (billAmount + billAmount * (tipPercentage / 100)) / numberOfPeople;
      setTip(tipAmount);
      setTotal(totalAmount);
    }
  }, [bill, tipPercentage, numberOfPeople]);

  useEffect(() => {
    if (numberOfPeople > 0) {
      calculateTip();
    }
  }, [bill, tipPercentage, numberOfPeople, calculateTip]);

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBill = e.target.value;
    if (newBill === "" || parseFloat(newBill) >= 0) {
      setBill(newBill === "" ? null : parseFloat(newBill));
    }
  };

  const handleTipPercentageChange = (percentage: number) => {
    setTipPercentage(percentage);
    setCustomTip(""); // Reset custom tip if preset is chosen
  };

  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const custom = parseFloat(e.target.value);
    if (isNaN(custom)) {
      setTipPercentage(0);
      setCustomTip("");
    } else {
      setTipPercentage(custom);
      setCustomTip(e.target.value);
    }
  };

  const handleNumberOfPeopleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value;
    if (newValue === "" || /^[0-9]*$/.test(newValue)) {
      setNumberOfPeople(newValue === "" ? 0 : parseInt(newValue));
    }
  };

  const reset = () => {
    setBill(0);
    setTipPercentage(0);
    setNumberOfPeople(0);
    setCustomTip("");
    setTip(0);
    setTotal(0);
  };

  return (
    <main className="mx-auto grid max-w-[630px] place-items-center">
      <header className="flex h-[144px] items-center justify-center">
        <h1 className="relative flex h-[56px] w-[90px] items-center justify-center">
          <Image
            src="/images/logo.svg"
            alt="Splitter Logo"
            fill
            loading="eager"
            className="object-contain"
          />
        </h1>
      </header>
      <div className="rounded-t-3xl bg-tc-white">
        <section className="px-8 pt-10">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col">
              <label
                htmlFor="bill"
                className="mb-2 text-[1rem] text-tc-dark-grayish"
              >
                Bill
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={bill || ""}
                placeholder="0.00"
                onChange={handleBillChange}
                className="input-tc dollar-bg px-4 text-tc-very-dark-cyan"
                id="bill"
              />
            </div>
            <div className="mt-9 grid grid-cols-2 gap-4">
              <label
                htmlFor="tip"
                className="col-span-2 text-[1rem] text-tc-dark-grayish"
              >
                Select Tip %
              </label>
              {[5, 10, 15, 25, 50].map((percentage) => (
                <button
                  type="button"
                  id="tip"
                  key={percentage}
                  onClick={() => handleTipPercentageChange(percentage)}
                  className={cn(
                    "h-12 rounded-lg bg-tc-very-dark-cyan text-tc-white transition-colors duration-300",
                    tipPercentage === percentage
                      ? "bg-tc-strong-cyan text-tc-very-dark-cyan"
                      : "",
                  )}
                >
                  {percentage}%
                </button>
              ))}
              <input
                type="number"
                id="custom"
                placeholder="Custom"
                value={customTip}
                onChange={handleCustomTipChange}
                className="input-tc text-tc-very-dark-cyan"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="number-of-people"
                className="mb-2 mt-9 text-[1rem] text-tc-dark-grayish"
              >
                Number of People
              </label>
              <input
                type="number"
                min="1"
                id="number-of-people"
                value={numberOfPeople || ""}
                placeholder="0"
                onChange={handleNumberOfPeopleChange}
                className="person-bg input-tc px-4 text-tc-very-dark-cyan"
              />
              {numberOfPeople === 0 && (
                <span className="text-red-500">
                  Number of people must be greater than zero
                </span>
              )}
            </div>
          </form>
        </section>
        <section className="mb mx-6 my-8 rounded-2xl bg-tc-very-dark-cyan px-6 pb-6 pt-9">
          <div className="mb-5">
            <h2 className="flex w-full items-center justify-between">
              <div className="text-[1rem] text-tc-very-light-grayish">
                Tip Amount
                <p className="text-sm  text-tc-grayish-cyan">/ person</p>
              </div>
              <div className="text-[2.10rem] text-tc-strong-cyan">
                ${tip.toFixed(2)}
              </div>
            </h2>
          </div>
          <div>
            <h2 className="flex w-full items-center justify-between">
              <div className="text-[1rem] text-tc-very-light-grayish">
                Total
                <p className="text-sm  text-tc-grayish-cyan">/ person</p>
              </div>
              <div className="text-[2.10rem] text-tc-strong-cyan">
                ${total.toFixed(2)}
              </div>
            </h2>
          </div>
          <button
            onClick={reset}
            className="mt-8 h-[50px] w-full rounded-lg bg-tc-strong-cyan text-center text-[0.87em] uppercase text-tc-very-dark-cyan"
          >
            Reset
          </button>
        </section>
      </div>
    </main>
  );
}
