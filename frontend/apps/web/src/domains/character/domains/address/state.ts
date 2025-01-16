import {
  FormStateFromEntity,
  Form,
  Unit,
  StringForm,
  FormLabel,
  PromiseRepo,
  Predicate,
  SharedFormState,
} from "ballerina-core/main";
import { PersonFieldViews } from "../../../person/views/field-views";
import { validate } from "../validation";
import { OrderedMap } from "immutable";
import { CharacterFormPredicateContext } from "../predicates";

export interface Address {
  street: string;
  number: string;
  city: string;
}

export const AddressDefault = (): Address => ({
  street: "Crossing Street",
  number: "23",
  city: "Telde",
});

export const Address = {
  Default: AddressDefault(),
  Operations: {
    VisibleFields: OrderedMap<
      keyof Address,
      Predicate<CharacterFormPredicateContext>
    >([
      ["city", CharacterFormPredicateContext.Predicates.True],
      ["street", CharacterFormPredicateContext.Predicates.True],
      ["number", CharacterFormPredicateContext.Predicates.True],
    ]),
  },
};

export type AddressFormState = FormStateFromEntity<Address, {}>;

export const AddressFormState = {
  Default: (): AddressFormState => ({
    ...SharedFormState.Default(),
    city: SharedFormState.Default(),
    street: SharedFormState.Default(),
    number: SharedFormState.Default(),
  }),
};

export const AddressFormBuilder = Form<
  Address,
  AddressFormState,
  CharacterFormPredicateContext,
  Unit
>().Default<keyof Address>();

export const AddressFormConfig = AddressFormBuilder.config({
  street: StringForm<CharacterFormPredicateContext & FormLabel, Unit>((value) =>
    PromiseRepo.Default.mock(validate.lengthOf(value).isGreaterThan(3))
  )
    .withView(PersonFieldViews.StringView())
    .mapContext((context) => ({ ...context, label: "street" })),

  number: StringForm<CharacterFormPredicateContext & FormLabel, Unit>((value) =>
    PromiseRepo.Default.mock(validate.lengthOf(value).isGreaterThan(1))
  )
    .withView(PersonFieldViews.StringView())
    .mapContext((context) => ({ ...context, label: "number" })),

  city: StringForm<CharacterFormPredicateContext & FormLabel, Unit>((value) =>
    PromiseRepo.Default.mock(validate.lengthOf(value).isGreaterThan(3))
  )
    .withView(PersonFieldViews.StringView())
    .mapContext((context) => ({ ...context, label: "city" })),
});

export const AddressForm = AddressFormBuilder.template(AddressFormConfig);
