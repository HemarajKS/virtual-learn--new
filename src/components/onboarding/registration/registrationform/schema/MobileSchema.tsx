import * as Yup from "yup"
import 'yup-phone'
export const mobilenumberSchema = Yup.object({
   Mobilenumber: Yup.string().phone()
    .required()
});