<script setup>
  import PdfMaker from '@/features/certificate/components/PdfMaker.vue';
  import { formatCurrency, getBgbase64Url, secondDateFormat, toWords } from '@/utils/utils';
  import { computed, ref } from 'vue';

  const props = defineProps({
    debited: {
      type: Array,
      required: true
    },
    advice: {
      type: Object,
      requried: true
    }
  })

  const rectangle = {
    type: 'rect', // Define the shape type as a rectangle
    x: 5, // X-coordinate of the top-left corner
    y: 8,  // Y-coordinate of the top-left corner
    w: 20,  // Width of the rectangle
    h: 1,  // Height of the rectangle
    lineWidth: 10, // Optional: line width for the rectangle border
    fillColor: '#000000', // Optional: background color for the rectangle
    strokeColor: '#000000', // Optional: color of the rectangle border
  };

  const stamp = import.meta.env.v_REVENUE_STAMP
  const amount = import.meta.env?.v_PAYMENT_AMOUNT
  
  const numberOfPersons = computed(() => {
    return props.debited?.length
  })

  const totalAmount = computed(() => {
    return amount * numberOfPersons.value
  })

  const grandTotal = computed(() => {
    return totalAmountIncludingRs.value + numberOfPersons.value * stamp
  })

  const totalAmountIncludingRs = computed(() => {
    return amount * numberOfPersons.value
  })

  const content = ref()

  async function genPdf() {
    const bg = await getBgbase64Url('/crtificate_header.png')
    const docDefinition = {
      pageMargins: [20, 140, 20, 120],
      content: [
        {style: ['header', {alignment: 'center'}], text: 'Premium Debit Advice'},
        {
          alignment: 'right',
          stack: [
            {
              text: [
                {bold: true, text: 'Date: '},
                secondDateFormat(props.advice?.actionDate)
              ]
            },
            {
              text: [
                {bold: true, text: 'Debit Note Number: '},
                props.advice?.debitNoteNumber
              ]
            },
          ]
        },
        {
          bold: true,
          text: 'Bill To'
        },
        {
          columns: [
            {width: 20, text: ' '},
            {
              stack: [
                {
                  text: [
                    {text:'Customer : '},
                    {
                      decoration: 'underline',
                      text: props.advice?.agencyName
                    }
                  ]
                },
                {
                  text: [
                    {text:'Policy Number : '},
                    {
                      decoration: 'underline',
                      text: props.advice?.agencyPolicyNumber
                    }
                  ]
                },
                {
                  columns: [
                    {width: 60, bold: true, text:'Address : '},
                    {
                      stack: [
                        {
                          text: [
                            'City  ',
                            {text: props.advice?.address3, decoration: 'underline'}
                          ]
                        },
                        {
                          text: [
                            'Kebele  ',
                            {text: props.advice?.address4, decoration: 'underline'}
                          ]
                        },
                      ]
                    },
                    {
                      stack: [
                        {
                          text: [
                            'Sub City  ',
                            {text: props.advice?.address2, decoration: 'underline'}
                          ]
                        },
                        {
                          text: [
                            'H. No.  ',
                            {text: props.advice?.address5, decoration: 'underline'}
                          ]
                        },
                      ]
                    },
                    {
                      text: [
                        'Woreda  ',
                        {decoration: 'underline', text: props.advice?.address1}
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          marginTop: 3,
          bold: true,
          text: 'Dear Sir/Madam,'
        },
        'Please effect a New/ Additional premium payment for the insurance coverage as illustrated here under:',
        {
          alignment: 'right',
          table: {
            fontSize: 11,
            widths: [20, '*', '*', '*', '*', '*'],
            body: [
              [{style: 'tableHeader', text: 'S/N'}, {style: 'tableHeader', text:'TYPE OF POLICY'}, {style: 'tableHeader', text:'PERIOD'}, {style: 'tableHeader', text:'NUMBER OF MEMBER'}, {style: 'tableHeader', text:'UNIT PRICE'}, {style: 'tableHeader', text:'TOTAL AMOUNT(IN ETB)'}],
              [
                1,
                'Foreign Employment Insurance',
                `${secondDateFormat(props.advice?.beginDate)} to ${secondDateFormat(props.advice?.endDate)}`,
                numberOfPersons.value,
                formatCurrency(amount - stamp),
                formatCurrency(totalAmount.value)
              ],
              [
                {
                  colSpan: 3,
                  alignment: 'left',
                  stack: [
                    {
                      text: [
                        {
                          fontSize: 10,
                          text: 'Reason: New/Additional Premium'
                        }
                      ]
                    },
                    {
                      columns: [
                        {
                          width: 90,
                          text: [
                            'Reason for: ',
                            {bold: true, text: 'New'}
                          ],
                        },
                        {width: 35, canvas: [rectangle]},
                        {
                          text: [
                            {bold: true, text: 'Additional'},
                            '  --  '
                          ],
                        },
                        // {canvas: [rectangle]}
                      ]
                    }
                  ]
                }, {}, {}, {colSpan: 2, text: ' '}, {}, {}
              ],
              [
                {
                  alignment: 'left',
                  fontSize: 10,
                  colSpan: 3,
                  stack: [
                    {
                      bold: true,
                      text: 'Bank Account Information:'
                    },
                    
                  ]
                }, {}, {}, {colSpan: 2, text: ' '}, {}, {}
              ],
              [
                {
                  alignment: 'left',
                  fontSize: 10,
                  colSpan: 3,
                  text: 'Bank Name: Dashen Bank s.c'
                }, {}, {}, {colSpan: 2, text: ' '}, {}, {}
              ],
              [
                {
                  alignment: 'left',
                  fontSize: 10,
                  colSpan: 3,
                  text: 'Account Name/Holder: Nyala Insurance S.C.'
                }, {}, {}, {colSpan: 2, text: ' '}, {}, {}
              ],
              [
                {
                  alignment: 'left',
                  fontSize: 10,
                  colSpan: 3,
                  text: 'Bank Branch Name: Mickleland Branch'
                }, {}, {}, {colSpan: 2, text: ' '}, {}, {}
              ],
              [
                {
                  alignment: 'left',
                  fontSize: 10,
                  colSpan: 3,
                  text: 'Tell: +251-11-618-9021 Addis Ababa'
                }, {}, {}, {colSpan: 2, text: ' '}, {}, {}
              ],
              [
                {
                  alignment: 'left',
                  fontSize: 10,
                  colSpan: 3,
                  text: 'Account Number: 5136001250050'
                }, {}, {}, {colSpan: 2, text: 'Revenue Stamp'}, {
                }, {text: formatCurrency(numberOfPersons.value * stamp)}
              ],
              [
                {
                  alignment: 'left',
                  fontSize: 10,
                  colSpan: 3,
                  text: 'Swift Code: DASHETAA'
                }, {}, {}, {colSpan: 2, text: 'Total Amount Including R/S'}, {}, {
                  text: formatCurrency(grandTotal.value)
                }
              ],
            ]
          },
          layout: {
            fillColor: function (rowIndex, node, columnIndex) {
                return (rowIndex === 0) ? '#DDD' : null;
            }
          }
        },
        {
          text: [
            'Therefore, you are hereby requested to settle a total premium of ETB ',
            {bold: true, text: formatCurrency(grandTotal.value)},
            ` (`,
            {text: toWords(grandTotal.value), bold: true},
            ') for the attached ',
            {bold: true, text: numberOfPersons.value},
            ' persons at the shortest possible time.'
          ]
        },
        {
          marginTop: 40,
          stack: [
            {
              canvas: [
                {
                  type: 'line',
                  x1: 0, y1: 3,
                  x2: 200, y2: 3,
                  lineWidth: .1
                },
              ],
              marginBottom: 5,
            },
            'For and on behalf of',
            'NYALA INSURANCE COMPANY (S.C)',
            'Signed on ' + secondDateFormat(new Date())
          ],
          pageBreak: 'after'
        },
        {
          table: {
            fontSize: 11,
            widths: [20, '*', '*', '*', '*', '*'],
            body: [
              ['#', 'FULL NAME', 'GENDER', 'PHONE', 'PASSPORT NUMBER', 'DESTINATION'],
              ...props.debited?.map((el, idx) => {
                return [idx + 1, `${el?.title} ${el?.firstName} ${el?.fatherName}, ${el?.grandFatherName}`, el?.gender, el?.phone, el?.passportNumber, el?.countryOfDestination]
              })
            ]
          }
        }
      ],
      styles: {
        tableHeader: {
          fontSize: 10,
          bold: true,
        }
      },
      background: {
        image: bg,
        width: 600
      }
    }

    content.value = docDefinition
  }

  genPdf()
</script>

<template>
  <PdfMaker v-if="content" :content="content" />
</template>