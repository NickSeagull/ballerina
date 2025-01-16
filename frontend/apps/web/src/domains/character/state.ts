import {
  Form,
  FormLabel,
  FormStateFromEntity,
  NumberForm,
  Predicate,
  PromiseRepo,
  SharedFormState,
  simpleUpdater,
  StringForm,
  Unit,
} from "ballerina-core";
import { PersonFieldViews } from "../person/views/field-views";
import {
  Address,
  AddressDefault,
  AddressForm,
  AddressFormState,
} from "./domains/address/state";
import { validate } from "./domains/validation";
import { AddressView } from "./domains/address/views/main-view";
import { OrderedMap } from "immutable";
import { CharacterFormPredicateContext } from "./domains/predicates";

export interface CharacterContext {
  verified: boolean;
}

export interface Character {
  name: string;
  surname: string;
  age: number;
  address: Address;
}

const CharacterDefault = (): Character => ({
  name: "Jane",
  surname: "Doe",
  age: 42,
  address: AddressDefault(),
});

export type CharacterFormState = FormStateFromEntity<
  Character,
  {
    address: AddressFormState;
  }
>;

export const CharacterFormState = {
  Default: (): CharacterFormState => ({
    ...SharedFormState.Default(),
    name: SharedFormState.Default(),
    surname: SharedFormState.Default(),
    age: SharedFormState.Default(),
    address: AddressFormState.Default(),
  }),
};

export const CharacterFormBuilder = Form<
  Character,
  CharacterFormState,
  CharacterFormPredicateContext & {},
  Unit
>().Default<keyof Character>();

export const CharacterForm = CharacterFormBuilder.template({
  name: StringForm<CharacterFormPredicateContext & FormLabel, Unit>((value) =>
    PromiseRepo.Default.mock(validate.lengthOf(value).isGreaterThan(1))
  )
    .withView(PersonFieldViews.StringView())
    .mapContext((context) => ({ ...context, label: "name" })),

  surname: StringForm<CharacterFormPredicateContext & FormLabel, Unit>(
    (value) =>
      PromiseRepo.Default.mock(validate.lengthOf(value).isGreaterThan(1))
  )
    .withView(PersonFieldViews.StringView())
    .mapContext((context) => ({ ...context, label: "surname" })),

  age: NumberForm<CharacterFormPredicateContext & FormLabel, Unit>((value) =>
    PromiseRepo.Default.mock(validate.number(value).isPositive())
  )
    .withView(PersonFieldViews.NumberView())
    .mapContext((context) => ({ ...context, label: "age" })),

  address: AddressForm.withView(AddressView).mapContext((context) => ({
    ...context,
    visibleFields: Address.Operations.VisibleFields,
    disabledFields: OrderedMap(),
  })),
});

export const CharacterState = {
  Default: CharacterDefault(),
  Updaters: {
    ...simpleUpdater<Character>()("name"),
    ...simpleUpdater<Character>()("surname"),
    ...simpleUpdater<Character>()("age"),
    ...simpleUpdater<Character>()("address"),
  },
  Operations: {
    VisibleFields: OrderedMap<
      keyof Character,
      Predicate<CharacterFormPredicateContext>
    >([
      ["name", CharacterFormPredicateContext.Predicates.True],
      ["surname", CharacterFormPredicateContext.Predicates.True],
      ["age", CharacterFormPredicateContext.Predicates.True],
      ["address", CharacterFormPredicateContext.Predicates.True],
    ]),
  },
};
