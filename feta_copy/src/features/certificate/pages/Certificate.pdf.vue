<script setup>
import { formatCurrency, getAgeFormDate, getBgbase64Url, secondDateFormat } from "@/utils/utils";
import PdfMaker from "../components/PdfMaker.vue";
import { ref } from "vue";
import { Gender } from '@/utils/enums'

const props = defineProps({
  insured: {
    type: Object,
    required: true,
  },
  agency: {
    type: Object,
    required: true,
  },
});

let payment = import.meta.env.v_PAYMENT_AMOUNT

const content = ref();
async function genPdfContent() {
  const bg = await getBgbase64Url("/crtificate_header.png");
  const sign = await getBgbase64Url("/sign.png");
  const stamp = await getBgbase64Url("/Nyala_stamp.png");

  const docDefinition = {
    content: [
      {
        alignment: "center",
        text: "የህይወት መድን ምስክር ወረቀት",
        style: 'header',
      },
      {
        alignment: "center",
        text: "Certificate of Life Assurance",
        style: 'header',
      },
      {
        marginTop: 0,
        alignment: "center",
        fontSize: 10,
        text: [
          "በቡድን ህይወት ዋስትና ቁጥር  ",
          {
            decoration: "underline",
            bold: true,
            text: props.agency?.agencyPolicyNumber
          },
          "  መሠረት የተሰጠ",
        ],
      },
      {
        marginTop: 0,
        alignment: "center",
        text: [
          "Attaching to and forming part of Group Term Life Assurance Policy No  ",
        ],
        bold: true,
      },
      {
        alignment: "center",
        decoration: "underline",
        text: props.agency?.agencyPolicyNumber,
      },
      {
        marginTop: 0,
        fontSize: 10,
        columns: [
          {
            width: 15,
            text: "1.",
          },
          {
            stack: [
              { text: "ሰርተፍኬት ቁጥር" },
              {
                text: [
                  {
                    fontSize: 11,
                    bold: true,
                    text: "Certificate No.  ",
                  },
                  {
                    decoration: "underline",
                    text: props.insured?.certificateNumber
                  },
                ],
              },
            ],
          },
          {
            stack: [
              { text: "የተሰጠበት ቀን" },
              {
                text: [
                  {
                    fontSize: 11,
                    bold: true,
                    text: "Date of Issue.  ",
                  },
                  {
                    decoration: "underline",
                    text: secondDateFormat(props.insured?.paidDate)
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        marginTop: 0,
        fontSize: 10,
        columns: [
          {
            width: 15,
            text: "2.",
          },
          {
            fontSize: 11,
            stack: [
              { text: "የውሉ ባለቤት / የኤጀንሲው ስም" },
              {
                text: [
                  {
                    bold: true,
                    text: "Policy Owner / Name of Agency.  ",
                  },
                  {
                    decoration: "underline",
                    text: props.agency?.agencyName
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        marginTop: 0,
        fontSize: 10,
        columns: [
          {
            width: 15,
            text: "3.",
          },
          {
            fontSize: 11,
            stack: [
              { text: "የመድን ገቢው ስም ከነአያት በፓስፖርት እንደተመለከተው" },
              {
                text: [
                  {
                    bold: true,
                    text: "Name of Assured including grand father's name as indicated in the passport.  ",
                  },
                ],
              },
              {
                marginTop: 0,
                stack: [
                  "የአያት ስም",
                  {
                    text: [
                      { bold: true, text: "Sur name  " },
                      { decoration: "underline", text: props.insured?.grandFatherName },
                    ],
                  },
                ],
              },
              {
                marginTop: 0,
                stack: [
                  "ስም ከነአባት",
                  {
                    text: [
                      { bold: true, text: "Given name  " },
                      { decoration: "underline", text: `${props.insured?.firstName} ${props.insured?.fatherName}` },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        marginTop: 0,
        fontSize: 10,
        columns: [
          {
            width: 15,
            text: "4.",
          },
          {
            stack: [
              { text: "የመድን ገቢው አድራሻ ክልል" },
              {
                fontSize: 12,
                marginTop: 1,
                marginBottom: 5,
                text: "Assured’s Address",
                bold: true,
              },
              {
                text: [
                  {
                    fontSize: 11,
                    bold: true,
                    text: "Rigion  ",
                  },
                  {
                    decoration: "underline",
                    text: props.insured?.state 
                  },
                ],
              },
            ],
          },
          {
            stack: [
              { text: "ዞን /ክፍለ ከተማ" },
              {
                fontSize: 12,
                marginTop: 1,
                marginBottom: 5,
                text: " ",
                bold: true,
              },
              ,
              {
                text: [
                  {
                    fontSize: 11,
                    bold: true,
                    text: "Zone /Sub city  ",
                  },
                  {
                    decoration: "underline",
                    text: props.insured?.address2
                  },
                ],
              },
            ],
          },
          {
            stack: [
              { text: "ወረዳ" },
              {
                fontSize: 12,
                marginTop: 1,
                marginBottom: 5,
                text: " ",
                bold: true,
              },
              ,
              {
                text: [
                  {
                    fontSize: 11,
                    bold: true,
                    text: "woreda  ",
                  },
                  {
                    decoration: "underline",
                    text: props.insured?.address1
                  },
                ],
              },
            ],
          },
          {
            stack: [
              { text: "ስልክ ቁጥር" },
              {
                fontSize: 12,
                marginTop: 1,
                marginBottom: 5,
                text: " ",
                bold: true,
              },
              ,
              {
                text: [
                  {
                    fontSize: 11,
                    bold: true,
                    text: "Tel. No  ",
                  },
                  {
                    decoration: "underline",
                    text: props.insured?.phone
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        marginTop: 0,
        fontSize: 10,
        columns: [
          {
            columns: [
              {
                width: 15,
                text: "6.",
              },
              {
                stack: [
                  { text: "ጾታ" },
                  {
                    text: [
                      {
                        fontSize: 11,
                        bold: true,
                        text: "Sex  ",
                      },
                    ],
                  },
                ],
              },
              {
                stack: [
                  { text: "ወንድ" },
                  {
                    text: [
                      {
                        text: "ሴት  ",
                      },
                    ],
                  },
                ],
              },
              {
                stack: [
                  { bold: true, text: "Male" },
                  {
                    text: [
                      {
                        fontSize: 11,
                        bold: true,
                        text: "Female  ",
                      },
                    ],
                  },
                ],
              },
              {
                stack: [
                  { bold: true, text: props.insured?.gender == Gender.MALE ? 'X' : '' },
                  {
                    text: [
                      {
                        fontSize: 11,
                        bold: true,
                        text: props.insured?.gender == Gender.FEMALE ? 'X' : '',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            columns: [
              {
                width: 15,
                text: "7.",
              },
              {
                stack: [
                  { text: "የትውልድ ዘመን" },
                  {
                    text: [
                      {
                        fontSize: 11,
                        bold: true,
                        text: "Date of Birth  ",
                      },
                      {
                        decoration: 'underline',
                        text: secondDateFormat(props.insured?.birthDate)
                      }
                    ],
                  },
                ],
              },
            ],
          },
          {
            columns: [
              {
                width: 15,
                text: "8.",
              },
              {
                stack: [
                  { text: "ዕድሜ" },
                  {
                    text: [
                      {
                        fontSize: 11,
                        bold: true,
                        text: "Age  ",
                      },
                      {
                        decoration: 'underline',
                        text: getAgeFormDate(props.insured?.birthDate)
                      }
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        marginTop: 0,
        fontSize: 10,
        columns: [
          {
            width: 15,
            text: "9.",
          },
          {
            stack: [
              { text: "የሚሄድበት ሀገር" },
              {
                text: [
                  {
                    fontSize: 11,
                    bold: true,
                    text: "Country of Destinationy.  ",
                  },
                  {
                    decoration: "underline",
                    text: props.insured?.countryOfDestination 
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        marginTop: 0,
        fontSize: 10,
        columns: [
          {
            columns: [
              {
                width: 15,
                text: "10.",
              },
              {
                stack: [
                  { text: "የፓስፖርት ቁጥር" },
                  {
                    text: [
                      {
                        fontSize: 11,
                        bold: true,
                        text: "Passport Number  ",
                      },
                      {
                        decoration: 'underline',
                        text: props.insured?.passportNumber
                      }
                    ],
                  },
                ],
              },
            ],
          },
          {
            columns: [
              {
                width: 15,
                text: "11.",
              },
              {
                stack: [
                  { text: "ፓስፖርት የሚያበቃበት ቀን" },
                  {
                    text: [
                      {
                        fontSize: 11,
                        bold: true,
                        text: "Passport Expiry Date  ",
                      },
                      {
                        decoration: 'underline',
                        text: secondDateFormat(props.insured?.passportExpiryDate)
                      }
                    ],
                  },
                ],
              },
            ],
          }
        ],
      },
      {
        marginTop: 0,
        fontSize: 10,
        columns: [
          {
            width: 15,
            text: "12.",
          },
          {
            stack: [
              { text: "የውል ዘመን ከ" },
              {
                fontSize: 12,
                marginTop: 1,
                marginBottom: 5,
                text: "Period of cover",
                bold: true,
              },
              {
                text: [
                  {
                    fontSize: 11,
                    bold: true,
                    text: "From  ",
                  },
                  {
                    decoration: "underline",
                    text: secondDateFormat(props.insured?.beginDate)
                  },
                ],
              },
            ],
          },
          {
            stack: [
              { text: "እስከ" },
              {
                fontSize: 12,
                marginTop: 1,
                marginBottom: 5,
                text: " ",
                bold: true,
              },
              {
                text: [
                  {
                    fontSize: 11,
                    bold: true,
                    text: "To  ",
                  },
                  {
                    decoration: "underline",
                    text: secondDateFormat(props.insured?.endDate)
                  },
                ],
              },
            ],
          }
        ],
      },
      {
        marginTop: 0,
        fontSize: 10,
        columns: [
          {
            width: 15,
            text: "13.",
          },
          {
            fontSize: 11,
            stack: [
              { text: "የአረቦን መጠን ብር 5 የቀረጥ ቴምብር ጨምሮ" },
              {
                text: [
                  {
                    bold: true,
                    text: "Premium Including Revenue Stamp Birr.  ",
                  },
                  {
                    decoration: "underline",
                    text: formatCurrency(payment)
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        marginTop: 0,
        fontSize: 10,
        columns: [
          {
            width: 15,
            text: "15.",
          },
          {
            fontSize: 11,
            stack: [
              { text: "የመድን ውሉ ተጠቃሚዎች በመድን ገቢው ተሞልቶ በተፈረመው ቅጽ መሠረት ይሆናል" },
              {
                text: [
                  {
                    bold: true,
                    text: "Beneficiaries as stated in the beneficiary’s form.  ",
                  },
                  {
                    decoration: "underline",
                    text: " ", // TODO
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        marginTop: 0,
        fontSize: 10,
        columns: [
          {
            width: 15,
            text: "16.",
          },
          {
            fontSize: 11,
            stack: [
              { text: "ውሉ የሚሰጠው ሽፋን ፖሊሲው ላይ በተዘረዘረው መሠረት ይሆናል" },
              {
                text: [
                  {
                    bold: true,
                    text: "Cover as per the policy details.  ",
                  },
                  {
                    decoration: "underline",
                    text: " ", // TODO
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        fontSize: 13,
        marginTop: 5,
        columns: [
          {
            fontSize: 12,
            stack: [
              {
                image: sign,
                width: 50,
                height: 50
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0, y1: 3,
                    x2: 200, y2: 3,
                    lineWidth: .1
                  },
                ]
              },
              'የኃላፊው ስምና ፊርማ',
              "Name and Signature of Authorized Person"
            ]
          },
          {
            alignment: 'center',
            columns: [
              {
                alignment: 'center',
                width: 110,
                height: 100,
                image: stamp
              }
            ]
          },
          {
            marginTop: -50,
            marginLetf: 50,
            fit: 100,
            qr: import.meta.env?.v_CERTIFICATE_URL + '/member_detail/certificate/' + props.insured?.insuredUuid + '/' + props.agency?.agencyUuid,
          }
        ]
      }
    ],
    background: [
      {
        image: bg,
        width: 600, // Adjust width as needed
      },
    ],
  };

  content.value = docDefinition;
}

genPdfContent();
</script>
<template>
  <PdfMaker v-if="content" :content="content" />
</template>
