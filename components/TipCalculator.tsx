"use client";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function TipCalculator() {
  const [bill, setBill] = useState<number>(0);
  const [tipPercentage, setTipPercentage] = useState<number>(0);
  const [numberOfPeople, setNumberOfPeople] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState<string | number>("");
  const [tip, setTip] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const calculateTip = useCallback(() => {
    if (numberOfPeople && numberOfPeople > 0) {
      const tipAmount = (bill * (tipPercentage / 100)) / numberOfPeople;
      const totalAmount =
        (bill + bill * (tipPercentage / 100)) / numberOfPeople;
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
    setBill(parseFloat(e.target.value) || 0);
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
      <div className=" bg-tc-white">
        <section className="px-8 py-10">
          <form onSubmit={(e) => e.preventDefault}>
            <div className="flex flex-col">
              <label
                htmlFor="bill"
                className="text-[1rem] text-tc-grayish-cyan"
              >
                Bill
              </label>
              <input
                type="number"
                value={bill}
                onChange={handleBillChange}
                className="bg-tc-very-light-grayish"
                id="bill"
              />
            </div>
            <div className="grid grid-cols-2">
              <label htmlFor="tip" className="col-span-2">
                Select Tip %
              </label>
              {[5, 10, 15, 25, 50].map((percentage) => (
                <button
                  type="button"
                  id="tip"
                  key={percentage}
                  onClick={() => handleTipPercentageChange(percentage)}
                >
                  {percentage}%
                </button>
              ))}
              <input
                type="text"
                id="custom"
                placeholder="Custom"
                // value={customTip}
                value={customTip === 0 ? "Custom" : customTip}
                onChange={handleCustomTipChange}
                className="rounded border"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="number-of-people">Number of People</label>
              <input
                type="text"
                id="number-of-people"
                value={numberOfPeople || ""}
                onChange={handleNumberOfPeopleChange}
                className="rounded border"
              />
            </div>
          </form>
        </section>
        <section className="w-full bg-tc-very-dark-cyan px-9 py-11">
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
