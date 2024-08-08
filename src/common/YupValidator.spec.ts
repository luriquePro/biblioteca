import { AppError } from "../shared/errors/AppError";
import { YupValidator } from "./YupValidator";
import * as yup from "yup";

describe("YupValidator", () => {
  test("Deve-se validar os dados com sucesso", async () => {
    const result = await YupValidator({ property: yup.string().required() }, { property: "value" });
    expect(result).toBeUndefined();
  });

  test("Deve-se lançar um erro caso os dados sejam inválidos", async () => {
    await expect(YupValidator({ property: yup.string().required() }, {})).rejects.toThrow(new AppError("property is a required field"));
  });
});
