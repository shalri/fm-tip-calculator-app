"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState<number | null>(0);
  const [tipPercentage, setTipPercentage] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number | null>(0);
  const [customTip, setCustomTip] = useState<string | number>("");
  const [tip, setTip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const calculateTip = useCallback(() => {
    if (numberOfPeople && numberOfPeople > 0) {
      const billAmount = bill ?? 0;
      const tipAmount = (billAmount * (tipPercentage / 100)) / numberOfPeople;
      const totalAmount =
        (billAmount + billAmount * (tipPercentage / 100)) / numberOfPeople;
      setTip(tipAmount);
      setTotal(totalAmount);
    }
  }, [bill, tipPercentage, numberOfPeople]);

  useEffect(() => {
    if (numberOfPeople !== null && numberOfPeople > 0) {
      calculateTip();
    }
  }, [bill, tipPercentage, numberOfPeople, calculateTip]);

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBill = e.target.value;
    if (newBill === "" || parseInt(newBill) > 0) {
      setBill(newBill === "" ? null : parseInt(newBill));
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
      setCustomTip(custom);
    }
  };

  const handleNumberOfPeopleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const numPeople = e.target.value;
    if (numPeople === "" || parseInt(numPeople) > 0) {
      setNumberOfPeople(numPeople === "" ? null : parseInt(numPeople));
    }
  };

  const reset = () => {
    setBill(0);
    setTipPercentage(0);
    setNumberOfPeople(null);
    setCustomTip("");
    setTip(0);
    setTotal(0);
  };
  return (
    <main className="mx-auto grid max-w-[630px] place-items-center">
      <header className="flex h-[144px] items-center justify-center">
        <h1 className="relative flex h-[56px] w-[90px] items-center justify-center">
          <Image
            src="./images/logo.svg"
            alt="Splitter Logo"
            fill
            loading="eager"
            className="object-contain"
          />
        </h1>
      </header>
      <div className="rounded-t-3xl bg-tc-white">
        <section className="px-8 pt-10">
          <form onSubmit={(e) => e.preventDefault}>
            <div className="flex flex-col">
              <label
                htmlFor="bill"
                className="mb-2 text-[1rem] text-tc-grayish-cyan"
              >
                Bill
              </label>
              <input
                type="number"
                value={bill || ""}
                placeholder="0"
                onChange={handleBillChange}
                // className="form-input border-2 border-tc-white bg-tc-very-light-grayish text-right focus:border-2 focus:border-tc-strong-cyan focus:ring-0 focus:ring-offset-0 active:border-2 active:ring-tc-strong-cyan"
                className="input-tc text-tc-very-dark-cyan"
                id="bill"
              />
            </div>
            <div className="mt-9 grid grid-cols-2 gap-4">
              <label
                htmlFor="tip"
                className="col-span-2 text-[1rem] text-tc-grayish-cyan"
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
                // value={customTip}
                value={customTip === 0 ? "Custom" : customTip}
                onChange={handleCustomTipChange}
                // className="form-input rounded border"
                className="input-tc text-tc-very-dark-cyan"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="number-of-people"
                className="mb-2 mt-9 text-[1rem] text-tc-grayish-cyan"
              >
                Number of People
              </label>
              <input
                type="number"
                id="number-of-people"
                value={numberOfPeople || ""}
                placeholder="0"
                onChange={handleNumberOfPeopleChange}
                // TODO: change scheme when bill is > 0 and number is === 0
                className="input-tc text-tc-very-dark-cyan"
              />
            </div>
          </form>
        </section>
        <section className="mb mx-6 my-8 rounded-2xl bg-tc-very-dark-cyan px-6 py-11">
          <div>
            <h2 className="flex w-full justify-between">
              <div className="block">Tip Amount</div>
              <span className="block">${tip.toFixed(2)}</span>
            </h2>
            <p>/ person</p>
          </div>
          <div>
            <h2 className="flex w-full justify-between">
              <div className="block">Total</div>
              <span className="block">${total.toFixed(2)}</span>
            </h2>
            <p>/ person</p>
          </div>
          <button
            onClick={reset}
            className="bg-tc-strong-cyan text-tc-very-dark-cyan"
          >
            Reset
          </button>
        </section>
      </div>
    </main>
  );
}
