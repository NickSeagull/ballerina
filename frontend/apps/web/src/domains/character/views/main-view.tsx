import { EntityFormView, unit, Unit } from "ballerina-core/main";
import { Character, CharacterFormState } from "../state";
import { CharacterFormPredicateContext } from "../domains/predicates";
import { MostUglyValidationDebugView } from "../../person/views/field-views";
import {
  Address,
  AddressForm,
  AddressFormState,
} from "../domains/address/state";
import { OrderedMap } from "immutable";
import { AddressView } from "../domains/address/views/main-view";
import { useState } from "react";

export type CharacterView = EntityFormView<
  Character,
  keyof Character,
  CharacterFormState,
  CharacterFormPredicateContext,
  Unit
>;

export const CharacterView: CharacterView = (props) => {
  const [editMode, setEditMode] = useState(false);
  const editClass = !editMode ? "not-editing" : "";
  const person = props.context.value;
  const field = (key: keyof Character) =>
    props.EmbeddedFields[key]({
      ...props,
      context: { ...props.context, disabled: false },
      view: unit,
    });
  return (
    <div className="test-character">
      <div className="test-preview-card">
        <button onClick={() => setEditMode(!editMode)}>Edit</button>
        <p>
          <b>Name:</b> {person.name} {person.surname}
        </p>
        <p>
          <b>Age:</b> {person.age}
        </p>
        <p>
          <b>Address:</b>
          <p>
            {person.address.street}, {person.address.number}
          </p>
          <p>{person.address.city}</p>
        </p>
      </div>
      <div className={`test-edit-card ${editClass}`}>
        <div className="test-edit-character">
          {field("name")}
          {field("surname")}
          {field("age")}
        </div>
        <div className="test-edit-address">{field("address")}</div>
      </div>
    </div>
  );
};
