// Proposed Formula
// Monthly Payment Calculation:
// Monthly Payment
// =
// Initial Cost
// Duration
// ×
// Interest Rate
// Monthly Payment=
// Duration
// Initial Cost
// ​
//  ×Interest Rate
// Interest rates adjust slightly based on duration.
// Final Buy Option:
// A percentage of the initial cost which decreases as the duration increases.
// Here, I will choose an interest rate that varies inversely with the duration:

// For 36 months: 1.03 (3%)
// For 48 months: 1.02 (2%)
// For 60 months: 1.01 (1%)
// The final buy option will be:

// For 36 months: 10% of initial cost
// For 48 months: 10% of initial cost
// For 60 months: 7% of initial cost

enum Duration {
  ThirtySix = 36,
  FortyEight = 48,
  Sixty = 60,
}

interface LeasingResult {
  total: number;
  monthly: number;
  finalBuyOption: number;
}

export function calculateLeasing(
  cost: number,
  duration: Duration = Duration.ThirtySix
): LeasingResult {
  let interestRate;
  let finalBuyPercentage;

  switch (duration) {
    case Duration.ThirtySix:
      interestRate = 1.03;
      finalBuyPercentage = 0.1;
      break;
    case Duration.FortyEight:
      interestRate = 1.02;
      finalBuyPercentage = 0.1;
      break;
    case Duration.Sixty:
      interestRate = 1.01;
      finalBuyPercentage = 0.07;
      break;
    default:
      throw new Error("Invalid duration");
  }

  const monthly = (cost * interestRate) / duration;
  const total = monthly * duration;
  const finalBuyOption = cost * finalBuyPercentage;

  return {
    total: parseFloat(total.toFixed(2)),
    monthly: parseFloat(monthly.toFixed(2)),
    finalBuyOption: parseFloat(finalBuyOption.toFixed(2)),
  };
}
