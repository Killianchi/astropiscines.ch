import type { PoolType, SizeCategory, Region, Location, Timeline, ExtraId } from '../../data/pricing';

export interface ConfigState {
  currentStep: number;
  region: Region | null;
  poolType: PoolType | null;
  location: Location | null;
  size: SizeCategory | 'custom' | null;
  customLength: number;
  customWidth: number;
  customDepth: number;
  extras: ExtraId[];
  timeline: Timeline | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  isSubmitted: boolean;
  isRevealing: boolean;
  quote: { min: number; max: number } | null;
}

export type ConfigAction =
  | { type: 'SET_REGION'; payload: Region }
  | { type: 'SET_POOL_TYPE'; payload: PoolType }
  | { type: 'SET_LOCATION'; payload: Location }
  | { type: 'SET_SIZE'; payload: SizeCategory | 'custom' }
  | { type: 'SET_CUSTOM_LENGTH'; payload: number }
  | { type: 'SET_CUSTOM_WIDTH'; payload: number }
  | { type: 'SET_CUSTOM_DEPTH'; payload: number }
  | { type: 'TOGGLE_EXTRA'; payload: ExtraId }
  | { type: 'SET_TIMELINE'; payload: Timeline }
  | { type: 'SET_CONTACT_NAME'; payload: string }
  | { type: 'SET_CONTACT_EMAIL'; payload: string }
  | { type: 'SET_CONTACT_PHONE'; payload: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SUBMIT'; payload: { min: number; max: number } }
  | { type: 'FINISH_REVEAL' }
  | { type: 'RESET' };

export const initialState: ConfigState = {
  currentStep: 1,
  region: null,
  poolType: null,
  location: null,
  size: null,
  customLength: 8,
  customWidth: 4,
  customDepth: 1.5,
  extras: [],
  timeline: null,
  contactName: '',
  contactEmail: '',
  contactPhone: '',
  isSubmitted: false,
  isRevealing: false,
  quote: null,
};

export function configReducer(state: ConfigState, action: ConfigAction): ConfigState {
  switch (action.type) {
    case 'SET_REGION': return { ...state, region: action.payload };
    case 'SET_POOL_TYPE': return { ...state, poolType: action.payload };
    case 'SET_LOCATION': return { ...state, location: action.payload };
    case 'SET_SIZE': return { ...state, size: action.payload };
    case 'SET_CUSTOM_LENGTH': return { ...state, customLength: action.payload };
    case 'SET_CUSTOM_WIDTH': return { ...state, customWidth: action.payload };
    case 'SET_CUSTOM_DEPTH': return { ...state, customDepth: action.payload };
    case 'TOGGLE_EXTRA': {
      const extras = state.extras.includes(action.payload)
        ? state.extras.filter((e) => e !== action.payload)
        : [...state.extras, action.payload];
      return { ...state, extras };
    }
    case 'SET_TIMELINE': return { ...state, timeline: action.payload };
    case 'SET_CONTACT_NAME': return { ...state, contactName: action.payload };
    case 'SET_CONTACT_EMAIL': return { ...state, contactEmail: action.payload };
    case 'SET_CONTACT_PHONE': return { ...state, contactPhone: action.payload };
    case 'NEXT_STEP': return { ...state, currentStep: Math.min(state.currentStep + 1, 7) };
    case 'PREV_STEP': return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };
    case 'SUBMIT': return { ...state, isSubmitted: true, isRevealing: true, quote: action.payload };
    case 'FINISH_REVEAL': return { ...state, isRevealing: false };
    case 'RESET': return initialState;
    default: return state;
  }
}
