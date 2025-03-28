import { useState } from "react";
import { useEmployeeDetails } from "@/components/employeeDetails/useEmployeeDetails";
import {
  BriefcaseBusiness,
  Download,
  Edit,
  Eye,
  Mail,
  Save,
} from "lucide-react";
import Image from "next/image";
import {
  AccountAccess,
  PersonalInfo,
  ProfessionalInfo,
} from "@/utils/employeeFeilds";
import { Employee } from "@/types/types";
import LottieAnimation from "../lottieAnimation/LottieAnimation";
import TabBar from "../tabBar/TabBar";
import { mainTabs, subTabs } from "@/utils/tabConfigs";
import EmployeeInput from "../employeeInput/EmployeeInput";
import AttendanceRecords from "../attendanceRecords/AttendanceRecords";
import { EmployeeDetailsProps, InputFieldType } from "@/types/empoyee";
import ProjectList from "../projectList/ProjectList";
import LeaveRequestWithModal from "../leaveRequestModal/LeaveRequestModal";

const EmployeeDetails: React.FC<EmployeeDetailsProps> = ({
  id,
  isEditMode,
}) => {
  const {
    pdfPreview,
    openPdfPreview,
    closePdfPreview,
    isEditing,
    getPdfUrl,
    employee,
    loading,
    error,
    formatDate,
    formatTime,
    handleUpdate,
    handleEditSaveClick,
    updatedImage,
    projects,
    updatedFields,
    attendanceRecords,
    handleComplete,
    handleImageChange,
  } = useEmployeeDetails(id);

  const [activeTab, setActiveTab] = useState("profile");
  const [subTab, setSubTab] = useState("personal");

  const fields: Extract<keyof Employee, string>[] = [
    "appointmentLetter",
    "salarySlip",
    "experienceLetter",
    "relivingLetter",
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen dark:bg-customBlack">
        <LottieAnimation />
      </div>
    );
  }

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="dark:bg-customBlack dark:text-white rounded-lg shadow-lg border border-gray-700">
      <div className="p-4">
        <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
          <label
            htmlFor="profileImageUpload"
            className="cursor-pointer relative"
          >
            <Image
              width={100}
              height={100}
              src={updatedImage || employee?.photoURL || "/default-avatar.png"}
              alt="Profile"
              className="w-[100px] h-[100px] object-cover rounded-lg border border-gray-500"
            />
            {isEditMode && (
              <div className="absolute bottom-0 right-0 bg-gray-800 text-white p-1 rounded-lg">
                <Edit size={16} />
              </div>
            )}
          </label>

          {isEditMode && (
            <input
              type="file"
              id="profileImageUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleImageChange(e.target.files[0]);
                }
              }}
            />
          )}

          <div className="flex flex-col text-center md:text-left flex-1">
            <h2 className="text-xl md:text-2xl font-bold">
              {employee?.firstName} {employee?.lastName}
            </h2>
            <p className="text-customOrange flex my-2 text-sm md:text-base">
              <BriefcaseBusiness className="dark:text-white mr-2" />
              {employee?.designation}
            </p>
            <p className="flex text-sm md:text-base">
              <Mail className="mr-2" /> {employee?.email}
            </p>
          </div>

          <button
            onClick={handleEditSaveClick}
            className="bg-customOrange text-white px-5 py-4 w-[156px] h-[50px] rounded-lg flex items-center gap-2"
          >
            {isEditing ? (
              <>
                <Save size={16} /> Save
              </>
            ) : (
              <>
                <Edit size={16} /> Edit Profile
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row border-t dark:border-gray-700">
        <div className="w-full md:w-1/4 dark:bg-[#A2A1A80D] bg-gray-300 text-black p-4 h-screen">
          <TabBar
            tabs={mainTabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            orientation="vertical"
            activeClassName="bg-customOrange text-white"
            inactiveClassName="dark:text-white"
          />
        </div>

        <div className="w-full md:w-3/4 p-4">
          {activeTab === "profile" && (
            <>
              <TabBar
                tabs={subTabs}
                activeTab={subTab}
                onTabChange={setSubTab}
                orientation="horizontal"
                activeClassName="text-orange-500 border-b-2 border-orange-500"
                inactiveClassName="dark:text-white"
              />

              {subTab === "personal" && (
                <div className="mb-6 mt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {PersonalInfo?.map(
                      ({
                        name,
                        label,
                        valueKey,
                        type,
                        options,
                        disable,
                        className,
                      }) => (
                        <EmployeeInput
                          key={name}
                          name={name}
                          label={label}
                          value={
                            updatedFields[name as keyof Employee] ??
                            ((employee?.[
                              valueKey as keyof Employee
                            ] as string) ||
                              "")
                          }
                          isEditMode={isEditMode}
                          type={type as InputFieldType}
                          disabled={disable}
                          options={options}
                          className={className}
                          onChange={(e) => handleUpdate(name, e.target.value)}
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {subTab === "professional" && (
                <div className="mb-6 mt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ProfessionalInfo?.map(
                      ({ name, label, type, options, valueKey }) => (
                        <EmployeeInput
                          key={name}
                          name={name}
                          label={label}
                          type={type as "text" | "select"}
                          value={
                            updatedFields[name as keyof Employee] ??
                            ((employee?.[
                              valueKey as keyof Employee
                            ] as string) ||
                              "")
                          }
                          options={options}
                          isEditMode={isEditMode}
                          onChange={(e) => handleUpdate(name, e.target.value)}
                        />
                      )
                    )}
                  </div>
                </div>
              )}

              {subTab === "documents" && (
                <div className="mb-6 mt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {fields?.map((field) => (
                      <div
                        key={field}
                        className="flex items-center gap-2 dark:bg-customBlack p-3 rounded-md border border-gray-700"
                      >
                        {employee && employee[field] ? (
                          <>
                            <span className="dark:text-white flex-grow">
                              {field.replace(/([A-Z])/g, " $1")}.pdf
                            </span>
                            <button
                              onClick={() =>
                                openPdfPreview(employee[field] as string)
                              }
                              className="dark:text-white hover:underline"
                            >
                              <Eye />
                            </button>
                            <a
                              href={employee[field] as string}
                              download
                              className="dark:text-white hover:underline"
                            >
                              <Download />
                            </a>
                          </>
                        ) : (
                          <p className="text-gray-500 text-sm">
                            No {field} uploaded
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {pdfPreview && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center">
                      <div className="bg-white p-4 rounded-lg max-w-3xl w-full">
                        <iframe
                          src={getPdfUrl(pdfPreview)}
                          className="w-full h-[500px]"
                        />
                        <button
                          onClick={closePdfPreview}
                          className="mt-2 text-red-500"
                        >
                          ✖ Close
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {subTab === "account" && (
                <div className="mb-6 mt-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {AccountAccess?.map(({ name, label, valueKey }) => (
                      <EmployeeInput
                        key={name}
                        name={name}
                        label={label}
                        value={
                          updatedFields[name as keyof Employee] ??
                          ((employee?.[valueKey as keyof Employee] as string) ||
                            "")
                        }
                        isEditMode={isEditMode}
                        onChange={(e) => handleUpdate(name, e.target.value)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "attendance" && (
            <AttendanceRecords
              attendanceRecords={attendanceRecords}
              formatDate={formatDate}
              formatTime={formatTime}
            />
          )}

          {activeTab === "projects" && (
            <ProjectList
              projects={projects}
              employees={employee ? [employee] : []}
              onCompleteProject={handleComplete}
              showEmployeeName={false}
              showActionButton={true}
            />
          )}

          {activeTab === "leave" && (
            <div>
              <LeaveRequestWithModal employeeId={id} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
