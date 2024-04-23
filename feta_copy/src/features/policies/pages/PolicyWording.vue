<script setup>
import pdfMake from 'pdfmake/build/pdfmake.js';
import pdfFonts from 'pdfmake/build/vfs_fonts.js';
import { ref } from 'vue';
import { useApiRequest } from '@composable/useApiRequest'
import { getAgency } from '@/features/agencies/api/agenciesApi';
import { useRoute } from 'vue-router';
import { secondDateFormat } from '@/utils/utils'

const agencyRequest = useApiRequest()

const route = useRoute()

const id = route.params.id

const agency = ref()

function addTowYear(date) {
	const givenDate = new Date(date);

// Add two years
	const modifiedDate = new Date(givenDate);
	modifiedDate.setFullYear(modifiedDate.getFullYear() + 2);

	console.log(modifiedDate);
	return modifiedDate
}

agencyRequest.send(
	() => getAgency(id),
	res => {
		console.log(res)
		if(res.success) {
			agency.value = res.data
			genPdf()
		}
	}
)

const sections = [
	'3.1.  Intentional self-injury suicide, intemperance’s, participation in any criminal acts while sane or insane;',
	'3.2.  Accident occurring while or because the insured is effected by alcohol or any drug;',
	'3.3.  War, armed intentional conflict (whether war be declared or not);',
	'3.4.  Terrorist or insurgency activities, uprising, civil commotion, rebellion, sedition, sabotage or any activity associated with the foregoing, or the defence, quelling, investigation or containment thereof by any security force; or',
	'3.5.  Heat-stroke or sunstroke;',
	'3.6.  Participation in any brawl;',
	'3.7.  Hernia, ptomaine or bacterial infection (except gynogenic infection which shall occur with and through an accidental cut or wound);',
	'3.8.  Any disease or sickness;',
	'3.9.  Poison, gas fumes, voluntarily or involuntarily taken;',
	'3.10. Entering, operating, or servicing, ascending or descending from or with any aerial service or conveyance except while the Assured is a passenger in an aircraft operated by a commercial passenger trip over its established passenger route;',
	'3.11. Pregnancy or childbirth;',
	'3.12. Earthquake, volcanic eruption or other convulsion of nature.'
];

const sections4 = [
	'4.1. The Agency shall supply The Company with a list of Assureds to be covered with copies of their valid passports, and completed and signed Beneficiary Forms in respect of each Assured.',
	'4.2. The Agency shall pay the premium on behalf of the Assured to the Bank Account of the Company.',
	'4.3. Payment can be made by bank or using any electronical transfer method internet or mobile banking as appropriate.',
	'4.4. The Agency shall alternatively login in The Company portal system designed for this purpose and fill the necessary data for each Assured as indicated in the attached certificate of life insurance as appropriate.',
	'4.5. If the Agency uses the on-line portal system, it shall print the approved insurance certificate and deliver the original to the Assured and retain copy for itself.',
	'4.6. The following documents shall be submitted to the Company at the time of claims.\na) Written claim notification stating the date and the place of death.'
];

const sections4Sub = [
	'    b) Death Certificate stating the date, time and cause of death issued by a recognized hospital in the Country of employment and certified by the Ethiopian Embassy there.',
	'    c) Original Insurance Certificate',
	'    d) Any further documents as may be required by The Company.',
	'4.7. No claim in respect of a deceased Assured shall be admitted by The Company unless The Company receives written notice thereof within Two months after the date of death and receive the required documents, within four months of the notification of death or two months after an inquest in respect of the death of the Assured.',
	'4.8 The Company shall effect payment to the Assured dependents /beneficiaries, as specified in the Designation of Beneficiary Form for natural and accidental death.',
	'4.9 To consider Mental Disorder claim, The Company shall require proof beyond doubt from a recognized mental Hospital that the Assured is totally and permanently mentally impaired. The Company shall have the right to have the Assured be revalued by a Mental Hospital in Ethiopia.',
	'4.10. Mental Disorder and or permanent disabilities due to rape claim requests have to be supported by the following official documents:',
	'    a. Police Report from the country of employment',
	'    b. Medical Certificate from a Hospital of the country of employment.',
	'    c. The above Documents have to be certified by the Ethiopian Embassy where the incident had happened. The Company has the right to review the document as appropriate.',
	'4.11. The Agency shall supply The Company with such forms and other as The Company may require for the purposes of this policy.',
	'4.12. The Company shall have the right to inspect the records kept by the Agency in connection with this policy. Should it become evident from such inspection that a claim has been admitted in respect of a person who was not entitled to a benefit under this policy, The Company shall, notwithstanding anything to the contrary contained in this policy, recover from the Agency the amount of such claim.'
];

pdfMake.vfs = pdfFonts.pdfMake.vfs;


async function getLogoBase64() {
	return new Promise(async (res) => {
		const logoBlob = await (await fetch('/logo.png')).blob()
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64Image = reader.result;
			res(base64Image)
		};
		reader.readAsDataURL(logoBlob);
	})
}
async function getBgbase64() {
	return new Promise(async (res) => {
		const logoBlob = await (await fetch('/crtificate_header.png')).blob()
		const reader = new FileReader();
		reader.onloadend = () => {
			const base64Image = reader.result;
			res(base64Image)
		};
		reader.readAsDataURL(logoBlob);
	})
}

const tableData = [
	['NO', 'Details of Cover / Benefits', 'Amount in Birr'],
	['1', 'Death', '1,350,000.00'],
	['1.1', 'Natural Death Including Suicide', '1,350,000.00'],
	['1.2', 'Acidental Death', 'Up to 1,350,000.00'],
	['2', 'Disabilities - Due to Accident', 'Up to 1,350,000.00'],
	['2.1', 'Total and permanent Disability (not able to perform any duty)', 'Up to 1,350,000.00'],
	['2.2', 'Partial Permanent Disability (percentage based on medical certificate up to)', 'Up to 1,350,000.00'],
	['2.3', 'Total Mental impairment.', 'Up to 1,350,000.00'],
	['3', 'Funeral and related matters', 'UP to 250,000.00'],
	['3.1', 'Return of Corpse', 'UP to 250,000.00'],
	['3.2', 'Coffin and Vault', 'UP to 250,000.00'],
	['3.3', 'Return of Deceased ‘s Property', 'UP to 250,000.00'],
	['3.4', 'Medical Expense Related to funeral', 'Up to 1,350,000.00'],
	['4', 'Rape and related matters', 'UP to 250,000.00'],
	['4.1', 'Mental impairment due to rape', 'Up to 1,350,000.00'],
	['4.2', 'Physical disability due to rape (percentage of disability by medical Board) up to', 'Up to 1,350,000.00'],
]
const file = ref()
async function genPdf() {
	const bg = await getBgbase64()
	// const logo = await getLogoBase64()

	const header = [
		{ text: 'NYALA INSURANCE SHARE COMPANY', style: 'headerFirst' },
		{ text: 'FOREIGN EMPLOYMENT TERM ASSURANCE POLICY ', style: 'subheaderFirst' },
		{ text: '(NISCO-FETAP)', style: 'subheaderFirst' },
		{ text: 'ATTACHING AND FORMING AN INTGRAL PART OF GROUP TERM LIFE ASSURANCE POLICY FOR FOREIGN EMPLOYEMMENT', style: 'subheaderFirst' },
		{
			columns: [
				{
					width: 150,
					text: 'Policy No'
				},
				{
					width: 5,
					text: ' '
				},
				{
					stack: [
						{
							text: agency.value?.agencyPolicyNumber
						},
						{
							stack: [
								{
									canvas: [
										{
											type: 'line',
											x1: 0, y1: 3,
											x2: 260, y2: 3,
											lineWidth: 1
										},
									]
								}
							]
						}
					]
				},
			]
		},
		{
			columns: [
				{
					width: 150,
					text: 'Effective Date'
				},
				{
					width: 5,
					text: ' '
				},
				{
					stack: [
						{
							text: secondDateFormat(agency.value?.beginDate)
						},
						{
							stack: [
								{
									canvas: [
										{
											type: 'line',
											x1: 0, y1: 3,
											x2: 260, y2: 3,
											lineWidth: 1
										},
									]
								}
							]
						}
					]
				},
			]
		},
		{
			margin: [0, 5, 0, 0],
			columns: [
				{
					width: 150,
					text: 'Policy Owner /Agency'
				},
				{
					width: 5,
					text: ' '
				},
				{
					stack: [
						{
							text: agency.value?.agencyName
						},
						{
							stack: [
								{
									canvas: [
										{
											type: 'line',
											x1: 0, y1: 3,
											x2: 260, y2: 3,
											lineWidth: 1
										},
									]
								}
							]
						}
					]
				},
			]
		},
		{
			margin: [0, 5, 0, 0],
			columns: [
				{
					width: 150,
					text: 'Address'
				},
				{
					width: 5,
					text: ' '
				},
				{
					stack: [
						{
							text: `${agency.value?.address1}, ${agency.value?.address2}, ${agency.value?.address3}, ${agency.value?.state}, ${agency.value?.country}`
						},
						{
							stack: [
								{
									canvas: [
										{
											type: 'line',
											x1: 0, y1: 3,
											x2: 260, y2: 3,
											lineWidth: 1
										},
									]
								}
							]
						}
					]
				},
			]
		},
		{
			margin: [0, 10, 0, 0],
			style: {
				fontSize: 11
			},
			table: {
				widths: [20, '*', '20%'],
				body: tableData
			}
		},
		{
			text: 'The Maximum Sum payable in respect of any one period of insurance shall not exceed the Sum Insured as stated in the above Table'
		},
		{
			pageBreak: 'after',
			margin: [0, 15, 0, 0],
			columns: [
				{
					stack: [
						{
							canvas: [
								{
									type: 'line',
									x1: 0, y1: 3,
									x2: 200, y2: 3,
									lineWidth: 2
								},
							]
						},
						{
							text: 'For and on behalf of', margin: [0, 5, 0, 0]
						},
						{
							margin: [0, 5, 0, 0],
							text: 'NYALA INSURANCE S.C', style: {
								fontSize: 11
							}
						},
						{
							margin: [0, 0, 0, 0],
							columns: [
								{
									width: 80,
									text: 'Signed on this', margin: [0, 5, 0, 0]
								},
								{
									stack: [
										{
											text: ' '
										},
										{
											canvas: [
												{
													type: 'line',
													x1: 0, y1: 3,
													x2: 30, y2: 3,
													lineWidth: 1
												},
											]
										}
									]
								},
								{
									alignment: 'bottom',
									margin: [-70, 5, 0, 0],
									text: 'day of'
								},
								{
									margin: [-140, 0, 0, 0],
									stack: [
										{
											text: ' '
										},
										{
											canvas: [
												{
													type: 'line',
													x1: 0, y1: 3,
													x2: 30, y2: 3,
													lineWidth: 1
												},
											]
										}
									]
								},
								{
									margin: [-215, 5, 0, 0],
									text: (new Date()).getFullYear()
								}
							]
						}
					]
				},
			]
		},
	];

	const page1Content = [
		{ text: 'NYALA INSURANCE SHARE COMPANY', margin: [0, 100, 0, 0], style: 'headerFirst' },
		{ text: 'FOREIGN EMPLOYMENT TERM ASSURANCE POLICY', style: 'subheaderFirst' },
		{ text: '(NISCO-FETAP)', style: 'subheaderFirst' },
		{ text: '1. THE PREAMBLE', style: 'sectionHeader' },
		{ text: 'Whereas the Policy owner/Agency named in the Schedule of the Policy has paid the premium stated in each and every Policy Certificate to Nyala Insurance Company (hereinafter called The Company) on behalf of the Assured stated in the certificate of life insurance who travel to the place described in the Certificate in consideration for the Insurance granted by this Policy for a period as indicated in the Certificate;', style: 'paragraph', margin: [0, 10, 0, 0] },
		{ text: 'Now this policy witnesses that subject to the Terms, Exception and Conditions contained herein or endorsed hereon if the Assured shall sustain accidental, natural death and disability the Company upon receipt of satisfactory proof, be subject and liable to make good and satisfy to the Assured (in the event of death of the Assured to the Beneficiaries as stated and signed on the Beneficiary form) the Capital sums or Benefits set out in the Schedule of Benefits;', style: 'paragraph' },
		{ text: `Provided always that if the Assured shall, at any time subsequent to the date of accepting or effecting this Policy be insured against death or disablement by accident or natural death or additional covers stated in the schedule will be applicable only for the destination stated on the Policy Certificate. If the death or disablement occurred at any other country not mentioned on the Certificate, then this policy shall become absolutely void and no claim shall be paid in respect thereof.`, style: 'paragraph' },
		{ text: `Provided also that if anything averted in the life insurance certificates (data inserted by the Agency) and Beneficiary form hereinbefore referred to be untrue, or if this policy be obtained through the withholding or misrepresenting of any material fact, or if the Assured becomes of intemperate habits, or makes any false statement in support of a claim, this policy shall be void and all premium paid in respect thereof shall be forfeited to the Company.`, style: 'paragraph' },
		{ text: '2. DEFINITIONS', style: 'sectionHeader' },
		{ text: `The following words and expressions used in this policy have been defmed to prevent any doubt about their respective meanings. Unless the context indicates otherwise, the following terms and expression below shall have the following meanings:`, style: 'paragraph' },
		{
			margin: [0, 5, 0, 0],
			columns: [
				{
					style: 'paragraph',
					text: 'ACCIDENT:', style: 'sectionHeader',
					width: 150,
				},
				{
					style: 'paragraph',
					text: 'An unlocked- for event, which could not reasonably be expected to occur and/or was not designed. And which result in death or total permanent or partial permanent disability caused directly and independently of all other causes by some external and visible means arising from the said events.',
					width: '*',
				}
			],
		},
		{
			margin: [0, 5, 0, 0],
			columns: [
				{
					width: 150,
					text: 'POLICY OWNER! AGENCY:', style: 'sectionHeader',
				},
				{
					style: 'paragraph',
					text: 'Shall mean, a legally established and licensed agency that sends persons for employment out of Ethiopia.',
					width: '*',
				}
			],
		},
		{
			margin: [0, 5, 0, 0],
			columns: [
				{
					width: 150,
					text: 'BENEFIT:', style: 'sectionHeader',
				},
				{
					style: 'paragraph',
					text: 'Benefits set out in the SCHEDULE',
					width: '*',
				}
			],
		},
		{
			pageBreak: 'after',
			margin: [0, 5, 0, 0],
			columns: [
				{
					width: 150,
					text: 'ASSURED:', style: 'sectionHeader',
				},
				{
					style: 'paragraph',
					text: 'A person who holds valid insurance certificates in her/his name for his travel to foreign country for employment',
					width: '*',
				}
			],
		}
		//... Rest of the content

		// Truncated content for brevity
	];

	const page2Content = [
		{
			margin: [0, 100, 0, 0],
			columns: [
				{
					style: 'paragraph',
					text: 'SCHEDULE:', style: 'sectionHeader',
					width: 150,
				},
				{
					style: 'paragraph',
					text: 'The schedule of benefits.',
					width: '*',
				}
			],
		},
		{
			columns: [
				{
					width: 150,
					text: 'INSURANCE CERTFICATES:', style: 'sectionHeader',
				},
				{
					style: 'paragraph',
					text: 'A Certificates issued by the Company as evidence of insurance cover for his foreign employment.',
					width: '*',
				}
			],
		},
		{
			columns: [
				{
					width: 150,
					text: 'THE COMPANY:', style: 'sectionHeader',
				},
				{
					style: 'paragraph',
					text: 'The Insurer, Nyala Insurance Company SC.',
					width: '*',
				}
			],
		},
		{ text: '3. EXCEPTIONS: APPLICABLE FOR THE ACCIDENT COVER', style: 'sectionHeader' },
		...sections.map(section => ({ text: section, style: 'subheader' })),
		{ text: "4. SUBHEADER", style: "sectionHeader" },
		{ text: "", style: "paragraph" },
		...sections4.map((section, idx) => {
			const breakPage = {}
			if(idx == sections4.length - 1) {
				breakPage.pageBreak = 'after'
			}
			return {
				text: section, style: 'subheader',
				...breakPage
			}
		}),
	];

	const page3Content = [
		...sections4Sub.map((section, idx) => ({ text: section, margin: [0, idx == 0 ? 100 : 0, 0, 5], style: 'subheader' })),
		{ text: '5. APPLICABLE LAW AND JURISDICTION', style: 'sectionHeader' },
		{ text: 'This policy and its applicability is governed by the Federal laws of Ethiopia. In case of dispute Ethiopian courts will have the jurisdictions to see the cases.', style: 'paragraph' },
		{
			margin: [0, 70, 0, 0],
			columns: [
				{
					alignment: 'center',
					stack: [
						{
							canvas: [
								{
									type: 'line',
									x1: 0, y1: 3,
									x2: 200, y2: 3,
									lineWidth: 2
								},
							]
						},
						{
							text: 'For and on behalf of', margin: [0, 5, 0, 0]
						},
						{
							margin: [0, 5, 0, 0],
							text: 'NYALA INSURANCE S.C', style: {
								fontSize: 15
							}
						},
						{
							alignment: 'center',
							margin: [150, 5, 0, 0],
							alignment: 'bottom',
							columns: [
								{
									width: 80,
									text: 'Signed on this', margin: [0, 5, 0, 0]
								},
								{
									stack: [
										{
											text: ' '
										},
										{
											canvas: [
												{
													type: 'line',
													x1: 0, y1: 3,
													x2: 30, y2: 3,
													lineWidth: 1
												},
											]
										}
									]
								},
								{
									alignment: 'bottom',
									margin: [-30, 5, 0, 0],
									text: 'day of'
								},
								{
									margin: [-65, 0, 0, 0],
									stack: [
										{
											text: ' '
										},
										{
											canvas: [
												{
													type: 'line',
													x1: 0, y1: 3,
													x2: 30, y2: 3,
													lineWidth: 1
												},
											]
										}
									]
								},
								{
									margin: [-95, 5, 0, 0],
									text: (new Date()).getFullYear()
								}
							]
						}
					]
				},
			]
		},
	];

	const docDefinition = {
		content: [
			header,
			page1Content,
			page2Content,
			page3Content
		],
		background: [
			{
				image: bg,
				width: 600 // Adjust width as needed
			}
		],
		footer: {
			marginRight: 20,
			style: {
				color: '#fff'
			},
			text: agency.value.agencyPolicyNumber,
			alignment: 'right'
		},
		styles: {
			column: {
				border: true, // Add a black bottom border with 2px thickness
				lineWidth: 2, // Add a black bottom border with 2px thickness
				borderColor: '#000000', // Add a black bottom border with 2px thickness
			},
			header: {
				fontSize: 15,
				bold: true,
				margin: [0, 0, 0, 10],
				alignment: 'center'
			},
			headerFirst: {
				fontSize: 15,
				bold: true,
				margin: [0, 100, 0, 5],
				alignment: 'center'
			},
			subheader: {
				fontSize: 10,
				bold: true,
				margin: [0, 5, 0, 5],
				alignment: 'center'
			},
			subheaderFirst: {
				fontSize: 10,
				bold: true,
				margin: [0, 5, 0, 5],
				alignment: 'center'
			},
			sectionHeader: {
				fontSize: 10,
				bold: true,
				margin: [0, 5, 0, 5],
			},
			paragraph: {
				fontSize: 11,
				margin: [0, 5, 0, 0]
			},
			subheader: {
				fontSize: 11,
				margin: [5, 5, 0, 0]
			}
		}
	};

	pdfMake.createPdf(docDefinition).getBlob(blob => {
		file.value = URL.createObjectURL(blob)
	})
}
</script>
<template>
	<embed type='application/pdf' :src='file' frameborder="0" width="100%" height="600" />
</template>