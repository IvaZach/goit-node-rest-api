import { HttpError } from "./index.js";

const notFoundResult = (result) => {
    if (!result) {
      throw HttpError(404, `Not found`);
    }
  };

  export default notFoundResult;