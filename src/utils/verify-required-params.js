export function verifyRequiredParams(res, params) {
    let message = null;

    if (!params.title && !params.description) {
        message = "title and description are required";
    } else if (!params.title) {
        message = "title is required";
    } else if (!params.description) {
        message = "description is required";
    }

    return message;
}
