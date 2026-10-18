import { AUTOCOMPLETE_MODELS, DEFAULT_AUTOCOMPLETE_MODEL, getAutocompleteModel } from "../../../../src/shared/autocomplete-models"
import type { EnrichedModel } from "../../context/provider"

/**
 * Resolve the (provider, model) pair to the dropdown's value. Returns
 * the DEFAULT_AUTOCOMPLETE_MODEL as a sensible fallback when neither is
 * set, so the selector does not render an ambiguous "Not set" state.
 * Users can still clear to explicit null via the clear button; the runtime
 * resolves unset values to DEFAULT_AUTOCOMPLETE_MODEL separately.
 */
export function getAutocompleteSelection(provider?: string, modelID?: string) {
  if (!provider && !modelID) {
    return { providerID: DEFAULT_AUTOCOMPLETE_MODEL.providerID, modelID: DEFAULT_AUTOCOMPLETE_MODEL.modelID }
  }
  const model = getAutocompleteModel(provider, modelID)
  return { providerID: model.providerID, modelID: model.modelID }
}

export const AUTOCOMPLETE_SELECTOR_MODELS: EnrichedModel[] = AUTOCOMPLETE_MODELS.map((m) => ({
  id: m.modelID,
  name: m.label,
  providerID: m.providerID,
  providerName: m.provider,
}))
