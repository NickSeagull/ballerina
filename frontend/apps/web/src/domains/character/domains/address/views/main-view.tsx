import { EntityFormView, unit, Unit } from "ballerina-core/main";
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

export const AddressView: AddressView = (props) => {
  const field = (key: keyof Address) =>
    props.EmbeddedFields[key]({
      ...props,
      context: { ...props.context, disabled: false },
      view: unit,
    });
  return (
    <>
      <h3>Address</h3>
      {field("street")}
      {field("number")}
      {field("city")}
      <MostUglyValidationDebugView {...props} />
    </>
  );
};
