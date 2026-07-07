// Stan flow zwrotu trzymany w sessionStorage (MVP - bez logowania).
import type { OrderLookup, CreatedReturn } from './api';

export interface FlowState {
  email: string;
  order: OrderLookup | null;
  selectedSkus: string[];
  reason: string | null;
  reasonComment: string;
  pudoPointId: string | null;
  pudoPointLabel: string | null;
  created: CreatedReturn | null;
}

const KEY = 'meest-returns-flow';

export function getFlow(): FlowState {
  if (typeof window === 'undefined') return emptyFlow();
  try {
    return { ...emptyFlow(), ...JSON.parse(sessionStorage.getItem(KEY) ?? '{}') };
  } catch {
    return emptyFlow();
  }
}

export function setFlow(patch: Partial<FlowState>): FlowState {
  const next = { ...getFlow(), ...patch };
  sessionStorage.setItem(KEY, JSON.stringify(next));
  return next;
}

export function emptyFlow(): FlowState {
  return { email: '', order: null, selectedSkus: [], reason: null, reasonComment: '', pudoPointId: null, pudoPointLabel: null, created: null };
}
