import * as Yup from "yup";

export const BlogDetailCommentSchema=Yup.object({
    textarea: Yup.string()
        .max(200,"Must be exactly 200 character.")
        .matches(/^[a-zA-Z0-9,.!? ]*$/, "Invalid characters used."),
});
