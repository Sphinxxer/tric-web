export const FORM_DEFINITIONS = {
  summer: {
    type: "summer",
    title: "Summer Class Application",
    eyebrow: "3-month summer program",
    description:
      "Best for students joining the 3-month summer swimming program.",
    submitLabel: "Submit Summer Application",
    successMessage:
      "Your summer class application has been recorded in demo mode. Backend connection will be added after frontend approval.",
    consentLabel:
      "I confirm that the information provided is accurate and agree to be contacted by TRIC Sports Academy regarding this application.",
    sections: [
      {
        title: "Student Details",
        fields: ["studentName", "dateOfBirth", "age", "gender"],
      },
      {
        title: "Student Photo",
        fields: ["studentPhoto"],
      },
      {
        title: "Parent / Guardian Details",
        fields: ["parentName", "parentPhone", "whatsappNumber", "address"],
      },
      {
        title: "Swimming Details",
        fields: ["swimmingExperience", "preferredBatchTiming"],
      },
      {
        title: "Health & Emergency",
        fields: [
          "medicalConditions",
          "emergencyContactName",
          "emergencyContactNumber",
        ],
      },
      {
        title: "Consent",
        fields: ["consent"],
      },
    ],
  },
  membership: {
    type: "membership",
    title: "Membership Application",
    eyebrow: "monthly / regular membership",
    description: "Best for regular swimmers and monthly training.",
    submitLabel: "Submit Membership Application",
    successMessage:
      "Your membership application has been recorded in demo mode. Backend connection will be added after frontend approval.",
    consentLabel:
      "I confirm that the information provided is accurate and agree to be contacted by TRIC Sports Academy regarding this membership application.",
    sections: [
      {
        title: "Member Details",
        fields: ["memberName", "dateOfBirth", "age", "gender"],
      },
      {
        title: "Contact Details",
        fields: ["phone", "whatsappNumber", "address"],
      },
      {
        title: "Membership Preferences",
        fields: ["membershipType", "preferredTiming", "swimmingExperience"],
      },
      {
        title: "Health & Emergency",
        fields: [
          "medicalConditions",
          "emergencyContactName",
          "emergencyContactNumber",
        ],
      },
      {
        title: "Consent",
        fields: ["consent"],
      },
    ],
  },
  hourly: {
    type: "hourly",
    title: "Hourly Access Enquiry",
    eyebrow: "hourly pool access",
    description: "Best for practice, trial visits, and casual swimming enquiries.",
    submitLabel: "Send Hourly Enquiry",
    successMessage:
      "Your hourly access enquiry has been recorded in demo mode. Backend connection will be added after frontend approval.",
    consentLabel:
      "I agree to be contacted by TRIC Sports Academy regarding this enquiry.",
    sections: [
      {
        title: "Contact Details",
        fields: ["name", "phone", "whatsappNumber"],
      },
      {
        title: "Visit Details",
        fields: ["preferredDate", "preferredTime", "numberOfPeople", "purpose"],
      },
      {
        title: "Message",
        fields: ["message"],
      },
      {
        title: "Consent",
        fields: ["consent"],
      },
    ],
  },
};
