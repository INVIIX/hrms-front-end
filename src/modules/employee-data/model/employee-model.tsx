export type TfieldEmployee = {
  id: number;
  name: string;
  email: string;
  phone: string;
  nip: string;
  avatar: null;
  type: string;
  status: string;
  bank_name: string;
  bank_account: string;
  profile: Tprofile;
};

type Tprofile = {
  name: string;
  nik: string;
  npwp: string;
  bpjs_kesehatan: string;
  bpjs_ketenagakerjaan: string;
  place_of_birth: string;
  date_of_birth: string;
  gender: string;
  marital_status: string;
  citizenship: string;
  legal_address: string;
  residential_address: string;
};

export type TfieldEducation = {
  id: number;
  degree: string;
  major: string;
  institution_name: string;
  enrollment_year: string;
  graduation_year: string;
  gpa: number;
};

export type TfieldTrainings = {
  id: number;
  training_name: string;
  training_start_date: string;
  training_end_date: string;
  certificate_name: string;
  certificate_path: string;
  certificate_url: string;
  notes: string;
};

export type TfieldSalary = {
  id: number;

  component: component;

  amount: string;
};

type component = {
  id: 0;

  name: string;

  type: string;

  description: string;
};
