import { EntityFormView, Unit } from "ballerina-core/main";
import { Address, AddressFormState } from "../state";
import { MostUglyValidationDebugView } from "../../../../person/views/field-views";
import { CharacterFormPredicateContext } from "../../predicates";

export type AddressView = EntityFormView<
  Address,
  keyof Address,
  AddressFormState,
  CharacterFormPredicateContext,
  Unit
>;

export const AddressView: AddressView = (props) => (
  <>
    <h2>My Address</h2>
    <MostUglyValidationDebugView {...props} />
  </>
);
