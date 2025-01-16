import { EntityFormView, Unit } from "ballerina-core/main";
import { Character, CharacterFormState } from "../state";
import { CharacterFormPredicateContext } from "../domains/predicates";
import { MostUglyValidationDebugView } from "../../person/views/field-views";

export type CharacterView = EntityFormView<
  Character,
  keyof Character,
  CharacterFormState,
  CharacterFormPredicateContext,
  Unit
>;

export const CharacterView: CharacterView = (props) => (
  <>
    <h2>My Character</h2>
    {JSON.stringify(props.context.value)}
  </>
);
