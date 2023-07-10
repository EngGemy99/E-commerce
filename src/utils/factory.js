import { ErrorMessage } from "./ErrorMessage.js";
import { catchError } from "./catchAsyncError.js";

const deleteOne = (model) => {
  return catchError(async (request, response, next) => {
    let { id } = request.params;
    let result = await model.findByIdAndDelete(id);
    if (!result) {
      return next(ErrorMessage(404, `Document Not Found 😥`));
    }
    response.status(200).json({
      message: "Delete Successfully 🤝",
    });
  });
};

export { deleteOne };
