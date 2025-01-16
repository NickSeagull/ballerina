import { Predicate } from "ballerina-core";

export type CharacterFormPredicateContext = {
  showAllErrors: boolean;
};

export const CharacterFormPredicateContext = {
  Predicates: {
    True: Predicate((_: CharacterFormPredicateContext) => true),
    False: Predicate((_: CharacterFormPredicateContext) => false),
  },
};
