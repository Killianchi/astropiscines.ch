import {
  poolTypes,
  sizeMultipliers,
  indoorPremium,
  regionAdjustment,
  extras as extrasData,
  type PoolType,
  type SizeCategory,
  type Region,
  type Location,
  type ExtraId,
} from '../data/pricing';

interface QuoteInput {
  poolType: PoolType;
  size: SizeCategory | 'custom';
  customArea?: number;
  location: Location;
  region: Region;
  extras: ExtraId[];
}

interface QuoteResult {
  min: number;
  max: number;
}

function getSizeMultiplier(size: SizeCategory | 'custom', customArea?: number) {
  if (size === 'custom' && customArea) {
    if (customArea <= 25) return sizeMultipliers.small;
    if (customArea <= 50) return sizeMultipliers.medium;
    return sizeMultipliers.large;
  }
  return sizeMultipliers[size as SizeCategory] ?? sizeMultipliers.medium;
}

function roundToNearest(value: number, nearest: number): number {
  return Math.round(value / nearest) * nearest;
}

export function calculateQuote(input: QuoteInput): QuoteResult {
  const base = poolTypes[input.poolType];
  const size = getSizeMultiplier(input.size, input.customArea);

  let min = base.baseMin * size.min;
  let max = base.baseMax * size.max;

  if (input.location === 'interieure') {
    min *= indoorPremium.min;
    max *= indoorPremium.max;
  }

  const extrasTotal = input.extras.reduce((sum, id) => {
    const extra = extrasData.find((e) => e.id === id);
    return sum + (extra?.price ?? 0);
  }, 0);

  min += extrasTotal;
  max += extrasTotal;

  const regionMultiplier = regionAdjustment[input.region];
  min *= regionMultiplier;
  max *= regionMultiplier;

  return {
    min: roundToNearest(min, 1000),
    max: roundToNearest(max, 1000),
  };
}
