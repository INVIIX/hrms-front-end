import { FieldType } from "@/components/ui/form-modal";
import apiClient from "@/lib/apiClient";
import { EnumItem } from "@/lib/enumClass";
import { useQueries, UseQueryResult } from '@tanstack/react-query';
import { date } from "zod";
import { FieldTypeEmployee } from "../ui/employee-form";

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
  date_of_birth: Date;
  gender: string;
  marital_status: string;
  citizenship: string;
  legal_address: string;
  residential_address: string;
  religion: string
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

  amount: number;
};

type component = {
  id: number;

  name: string;

  type: string;

  description: string;
};

type position = {
  id: number;

  name: string;

  level: string;

};
type group = {
  id: number;

  name: string;

  depth: string;

  parent: TfieldEmployee

  children: TfieldEmployee[]

};



export type TfieldsContact = {
  id: number;
  name: string;
  relationship: string;
  date_of_birth: string;
  ccupation: string;
  phone: string;
  is_dependant: boolean;
  is_emergency_contact: boolean;
};

export type TfieldEmployment = {
  id: number;
  employee: TfieldEmployee;
  line_manager: TfieldEmployee;
  position: position;
  group: group;
  start_date: string,
  end_date: string,
  location: string,
  contract_document_number: string,
  employment_document_number: string,
  type: string,
  status: string,
  notes: string

};

export const useShowData = (
  endPoint: string
): [UseQueryResult<TfieldEmployee>, UseQueryResult<TfieldsContact[]>, UseQueryResult<TfieldEmployment>] => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['employee', endPoint],
        queryFn: async (): Promise<TfieldEmployee> => {
          const response = await apiClient.get(`${endPoint}`);
          return response.data.data;
        },
      },
      {
        queryKey: ['contacts', endPoint],
        queryFn: async (): Promise<TfieldsContact[]> => {
          const response = await apiClient.get(`${endPoint}/contacts`);
          return response.data.data;
        },
      },
      {
        queryKey: ['employment', endPoint],
        queryFn: async (): Promise<TfieldEmployment> => {
          const response = await apiClient.get(`${endPoint}/employments`);
          return response.data.data;
        },
      },
    ],
  });

  return results as [
    UseQueryResult<TfieldEmployee>,
    UseQueryResult<TfieldsContact[]>,
    UseQueryResult<TfieldEmployment>
  ];
};
export type OptionsType = {
  employee_type: EnumItem[];
  gender: EnumItem[];
  employee_status: EnumItem[];
  marital_status: EnumItem[];
  citizenship: EnumItem[];
  degree: EnumItem[];
  religion: EnumItem[];
  relationship: EnumItem[];
  // tambahin kalau ada enum lain
} | null;


export const contactsField = (options: OptionsType): FieldTypeEmployee[] => [
  { name: "name", label: "Nama", required: true },

  { name: "relationship", label: "Hubungan", required: true, type: "select", options: options?.relationship },
  {
    name: "date_of_birth",
    label: "Tanggal Lahir",
    required: true,
    type: "date",

  },
  {
    name: "occupation",
    label: "Pekerjaan",
    required: true,
  },
  { name: "phone", label: "No. Telpon", required: true },
  {
    name: "is_dependant", label: "Tanggungan", required: true, type: "boolean",
    defaultValue: "true"
  },
  {
    name: "is_emergency_contact", label: "Kontak Darurat", required: true, type: "boolean",
    defaultValue: true
  },
];

export const educationField = (options: OptionsType): FieldType[] => [
  { name: "institution_name", label: "School", required: true },
  {
    name: "degree",
    label: "Degree",
    type: "select",
    required: true,
    options: options?.degree,
  },
  { name: "major", label: "Field of Study", required: true },
  {
    name: "enrollment_year",
    label: "Start Date",
    required: true,
    type: "number",
  },
  {
    name: "graduation_year",
    label: "End Date",
    required: true,
    type: "number",
  },
  { name: "gpa", label: "Grade", required: true },
];


export const profielField = (options: OptionsType): FieldTypeEmployee[] => [
  // --- level atas ---
  { name: "name", label: "Username", required: true },
  { name: "profile.name", label: "Nama Lengkap", required: true },
  { name: "email", label: "Email", required: true },
  { name: "phone", label: "No. Telepon", required: true },
  { name: "nip", label: "NIP", required: false },
  { name: "avatar", label: "Avatar URL", required: false },
  {
    name: "type",
    label: "Jenis Karyawan",
    type: "select",
    required: true,
    options: options?.employee_type,
  },
  {
    name: "status",
    label: "Status Kepegawaian",
    type: "select",
    required: true,
    options: options?.employee_status,
  },
  { name: "bank_name", label: "Bank Name", required: false },
  { name: "bank_account", label: "Bank Account", required: false },

  // --- profile (nested) ---
  { name: "profile.nik", label: "NIK", required: true },
  { name: "profile.npwp", label: "NPWP", required: false },
  {
    name: "profile.bpjs_kesehatan",
    label: "BPJS Kesehatan",
    required: false,
  },
  {
    name: "profile.bpjs_ketenagakerjaan",
    label: "BPJS Ketenagakerjaan",
    required: false,
  },
  { name: "profile.place_of_birth", label: "Place of Birth", required: true },
  {
    name: "profile.date_of_birth",
    label: "Date of Birth",
    type: "date",
    required: true,
  },
  {
    name: "hire_date",
    label: "Hire Date",
    type: "date",
    required: true,
  },
  {
    name: "profile.gender",
    label: "Gender",
    type: "select",
    required: true,
    options: options?.gender,
  },
  {
    name: "profile.marital_status",
    label: "Marital Status",
    type: "select",
    required: true,
    options: options?.marital_status,
  },
  {
    name: "profile.citizenship",
    label: "Citizenship",
    type: "select",
    required: true,
    options: options?.citizenship,
  },

  { name: "profile.legal_address", label: "Legal Address", type: "textarea" },
  {
    name: "profile.residential_address",
    label: "Residential Address",
    type: "textarea",
  },
];