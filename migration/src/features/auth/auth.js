import ApiService from '@service/ApiService'

const path = '/users/login'

export async function login(credentials, config) {
  const service = new ApiService(config)
  return await service.post(path, credentials, config)
}

const response = {
  "userDetail": {
      "id": "clmvssi3p0000yon2g7lbebuq",
      "firstName": "Rezene",
      "fatherName": "Hagos",
      "grandFatherName": null,
      "privileges": ['All Privileges'],
      "age": 20,
      "gender": "Male",
      "country": "05, Tigray",
      "email": "rezene@medcoanalytics.com",
      "mobileNumber": "0914194451",
      "address": "05, Tigray",
      "role": "Super Admin",
      "verificationCode": "f416442711e5c42908f3e4ef32fe95d4",
      "username": "rezene",
      "password": "ba018160fc26e0cc2e929b8e071f052d",
      "latitude": null,
      "longitude": null,
      "createdOn": 1695459467941,
      "modifiedOn": 1695624231704,
      "status": "Active",
      "registeredById": null,
      "source": {
          "ip": "::ffff:127.0.0.1",
          "browser": "vscode-restclient",
          "referrer": null
      },
      "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlemVuZSIsInByaXZpbGVnZXMiOlt7InByaXZpbGVnZSI6IkhhbWxldCBSZWFkIGFuZCBXcml0ZSIsIm1ldGhvZHMiOlsiUE9TVCIsIkdFVCIsIkRFTEVURSIsIlBBVENIIl19LHsicHJpdmlsZWdlIjoiVXNlciBSZWFkIGFuZCBXcml0ZSIsIm1ldGhvZHMiOlsiUE9TVCIsIkdFVCIsIkRFTEVURSIsIlBBVENIIl19LHsicHJpdmlsZWdlIjoiUGF5bWVudCBSZWFkIGFuZCBXcml0ZSIsIm1ldGhvZHMiOlsiUE9TVCIsIkdFVCIsIlBBVENIIl19XSwiaWF0IjoxNzAxMzMyMzU2LCJleHAiOjYxNzAxMzMyMzU2fQ.JPRlIl40u5HKwOqTLC8LuQe1I6EpBFahmzNPcyg7iFY",
      "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJlemVuZSIsInByaXZpbGVnZXMiOlt7InByaXZpbGVnZSI6IkhhbWxldCBSZWFkIGFuZCBXcml0ZSIsIm1ldGhvZHMiOlsiUE9TVCIsIkdFVCIsIkRFTEVURSIsIlBBVENIIl19LHsicHJpdmlsZWdlIjoiVXNlciBSZWFkIGFuZCBXcml0ZSIsIm1ldGhvZHMiOlsiUE9TVCIsIkdFVCIsIkRFTEVURSIsIlBBVENIIl19LHsicHJpdmlsZWdlIjoiUGF5bWVudCBSZWFkIGFuZCBXcml0ZSIsIm1ldGhvZHMiOlsiUE9TVCIsIkdFVCIsIlBBVENIIl19XSwiaWF0IjoxNzAxMzMyMzU2fQ.zx9rsu-1lUvyQZffMMlriRrfDaXHnPTICzAHuiunVu0"
  }
}

export async function refreshAccessToken(type = true) {
  // const service = new ApiService(config)
  return new Promise((res, rej) => {
    if(type) {
      res({
        success: true,
        error: '',
        data: response,
        status: 200
      })
    } else {
      res({
        success: false,
        error: 'Unauthorized',
        data: null,
        status: 401        
      })
    }
  })
}