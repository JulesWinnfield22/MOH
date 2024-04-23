<script setup>
  import PdfMaker from '@/features/certificate/components/PdfMaker.vue'
  import { formatCurrency, getBgbase64Url, secondDateFormat, toWords } from '@/utils/utils';
  import { computed, ref } from 'vue'

  const props = defineProps({
    beneficiaries: {
      type: Array,
      required: true
    },
    claim: {
      type: Object,
      required: true
    },
    services: {
      type: Array,
      required: true
    },
    details: {
      type: Array,
      required: true
    }
  })

  console.log(props.details)

  const content =  ref('')

  const totalAmount = computed(() => props.services?.reduce((sum, el) => sum += el.amount, 0))

  const death = computed(() => {
    return props.services.find(el => el.category == 'Death')
  })

  async function genPdf() {
    const bg = await getBgbase64Url("/crtificate_header.png");
    const sign = await getBgbase64Url("/sign.png");
    const stamp = await getBgbase64Url("/Nyala_stamp.png");    
    
    const docDefinition = {
      content: [
        {
          style: 'header',
          text: 'Claim Payment Order'
        },
        {
          alignment: 'right',
          stack: [
            {
              text: [
                {bold: true, text: 'Date: '},
                secondDateFormat(props.claim?.paymentOrderDate)
              ]
            },
            {
              text: [
                {bold: true, text: 'Payment Order Number: '},
                props.claim?.paymentOrderNumber
              ]
            }
          ]
        },
        {text: "Particulars Of the Policy", bold: true},
        {
          marginLeft: 10,
          stack: [
            {
              columns: [
                {
                  width: 120,
                  text: 'Member name:'
                },
                {
                  decoration: 'underline',
                  text: `${props.claim?.firstName} ${props.claim?.fatherName} ${props.claim?.grandFatherName}`
                }
              ]
            },
            {
              columns: [
                {
                  width: 120,
                  text: 'Certificate Number: '
                },
                {
                  decoration: 'underline',
                  text: props.claim?.certificateNumber
                }
              ]
            },
            {
              marginTop: 5,
              columns: [
                {
                  bold: true,
                  width: 120,
                  text: 'Agency: '
                },
                {
                  stack: [
                    {
                      text: ['Name - ', {decoration: 'underline', text: props.claim?.agencyName}]
                    },
                    {
                      text: ['Policy Number - ', {decoration: 'underline', text: props.claim?.agencyPolicyNumber}]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {text: "Particulars Of the Claim", bold: true},
        {
          marginLeft: 10,
          stack: [
            {
              columns: [
                {
                  width: 120,
                  text: 'Claim Number: '
                },
                {
                  decoration: 'underline',
                  text: props.claim?.claimNumber
                }
              ]
            },
            {
              columns: [
                {
                  width: 120,
                  text: 'Claim Date: '
                },
                {
                  decoration: 'underline',
                  text: secondDateFormat(props.claim?.claimDate)
                }
              ]
            },
          ]
        },
        {
          table: {
            alignment: 'right',
            widths: [20, '*', '*', '*'],
            body: [
              [{text: 'SN', bold: true}, {text: 'Type Of Claim', bold: true}, {text: 'Category', bold: true}, {text: 'Payable Amount', bold: true}],
              ...props.services.reduce((rows, service, idx) => {
                const row = []
                row.push(idx + 1)
                row.push(service.item)
                row.push(service.category)
                row.push(formatCurrency(service.amount))
                rows.push(row)
                return rows
              }, []),
              [
                {colSpan: 3, text: ' '}, {}, {},
                {
                  text: formatCurrency(totalAmount.value)
                }
              ]
            ]
          }
        },
        {
          text: [
            'Therefore, you are hereby requested to settle a total premium of ',
            {bold: true, text: formatCurrency(totalAmount.value)},
            ' ( ',
            {bold: true, text: toWords(totalAmount.value)},
            ' )',
            ' for the attached ',
            {text: props.beneficiaries?.length, bold: true},
            ' persons at the shortest possible time.'
          ]
        },
        {
          bold: true,
          text: 'Dear/Madam,'
        },
        'Please effect the payment for the insurance coverage as illustrated here under: ',
        {text: 'Particulars Of the Payment', bold: true},
        {
          table: {
            alignment: 'right',
            widths: [20, '*', '*', '*', '*'],
            body: [
              [{text: 'SN', bold: true}, {text: 'Full Name', bold: true}, {text: 'Relationship', bold: true}, {text: 'Share(%)', bold: true}, {text: 'Amount', bold: true}],
              ...props.beneficiaries.reduce((rows, beneficiary, idx) => {
                const row = []
                row.push(idx + 1)
                row.push(beneficiary.fullName)
                row.push(beneficiary.relationship)
                row.push(`${beneficiary.share}%`)
                row.push(formatCurrency(death.value.amount * beneficiary.share / 100))
                rows.push(row)
                return rows
              }, []),
              [
                {colSpan: 4, text: ' '}, {}, {}, {},
                {
                  text: formatCurrency(death.value?.amount)
                }
              ]
            ]
          }
        },
        {
          marginTop: 5,
          columns: [
            {
              stack: [
                {
                  text: [
                    'Proccessed by: ',
                    {decoration: 'underline', text: props.details?.[0].reviewedByFirstName + " " + props.details?.[0].reviewedByFatherName}
                  ]
                },
                {
                  text: [
                    'Date: ',
                    {decoration: 'underline', text: secondDateFormat(props.details?.[0].reviewedDate)}
                  ]
                },
                {
                  columns: [
                    {
                      width: 70,
                      stack: [
                        {
                          text: ' ',
                        },
                        {
                          width: 50, height: 50,
                          text: [
                            'Signiture: ',
                          ]
                        }
                      ]
                    },
                    {
                      stack: [
                        {
                          width: 50, height: 50,
                          image: sign,
                        },
                        {
                          canvas: [
                            {
                              type: 'line',
                              x1: 0, y1: 3,
                              x2: 100, y2: 3,
                              lineWidth: .1
                            },
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              stack: [
                {
                  text: [
                    'Approved by: ',
                    {decoration: 'underline', text: props.details?.[0].approvedByFirstName + " " + props.details?.[0].approvedByFatherName}
                  ]
                },
                {
                  text: [
                    'Date: ',
                    {decoration: 'underline', text: secondDateFormat(props.details?.[0].approvedDate)}
                  ]
                },
                {
                  columns: [
                    {
                      width: 70,
                      stack: [
                        {
                          text: ' ',
                        },
                        {
                          width: 50, height: 50,
                          text: [
                            'Signiture: ',
                          ]
                        }
                      ]
                    },
                    {
                      stack: [
                        {
                          width: 50, height: 50,
                          image: sign,
                        },
                        {
                          canvas: [
                            {
                              type: 'line',
                              x1: 0, y1: 3,
                              x2: 100, y2: 3,
                              lineWidth: .1
                            },
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              stack: [
                {
                  text: [
                    'Authorized by: ',
                    {decoration: 'underline', text: props.details?.[0].authorizedByFirstName + " " + props.details?.[0].authorizedByFatherName}
                  ]
                },
                {
                  text: [
                    'Date: ',
                    {decoration: 'underline', text: secondDateFormat(props.details?.[0].authorizedDate)}
                  ]
                },
                {
                  columns: [
                    {
                      width: 70,
                      stack: [
                        {
                          text: ' ',
                        },
                        {
                          width: 50, height: 50,
                          text: [
                            'Signiture: ',
                          ]
                        }
                      ]
                    },
                    {
                      stack: [
                        {
                          width: 50, height: 50,
                          image: sign,
                        },
                        {
                          canvas: [
                            {
                              type: 'line',
                              x1: 0, y1: 3,
                              x2: 100, y2: 3,
                              lineWidth: .1
                            },
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
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
    }
    
    content.value = docDefinition;
  }

  genPdf()
</script>

<template>
  <PdfMaker
    v-if="content"
    :content="content"
  />
</template>