export const Gender = {
  MALE: "Male",
  FEMALE: "Female",
};

export const UserType = {
  PHYSICIAN: "Physician",
  PHARMACIST: "Pharmacist",
  ADMIN: "Admin",
  SUPERADMIN: "SuperAdmin",
  PATIENT: "Patient",
  CASHIER: "Cashier",
  BRANCHMANAGER: "BranchManager",
};

export const CertiStatus = {
  PAID: "Paid",
  REQUESTED: "Requested",
  PENDING: "Pending",
  DEBITED: "Debited",
};

export const Status = {
  ACTIVE: "Active",
  PENDING: "Pending",
  DISABLED: "Disabled",
  REQUESTED: "Requested",
  APPROVED: "Approved",
  DECLINED: "Declined",
  DEDUCTED: "Deducted",
};

export const ModalTypes = {
  FULL: "full",
  DRAWER: "drawer",
};

export const Titles = ["Mr.", "Mrs.", "Ms.", "Dr."];

export const colors = {
  primary: "#69151D",
  secondary: "#BB5D27",
  dark: "#4A413D",
};

export const MEMBERS = {
  gender: Gender.FEMALE,
  firstName: "",
  fathersName: "",
  grandFathersName: "",
  dateOfBirth: "",
  memberId: "",
  occupation: "",
  mobile: '',
  address: "",
};

export const AttachemntType = {
  CERTIFICATE: "CERTIFICATE",
  BALANCE: "BALANCE",
};

export const Regions = [
  "Addis Ababa",
  "Tigray",
  "Afar",
  "Amahara",
  "Oromia",
  "Somali",
  "Benishangul Gumz",
  "Centeral Ethiopia",
  "Gambela",
  "Harari",
  "Sidama",
  "South West Ethiopia",
  "South Ethiopia",
  "Dire Dawa",
];

export const CertificateTableHeaders = {
  head: [
    "fullname",
    "passport Number",
    "phone",
    "begin Date",
    "Destination",
    "certi. Number",
    "modify",
  ],
  row: [
    "fullname",
    "passportNumber",
    "phone",
    "bDate",
    "countryOfDestination",
    "certificateNumber",
  ],
};
