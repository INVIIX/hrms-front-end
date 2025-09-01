"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TitleHeader from "@/components/commons/title-header";
import { MdOutlineDataUsage } from "react-icons/md";
import apiClient from "@/lib/apiClient";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DocumentCard } from "@/components/ui/card-dokment";
import { EducationHistory } from "@/components/ui/card-education";
import {
  contactsField,
  educationField,
  OptionsType,
  profielField,
  TfieldEducation,
  TfieldEmployee,
  TfieldTrainings,
  useShowData,
} from "../model/employee-model";
// import { FieldType, FormModal } from "@/components/ui/form-modal";
import enumClass, { EnumItem } from "@/lib/enumClass";
import { errorValidation } from "@/lib/error-validation";
import { useQueries, useQuery } from "@tanstack/react-query";
import { TrainingCard } from "@/components/ui/card-training";
import SalaryCard from "@/components/ui/card-salary";
import { Profile } from "@/components/ui/card-profile";
import { FieldTypeEmployee, FormModal } from "../ui/employee-form";
import { boolean } from "zod";
import moment from "moment";
const EmployeeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const baseEndPoint = `employees/${id}`;
  const [data, setData] = useState<TfieldEmployee | null>(null);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<TfieldEducation | null>(null);
  const [profile, setProfile] = useState<TfieldEmployee | null>(null);
  const [forms, setForms] = useState<FieldTypeEmployee[]>([]);

  const [tabState, setTabState] = useState("overview");
  const [contentState, setContentState] = useState({});
  const [options, setOptions] = useState<OptionsType | null>(null);
  const [profileQuery, contactsQuery, employmentQuery] = useShowData(baseEndPoint);
  const content = {
    education: {
      type: "educational-backgrounds",
      apiEndPoint: `${baseEndPoint}/educational-backgrounds`
    },
    training: "trainings",
    salary_component: "salary-components",
    employee: {
      type: "employee",
      apiEndPoint: `employees`
    },
    contacts: {
      type: "contacts",
      apiEndPoint: `${baseEndPoint}/contacts`
    },
  };



  const { data: resultQuery } = useQuery({
    queryKey: [tabState],

    queryFn: async () => {

      if (tabState === "overview") {
        // setTabState("contacts")

        return []
      }

      const response = await apiClient.get(`${baseEndPoint}/${tabState}`);

      return response.data.data;
    },
  });

  const { data: enums } = useQuery({
    queryKey: ['enums'],

    queryFn: async () => {


      const response = await apiClient.get(`enums`);
      // console.log("aa")

      return response.data.data;
    },
  });


  useEffect(() => {
    // enumClass.getList("enums/degree").then(setOptions);
    // console.log(enums)
    setOptions(enums)
  }, [enums]);



  const handleSubmit = async (data: any, setError: any) => {
    console.log(data)
    const isEdit = !!editData;
    const method = isEdit ? "PUT" : "POST";
    const endpoint = isEdit
      ? `${contentState.apiEndPoint}/${data.id ?? id}`
      : `${contentState.apiEndPoint}`;

    if (data.is_dependant && data.is_emergency_contact) {
      data.is_dependant = normalizeValue(data.is_dependant, "boolean")
      data.is_emergency_contact = normalizeValue(data.is_emergency_contact, "boolean")
    }
    try {
      await apiClient({
        method,
        url: endpoint,
        data,

      });

      toast.success(`${isEdit ? "Edit" : "Create"} success`);
      setOpen(false);
      setEditData(null);
      // setRefreshKey((prev) => prev + 1);
      // onGenerateDataDetail(tabState);
    } catch (err) {
      const error = err as AxiosError;
      errorValidation(error, setError);
    }
  };
  function normalizeValue(value: any, type?: string) {
    if (type === "boolean") {
      return value === "true" || value === true;
    }
    if (type === "number") {
      return value !== "" ? Number(value) : null;
    }
    if (type === "date" && value) {
      return moment(value).format("YYYY-MM-DD");
    }
    return value;
  }

  const handleAction = (data: any, contents: {}) => {
    setEditData(data);
    // setContents(content)
    if (contents.type === content.employee.type) {
      setForms(profielField(options))


    } else if (contents.type === content.education.type) {
      // console.log(options)
      setForms(educationField(options))
    }
    else if (contents.type === content.contacts.type) {
      // console.log(options)
      setForms(contactsField(options))
    }

    console.log(data)
    setContentState(contents)
    setOpen(true);

  };

  return (
    <div className="w-full h-full flex flex-1 flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between">
        <div>
          <TitleHeader
            icon={<MdOutlineDataUsage className="w-4 h-4 text-blue-700" />}
            title="Employee Data"
            desc="Lorem ipsum dolor sit amet consectetur adipiscing elit."
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="overview"
        className="w-full"
        onValueChange={(val) => {
          setTabState(val);
        }}
      >
        <TabsList className="w-full grid grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>

          <TabsTrigger value={content.education.type}>Education History</TabsTrigger>
          <TabsTrigger value="documents">My Documents</TabsTrigger>
          <TabsTrigger value={content.training}>Training</TabsTrigger>
          <TabsTrigger value={content.salary_component}>Salary</TabsTrigger>
        </TabsList>

        {/* === Tab Overview === */}
        <TabsContent value="overview">
          <main className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Left: Personal Info */}
            {/* <Card className="p-4">
              <CardHeader className="flex justify-between items-center mt-3">
                <CardTitle>Informasi Pribadi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src="https://robohash.org/mail@ashallendesign.co.uk"
                      alt="profile"
                      className="w-20 h-20 rounded-full"
                    />
                    <h2 className="font-semibold">{profileQuery.data?.profile?.name}</h2>
                  </div>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">{profileQuery.data?.email}</p>
                  </div>
                  <div>
                    <p className="font-medium">No. Telp</p>
                    <p className="text-gray-600">{profileQuery.data?.phone}</p>
                  </div>
                  <div>
                    <p className="font-medium">Alamat</p>
                    <p className="text-gray-600">
                      {profileQuery.data?.profile?.legal_address}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Agama</p>
                    <p className="text-gray-600">{profileQuery.data?.profile?.religion}</p>
                  </div>
                  <div>
                    <p className="font-medium">Kewarganegaraan</p>
                    <p className="text-gray-600">
                      {profileQuery.data?.profile?.citizenship}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">Status Pernikahan</p>
                    <p className="text-gray-600">
                      {profileQuery.data?.profile?.marital_status}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
            <Profile

              employe={profileQuery.data}

              onEdit={(data) => {
                handleAction(data, content.employee)

              }}
            />

            {/* Middle: Job Detail */}
            <div className="space-y-4">
              <Card className="p-4">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Detail Pekerjaan</CardTitle>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div>
                      <p className="font-medium">Employee-ID</p>
                      <p className="text-gray-600">{employmentQuery.data?.employee?.nip}</p>
                    </div>
                    <div>
                      <p className="font-medium">Status</p>
                      <p className="text-green-600">{employmentQuery?.data?.employee?.status}</p>
                    </div>
                    <div>
                      <p className="font-medium">Posisi</p>
                      <p className="text-gray-600">{employmentQuery?.data?.position?.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Departemen</p>
                      <p className="text-gray-600">{employmentQuery?.data?.group?.name}</p>
                    </div>
                    <div>
                      <p className="font-medium">Lokasi Kerja</p>
                      <p className="text-gray-600">
                        {employmentQuery?.data?.location}
                      </p>
                    </div>
                    <div>
                      <p className="font-medium">Tanggal Masuk</p>
                      <p className="text-gray-600"> {employmentQuery?.data?.start_date}</p>
                    </div>
                    <div>
                      <p className="font-medium">Durasi Kerja</p>
                      <p className="text-gray-600"> {employmentQuery?.data?.end_date}</p>
                    </div>
                    <div>
                      <p className="font-medium">Grade</p>
                      <p className="text-gray-600"> {employmentQuery?.data?.position?.level}</p>
                    </div>
                    <div>
                      <p className="font-medium">Jenis Karyawan</p>
                      <p className="text-gray-600">{profileQuery?.data?.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="p-4">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Informasi Administratif</CardTitle>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <p>
                    Nomor SK:{" "}
                    <span className="text-gray-600">SK-PKWT/092/HRD/2022</span>
                  </p>
                  <p>
                    Nomor & Tanggal SK:{" "}
                    <span className="text-gray-600">SK-KJ/011/HRD/2024</span>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Right: Emergency Contacts */}
            <Card className="p-4">
              <CardHeader className="flex justify-between items-center">
                <CardTitle>Emergency Contacts</CardTitle>
                <Button size="sm" onClick={() => {
                  handleAction(null, content.contacts)
                }}
                >+ Add contact</Button>
              </CardHeader>
              {contactsQuery.data?.map(c => (
                <CardContent key={c.id} className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">{c.name}</p>
                      <p className="text-gray-500">{c.phone}</p>
                    </div>
                    <Button size="sm" variant="outline" onClick={() => {
                      handleAction(c, content.contacts)
                    }}>
                      Edit
                    </Button>
                  </div>

                </CardContent>
              ))}
            </Card>
          </main>
        </TabsContent>

        {/* === Tab My Documents === */}
        <TabsContent value="documents">
          <main className="grid grid-cols-2 md:grid-cols-2 gap-6 ">
            <div className="p-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle>Dokument Penunjang Kerja</CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentCard
                    title="Tax Document"
                    fileName="Thunder_VerifiedTax.pdf"
                    fileSize="35.47 KB"
                    uploadedAt="6/26/2025"
                  />

                  <DocumentCard
                    title="Asuransi"
                    description="Upload your insurance"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="p-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle>Dokument Pendukung</CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentCard
                    title="Tax Document"
                    fileName="Thunder_VerifiedTax.pdf"
                    fileSize="35.47 KB"
                    uploadedAt="6/26/2025"
                  />

                  <DocumentCard
                    title="Asuransi"
                    description="Upload your insurance"
                  />
                </CardContent>
              </Card>
            </div>
          </main>
        </TabsContent>

        {/* === Tab Education History === */}
        <TabsContent value={content.education.type}>
          <div className="max-w-4xl mx-auto mt-6 justify-start">
            {resultQuery ? (
              <EducationHistory
                education={resultQuery}
                onAdd={() => {
                  handleAction(null, content.education)
                }}
                onEdit={(data) => {
                  handleAction(data, content.education)
                }}
              />
            ) : (
              <Card className="p-4">
                <CardContent>
                  <p className="text-gray-500 text-sm">
                    Belum ada data pendidikan.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* === Tab Reporting Line === */}
        <TabsContent value={content.training}>
          <main className="grid grid-cols-2 md:grid-cols-2 gap-6 ">
            <div className="p-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle>My Course</CardTitle>
                </CardHeader>
                <CardContent>
                  {resultQuery ? (
                    <TrainingCard training={resultQuery} />
                  ) : (
                    <Card className="p-4">
                      <CardContent>
                        <p className="text-gray-500 text-sm">
                          Belum ada data pendidikan.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                  {/* <DocumentCard
                    title="Tax Document"
                    fileName="Thunder_VerifiedTax.pdf"
                    fileSize="35.47 KB"
                    uploadedAt="6/26/2025"
                  />

                  <DocumentCard
                    title="Asuransi"
                    description="Upload your insurance"
                  /> */}
                </CardContent>
              </Card>
            </div>
            {/* <div className="p-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle>Dokument Pendukung</CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentCard
                    title="Tax Document"
                    fileName="Thunder_VerifiedTax.pdf"
                    fileSize="35.47 KB"
                    uploadedAt="6/26/2025"
                  />

                  <DocumentCard
                    title="Asuransi"
                    description="Upload your insurance"
                  />
                </CardContent>
              </Card>
            </div> */}
          </main>
        </TabsContent>

        <TabsContent value={content.salary_component}>
          <main className="grid grid-cols-2 md:grid-cols-2 gap-6 ">
            <div className="p-6">
              {resultQuery ? (
                <SalaryCard salaries={resultQuery} employee_id={id}></SalaryCard>
              ) : (
                <Card className="p-4">
                  <CardContent>
                    <p className="text-gray-500 text-sm">
                      Belum ada data pendidikan.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
            {/* <div className="p-6">
              <Card className="rounded-sm">
                <CardHeader>
                  <CardTitle>Dokument Pendukung</CardTitle>
                </CardHeader>
                <CardContent>
                  <DocumentCard
                    title="Tax Document"
                    fileName="Thunder_VerifiedTax.pdf"
                    fileSize="35.47 KB"
                    uploadedAt="6/26/2025"
                  />

                  <DocumentCard
                    title="Asuransi"
                    description="Upload your insurance"
                  />
                </CardContent>
              </Card>
            </div> */}
          </main>
        </TabsContent>
      </Tabs>
      <FormModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
          setEditData(null);
        }}
        title={editData ? "Edit" : "Form Create"}
        fields={forms}
        defaultValues={editData ?? {}}
        onSubmit={handleSubmit}
        submitLabel={editData ? "Update" : "Save"}
        cancelLabel="Cancel"
      />
      {/* Footer Logout */}
    </div>
  );
};

export default EmployeeDetail;
