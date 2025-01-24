import z from "zod";

export const schemaConfirm = z.object({
  email: z.string().email(),
  name: z.string().min(10, "Por favor ingrese un nombre y apellido"),
  confirm: z.string(),
});

export const validate = (schema) => (req, res, next) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    if (error) {
      return res.status(400).json(
        error.issues.map((issu) => ({
          issue: issu.message,
          path: issu.path,
        }))
      );
    }

    return res.status(500).json({ error: "Internal server error" });
  }
  return;
};
