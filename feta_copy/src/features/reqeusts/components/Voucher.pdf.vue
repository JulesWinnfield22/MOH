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
    },
    approver: {
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
        {style: ['header', {alignment: 'center'}], text: 'Premium Receipt Voucher'},
        {
          alignment: 'right',
          stack: [
            {
              text: [
                {bold: true, text: 'Date: '},
                secondDateFormat(props.debited?.[0]?.paidDate)
              ]
            },
            {
              text: [
                {bold: true, text: 'Voucher Number: '},
                props.debited?.[0]?.certificatePaymentNumber
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
            widths: [20, '*', '*', '*'],
            body: [
              [{style: 'tableHeader', text: 'S/N'}, {style: 'tableHeader', text:'NUMBER OF CERTIFICATES'}, {style: 'tableHeader', text:'UNIT PRICE'}, {style: 'tableHeader', text:'TOTAL AMOUNT(IN ETB)'}],
              [
                1,
                numberOfPersons.value,
                formatCurrency(amount - stamp),
                formatCurrency(totalAmount.value)
              ],
              [
                {},
                {text: 'Revenue Stamp', colSpan: 2}, {}, {text: formatCurrency(numberOfPersons.value * stamp)}
              ],
              [
                {},
                {
                  text: 'Total Amount Including R/S',
                  colSpan: 2,
                }, {}, {
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
          columns: [
            {
              alignment: 'center',
              stack: [
                `${props.approver?.[0]?.paidByFirstName} ${props.approver?.[0]?.paidByFatherName}`,
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
                'Approved by',
                {
                  text: [
                    'Approved date ',
                    {
                      bold: true,
                      text: secondDateFormat(props.approver?.[0]?.debitedDate)
                    } 
                  ]
                }
              ],
            },
            {
              alignment: 'center',
              stack: [
              `${props.approver?.[0]?.paidByFirstName} ${props.approver?.[0]?.paidByFatherName}`,
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
                'Paid by',
                {
                  text: [
                    'Paid Date ',
                    {
                      bold: true,
                      text: secondDateFormat(props.approver?.[0]?.paidDate)
                    }
                  ]
                }
              ],
            },
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