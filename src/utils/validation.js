import * as yup from "yup";

export const customerSchema = yup.object({
  name: yup.string().trim().min(2).required("Customer name is required."),
  industry: yup.string().trim().required("Industry is required."),
  region: yup.string().trim().required("Region is required."),
  contactName: yup.string().trim().required("Primary contact is required."),
  contactEmail: yup.string().trim().email("Enter a valid email.").required("Contact email is required."),
  phone: yup.string().trim().required("Phone number is required."),
  annualValue: yup.number().typeError("Annual value must be a number.").min(0).required("Annual value is required."),
  renewalDate: yup.string().required("Renewal date is required."),
  healthScore: yup.number().typeError("Health score must be a number.").min(0).max(100).required("Health score is required."),
  satisfaction: yup.number().typeError("Satisfaction must be a number.").min(0).max(5).required("Satisfaction is required."),
  accountPlan: yup.string().trim().required("Account plan is required."),
  notes: yup.string().trim().required("Notes are required.")
});

export const opportunitySchema = yup.object({
  name: yup.string().trim().min(4).required("Opportunity name is required."),
  customerId: yup.string().required("Customer selection is required."),
  value: yup.number().typeError("Deal value must be numeric.").min(1).required("Deal value is required."),
  probability: yup.number().typeError("Probability must be numeric.").min(0).max(100).required("Probability is required."),
  expectedClose: yup.string().required("Expected close date is required."),
  region: yup.string().trim().required("Region is required."),
  source: yup.string().trim().required("Lead source is required."),
  stage: yup.string().required("Stage is required.")
});

export const activitySchema = yup.object({
  title: yup.string().trim().min(4).required("Title is required."),
  type: yup.string().required("Activity type is required."),
  customerId: yup.string().required("Customer selection is required."),
  dueDate: yup.string().required("Due date is required."),
  outcome: yup.string().required("Outcome is required."),
  note: yup.string().trim().min(8).required("Notes are required.")
});

export async function validateForm(schema, payload) {
  try {
    const values = await schema.validate(payload, { abortEarly: false, stripUnknown: true });
    return { values, errors: {} };
  } catch (error) {
    const errors = error.inner.reduce((accumulator, item) => {
      if (!accumulator[item.path]) {
        accumulator[item.path] = item.message;
      }
      return accumulator;
    }, {});

    return { values: null, errors };
  }
}
