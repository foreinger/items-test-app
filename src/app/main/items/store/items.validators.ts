import {updateGroup, validate} from "ngrx-forms";
import {required} from "ngrx-forms/validation";
import {ItemForm} from "../types/item.types";

export const itemFormValidator = updateGroup<ItemForm>({
  name: validate(required),
  type: validate(required),
});


