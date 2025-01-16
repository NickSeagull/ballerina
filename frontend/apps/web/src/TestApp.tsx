import { useState } from "react";
import {
  CharacterForm,
  CharacterFormState,
  CharacterState,
} from "./domains/character/state";
import { OrderedMap } from "immutable";
import { CharacterView } from "./domains/character/views/main-view";

const TestApp = () => {
  const [characterFormState, setCharacterFormState] = useState(
    CharacterFormState.Default()
  );
  const [characterState, setCharacterState] = useState(CharacterState.Default);
  return (
    <div className="TestApp">
      <h1>Trying out Ballerina! 🩰</h1>
      <CharacterForm
        context={{
          ...characterFormState,
          value: characterState,
          showAllErrors: true,
          visibleFields: CharacterState.Operations.VisibleFields,
          disabledFields: OrderedMap(),
        }}
        setState={setCharacterFormState}
        view={CharacterView}
        foreignMutations={{
          onChange: setCharacterState,
        }}
      />
    </div>
  );
};

export default TestApp;
