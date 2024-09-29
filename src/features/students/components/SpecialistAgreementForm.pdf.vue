<script setup lang="ts">
import Button from '@/components/Button.vue';
import PdfMaker from '@/components/PdfMaker.vue';
import { useAuth } from '@/store/auth';
import { formatCurrency, secondDateFormat } from '@/utils/utils';
import { ref } from 'vue';

const auth = useAuth();

const props = defineProps({
  data: {
    type: Object,
  },
  student: {
    type: Object,
  },
  maritalStatus: {
    type: String,
  },
  contract: {
    type: Object
  }
});

console.log(props.data);

const content = ref();

const DAYS = [
  'ሰኞ', // Monday
  'ማክሰኞ', // Tuesday
  'ረቡዕ', // Wednesday
  'ሐሙስ', // Thursday
  'ዓርብ', // Friday
  'ቅዳሜ', // Saturday
  'እሑድ', // Sunday
];

function getPdf() {
  const docDefinition = {
    content: [
      {
        style: 'header',
        text: 'የሕክምና ስፔሻሉቲ ሥልጠና ውል',
      },
      {
        marginTop: 10,
        width: 'auto',
        text: 'ይህ የሕክምና ስፔሻሊቲ ስልጠና ዉል በኢ.ፌ.ዴ.ሪ.የጤና ሚኒስቴር ከዚህ በኋላ ዉል ሰጪ ተብሎ በሚጠራዉ',
      },
      {
        marginTop: 5,
        columns: [
          {
            width: 'auto',
            text: 'እና በዶ/ር',
          },
          {
            width: 'auto',
            marginLeft: 5,
            stack: [
              {
                width: 'auto',
                bold: true,
                fontSize: 10,
                text: auth.auth?.user?.userType == 'LegalOffice' ? (props.student?.fullName || props.data?.fullName) : auth.auth?.user?.name,
              },
              {
                width: 'auto',
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 3,
                    x2: 200,
                    y2: 1,
                    lineWidth: 0.1,
                  },
                ],
              },
            ],
          },
          {
            text: 'ከዚህ በኋላ ዉል ተቀባይ ተብሎ በሚጠራዉ',
          },
        ],
      },
      {
        marginTop: 5,
        columns: [
          {
            width: 'auto',
            text: 'መካከል ዛሬ',
          },
          {
            width: 'auto',
            marginLeft: 5,
            stack: [
              {
                fontSize: 10,
                bold: true,
                text: DAYS[new Date().getDay() - 1],
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 3,
                    x2: 50,
                    y2: 2,
                    lineWidth: 0.1,
                  },
                ],
              },
            ],
          },
          {
            width: 'auto',
            text: 'ቀን',
            marginLeft: 5,
          },
          {
            width: 'auto',
            marginLeft: 5,
            stack: [
              {
                fontSize: 10,
                bold: true,
                text: secondDateFormat(new Date()),
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 3,
                    x2: 100,
                    y2: 2,
                    lineWidth: 0.1,
                  },
                ],
              },
            ],
          },
          {
            marginLeft: 5,
            text: 'ዓ.ም በአዲስ አበባ ከተማ ተፈረመ፡፡',
          },
        ],
      },
      {
        marginTop: 20,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'አንቀጽ 1',
      },
      {
        marginTop: 5,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'የዉሉ ዓላማ',
      },
      {
        marginTop: 5,
        columns: [
          {
            width: 'auto',
            text: 'በሚኒስቴሩ የትምህርት እና ሥልጠና መመሪያ ቁጥር',
          },
          {
            width: 'auto',
            stack: [
              {
                text: '  ',
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 3,
                    x2: 50,
                    y2: 2,
                    lineWidth: 0.1,
                  },
                ],
              },
            ],
          },
          {
            width: 'auto',
            text: `${new Date().getFullYear()} መሠረት ውል ተቀባይ የሕክምና`,
          },
        ],
      },
      {
        marginTop: 5,
        text: 'ስፔሻሊቲ ሥልጠና ዕድል ተጠቃሚ እንዲሆንና ትምህርቱን ወይም ሥልጠናዉን ካጠናቀቀ በኋላ ሚኒስቴሩ',
      },
      {
        marginTop: 5,
        text: ' በሚመድበው ቦታ እንዲያገለግል ማስቻል ነዉ፡፡',
      },
      {
        marginTop: 20,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'አንቀጽ 2',
      },
      {
        marginTop: 5,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'ስለ ተዋዋይ ወገኖች',
      },
      {
        marginTop: 10,
        text: [
          {
            fontSize: 10,
            bold: true,
            text: '1) ዉል ሰጪ፡- ',
          },
          'የጤና ሚኒስቴር',
        ],
      },
      'አድራሻ፤',
      'ከተማ፡- አዲስ አበባ ክ/ከተማ፡- ልደታ ወረዳ፡- 07',
      {
        columns: [
          {
            width: 'auto',
            text: [
              {
                fontSize: 10,
                bold: true,
                text: '2) ዉል ተቀባይ፡- ',
              },
            ],
          },
          {
            width: 'auto',
            marginLeft: 5,
            stack: [
              {
                bold: true,
                fontSize: 10,
                text: auth.auth?.user?.userType == 'LegalOffice' ? (props.student?.fullName || props.data?.fullName) : auth.auth?.user?.name,
              },
              {
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 3,
                    x2: 200,
                    y2: 2,
                    lineWidth: 0.1,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        fontSize: 10,
        bold: true,
        text: 'I) ጠቅላላ ሁኔታ',
      },
      'አድራሻ፤',
      {
        marginTop: 5,
        columns: [
          {
            text: 'ከተማ',
            value: props.data?.city,
          },
          {
            text: 'ክ/ከተማ',
            value: props.data?.subCity,
          },
          {
            text: 'ወረዳ',
            value: props.data?.woreda,
          },
          {
            text: 'የቤት ቁጥር',
            value: props.data?.houseNumber,
          },
        ].reduce((state, el) => {
          state.push({
            width: 'auto',
            text: el.text,
          });
          state.push({
            marginLeft: 5,
            width: 'auto',
            stack: [
              {
                bold: true,
                fontSize: 10,
                text: el.value,
              },
              {
                stack: [
                  {
                    canvas: [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 3,
                        x2: 70,
                        y2: 3,
                        lineWidth: 0.1,
                      },
                    ],
                  },
                ],
              },
            ],
          });
          return state;
        }, []),
      },
      {
        marginTop: 5,
        columns: [
          {
            text: 'ስሌክ ቁጥር፡- የቤት፡',
            value: ' ',
          },
          {
            text: 'ሞባይል፡',
            value: props.student?.phone || props.data?.phone
          },
          {
            text: 'የጋብቻ ሁኔታ፡',
            value: props?.maritalStatus || props.data?.martialStatus || ' ',
          }
        ].reduce((state, el) => {
          state.push({
            width: 'auto',
            text: el.text,
          });
          state.push({
            marginLeft: 5,
            width: 'auto',
            stack: [
              {
                bold: true,
                fontSize: 10,
                text: el.value,
              },
              {
                stack: [
                  {
                    canvas: [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 3,
                        x2: 70,
                        y2: 3,
                        lineWidth: 0.1,
                      },
                    ],
                  },
                ],
              },
            ],
          });
          return state;
        }, []),
      },
      {
        marginTop: 5,
        fontSize: 10,
        bold: true,
        text: 'II) የስልጠና ሁኔታ',
      },
      {
        marginTop: 5,
        columns: [
          {
            text: 'የስልጠና ቦታ፡-',
            value: props.contract?.university || props.data?.university || props.student?.universityName 
          },
          {
            text: 'ዲፓርትመንት፡-',
            value: props.contract?.program || props.data?.program || props.student?.programName
          }
        ].reduce((state, el) => {
          state.push({
            width: 'auto',
            text: el.text
          })
          state.push({
            marginLeft: 5,
            width: 'auto',
            stack: [
              {
                bold: true,
                fontSize: 10,
                text: el.value,
              },
              {
                stack: [
                  {
                    canvas: [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 3,
                        x2: 150,
                        y2: 3,
                        lineWidth: 0.1,
                      },
                    ],
                  },
                ],
              },
            ],
          })
          return state
        }, [])
      },
      {
        marginTop: 5,
        columns: [
          {
            text: 'ስልጠናው የሚፈጀው ጊዜ፡',
            value: props.contract?.duration || props.data?.duration || props.student?.duration
          },
          {
            text: 'ወርሃዊ የገቢ:-',
            value: formatCurrency(props.contract?.salary || props.data?.salary || props.student?.salary)
          }
        ].reduce((state, el) => {
          state.push({
            width: 'auto',
            text: el.text
          })
          state.push({
            marginLeft: 5,
            width: 'auto',
            stack: [
              {
                bold: true,
                fontSize: 10,
                text: el.value,
              },
              {
                stack: [
                  {
                    canvas: [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 3,
                        x2: 120,
                        y2: 3,
                        lineWidth: 0.1,
                      },
                    ],
                  },
                ],
              },
            ],
          })
          return state
        }, [])
      },
      {
        marginTop: 10,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'አንቀጽ 3',
      },
      {
        marginTop: 5,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'የዉል ሰጪ ግዴታ',
      },
      {
        marginTop: 5,
        columns: [
          {
            width: 'auto',
            text: "1)"
          },
          {
            marginLeft: 5,
            text: ' ውል ተቀባይ በህክምና ስፔሻሊቲ ሥልጠና ሊይ እያሇ በመመሪያው መሠረት አስፈሊጊ የሆኑ ድጋፎችን የማድረግ ግዴታ አለበት፡፡'
          }
        ]
      },
      {
        marginTop: 5,
        columns: [
          {
            width: 'auto',
            text: "2)"
          },
          {
            marginLeft: 5,
            text: 'ውል ተቀባይ ሥልጠናዉን አጠናቆ ሲመለስ ሥራ ላይ የመመደብ ግዴታ አለበት፡፡'
          }
        ]
      },
      {
        marginTop: 5,
        columns: [
          {
            width: 'auto',
            text: "3)"
          },
          {
            marginLeft: 5,
            text: 'በመመሪያው ላይ ለዉል ተቀባይ የተሰጡ መብቶችን የመጠበቅ ግዴታ አለበት፡፡'
          }
        ]
      },
      {
        marginTop: 10,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'አንቀጽ 4',
      },
      {
        marginTop: 5,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'የዉል ተቀባይ ግዴታ',
      },
      'ዉል ተቀባይ፡-',
      {
        marginTop: 5,
        columns: [
          {
            width: 'auto',
            text: "1)"
          },
          {
            width: 'auto',
            marginLeft: 5,
            text: 'የህክምና ስፔሻሊቲ ስልጠናውን ሲያጠናቅቅ ዉል ሰጪ በሚመድበዉ ቦታ ለ',
          },
         
          {
            width: 'auto',
            marginLeft: 5,
            stack: [
              {
                bold: true,
                fontSize: 10,
                text: props.contract?.duration || props.data?.duration || props.student?.duration,
              },
              {
                stack: [
                  {
                    canvas: [
                      {
                        type: 'line',
                        x1: 0,
                        y1: 3,
                        x2: 50,
                        y2: 3,
                        lineWidth: 0.1,
                      },
                    ],
                  },
                ],
              },
            ]
            
          },
          ' ዓመት የማገልገል',
        ],
      },
      'ግዴታ አለበት፡፡',
      {
        marginTop: 5,
        columns: [
          {
            width: 'auto',
            text: "2)"
          },
          {
            stack: [
              {
                marginLeft: 5,
                text: 'የህክምና ስፔሻሉቲ ስሌጠናውን አጠናቅቆ በዚህ ዉል የገባዉን የአገልግሎት ግዴታ ሳሌወጣ ቢቀር'
              },
              {
                columns: [
                  {
                    width: 'auto',
                    stack: [
                      {
                        text: '  ',
                      },
                      {
                        canvas: [
                          {
                            type: 'line',
                            x1: 0,
                            y1: 3,
                            x2: 100,
                            y2: 3,
                            lineWidth: 0.1,
                          },
                        ],
                      },
                    ]
                  },
                  {
                    marginLeft: 5,
                    text: 'ብር ለዉል ሰጪ የመክፈሌ ግዴታ አለበት፡፡',
                    pageBreak: 'after'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        marginTop: 5,
        columns: [
          {
            width: 'auto',
            text: "3)"
          },
          {
            marginLeft: 5,
            text: 'ሌሎች በመመሪያው ላይ የተቀመጡ ዝርዝር ግዴታዎችን የመፈፀም ግዴታ አለበት፡፡'
          }
        ]
      },
      {
        marginTop: 10,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'አንቀጽ 6',
      },
      {
        marginTop: 5,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'የዉል ገዥ ሕግ',
      },
      {
        marginTop: 5,
        text: 'የዚህ ዉል አተረጓጎም እና አፈፃፀም አግባብነት ባለዉ የኢትዮጵያ ሕግ መሠረት ይሆናለ፡፡'
      },
      {
        marginTop: 10,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'አንቀጽ 7',
      },
      {
        marginTop: 5,
        decoration: 'underline',
        alignment: 'center',
        bold: true,
        text: 'ዉሉ ፀንቶ የሚቆይበት ጊዜ',
      },
      {
        marginTop: 5,
        columns: [
          {
            width: 'auto',
            text: "1)"
          },
          {
            width: 'auto',
            marginLeft: 5,
            text: 'ይህ ዉል በተዋዋይ ወገኖች ከተፈረመበት ቀን አንስቶ ውል ተቀባይ የውል ግዴታውን ሙለ በሙለ እስከሚወጣ ድረስ የፀና ይሆናል፡፡'
          },
        ]
      },
      {
        marginTop: 5,
        columns: [
          {
            width: 'auto',
            text: "2)"
          },
          {
            width: 'auto',
            marginLeft: 5,
            text: 'ተዋዋይ ወገኖች ፊርማቸውን ያስቀመጡት በተለያየ ቀናት ከሆነ መጨረሻ ላይ የተመለከተው ቀን ውል የተፈረመበት ቀን እንደሆነ ተደርጎ ይወሰዳል፡፡'
          },
        ]
      }
    ],
    pageMargins: [80, 70, 80, 20],
  };

  content.value = docDefinition;
}

getPdf();
</script>

<template>
  <div class="p-4 relative">
    <PdfMaker v-if="decodeURI" :content="content" />
  </div>
</template>
