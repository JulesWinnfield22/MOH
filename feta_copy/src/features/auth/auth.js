import ApiService from "@service/ApiService";

const path = "/users";

export async function login(credentials, config) {
  const service = new ApiService(config);
  return await service.post(`${path}/signin`, credentials, config);
}

const response = {
  userDetail: {
    token:
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJpbnN1cmFuY2UxQGdtYWlsLmNvbSIsImlhdCI6MTcwMjU3NTQ5NCwiZXhwIjo4NjQwMDE3MDI1NzU0OTR9.UHukwbIBXvcpFy1hmYp-HqxiAU6gQcAYGTrPIcRvCmw",
    type: "Bearer",
    userUuid: "a522a018-8b13-4242-8b51-46f2ebb6466d",
    email: "insurance1@gmail.com",
    roleName: "Admin",
    title: "Mr.",
    firstName: "Asefa",
    fatherName: "Alemneh",
    grandFatherName: "Bayu",
    gender: "Male",
    mobilePhone: "0987654326",
    userStatus: "Active",
    userType: "Insurance",
    insuranceUuid: "d10a2b81-d08d-4555-9269-7c6c22c53108",
    agencyUuid: null,
    profilePicture: null,
    privileges: [
      "ROLE_Delete-Agency",
      "ROLE_Create-Agency",
      "ROLE_Update-Agency",
      "ROLE_Read-Agency",
      "ROLE_Read-Agencies",
      "ROLE_Read-Bought-Insurances",
      "ROLE_Delete-Bought-Insurance",
      "ROLE_Create-Bought-Insurance",
      "ROLE_Update-Bought-Insurance",
      "ROLE_Approve-Bought-Insurances-Agency",
      "ROLE_Review-Bought-Insurance",
      "ROLE_Request-Buy-Insurance",
      "ROLE_Read-Approved-Bought-Insurances-Agency",
      "ROLE_Read-Bought-Insurances-Requested",
      "ROLE_Read-Bought-Insurances-Saved",
      "ROLE_Read-Requested-Bought-Insurances",
      "ROLE_Read-Reviewed-Bought-Insurances",
      "ROLE_Read-Paid-Bought-Insurances",
      "ROLE_Read-Approved-Bought-Insurances",
      "ROLE_Update-Insurance",
      "ROLE_Read-Insurance",
      "ROLE_Create-Insurance",
      "ROLE_Read-Insurances",
      "ROLE_Delete-Insurance",
      "ROLE_Upload-Insured-Person",
      "ROLE_Delete-Insured-Person",
      "ROLE_Read-Insured-Person",
      "ROLE_Create-Insured-Person",
      "ROLE_Update-Insured-Person",
      "ROLE_Read-Insured-Persons",
      "ROLE_Delete-Package",
      "ROLE_Update-Package",
      "ROLE_Read-Package",
      "ROLE_Create-Package",
      "ROLE_Read-Packages",
      "ROLE_Create-Service",
      "ROLE_Read-Services",
      "ROLE_Delete-Service",
      "ROLE_Update-Service",
      "ROLE_Read-Service",
      "ROLE_Read-Online-Users",
      "ROLE_Create-User",
      "ROLE_Read-Privilege",
      "ROLE_Delete-Role",
      "ROLE_Delete-Privilege",
      "ROLE_Delete-User",
      "ROLE_Create-Privilege",
      "ROLE_Update-Role",
      "ROLE_Read-User",
      "ROLE_Read-Roles",
      "ROLE_Read-Role",
      "ROLE_Update-Privilege",
      "ROLE_Read-Privileges",
      "ROLE_Create-Role",
      "ROLE_Update-User",
    ],
  },
};

export async function refreshAccessToken(type = true) {
  // const service = new ApiService(config)
  return new Promise((res, rej) => {
    console.log(type);
    if (type) {
      res({
        success: true,
        error: "",
        data: response,
        status: 200,
      });
    } else {
      res({
        success: false,
        error: "Unauthorized",
        data: null,
        status: 401,
      });
    }
  });
}
