import { reactive } from "vue";

export const chartData = reactive({
  barOptions: {
    chart: {
      id: "claims-bar",
    },
    xaxis: {
      categories: [],
    },
  },
  series: [
    {
      name: "Number of total paid claims",
      data: [],
    },
  ],

  policyHolderOrCoverTypesSeries: [
    {
      name: "Total Loss",
      data: [106, 55, 57],
      color: "#F44336",
    },
    {
      name: "Total Gain",
      data: [10, 85, 101],
      color: "#10B981",
    },
  ],

  policyHolderOrCoverTypesOptions: {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Bole", "Megenagna", "Summit"],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
      },
    },
    fill: {
      opacity: 1,
      colors: ["#F44336", "#10B981"],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  },

  paidClaimsByProvidersAndServiceTypesOptions: {
    chart: {
      type: "bar",
      stacked: true,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "50%",
      },
    },
    colors: ["#F44336", "#10B981", "#FFC107", "#3F51B5", "#9C27B0", "#FF5722"],
    xaxis: {
      categories: [
        "Addis Hiwot",
        "Teklhaymanot",
        "Hayat Hospital",
        "Amen Hospital",
        "Bete zata",
      ],
    },
    yaxis: {
      title: {
        text: "Paid Claims",
      },
    },
    legend: {
      position: "bottom",
      offsetY: 5,
      markers: {
        width: 10,
        height: 10,
        radius: 12,
      },
    },
  },
  paidClaimsByProvidersAndServiceTypesSeries: [
    {
      name: "Laboratory",
      data: [44, 55, 41, 67, 22],
    },
    {
      name: "Pharmacy",
      data: [13, 23, 20, 8, 13],
    },
    {
      name: "surgical service",
      data: [11, 17, 15, 15, 21],
    },
    {
      name: "Radiotherapy",
      data: [21, 7, 25, 13, 22],
    },
    {
      name: "Dental",
      data: [11, 27, 7, 15, 18],
    },
  ],
  // Total Claims Created by Insurer/Provider/Claimants:
  TotalClaimsCreatedByInsurerOptions: {
    chart: {
      type: "donut", // or 'pie'
    },
    labels: ["Insurer 1", "Insurer 2", "Insurer 3", "Insurer 4", "Insurer 5"],
    legend: {
      position: "bottom",
      offsetY: 5,
      markers: {
        width: 10,
        height: 10,
        radius: 12,
      },
    },
  },
  TotalClaimsCreatedByInsurerSeries: [44, 55, 13, 43, 22],

  // Total Number of Claims Submitted, Paid, and Rejected by Policyholder:

  TotalNumberOfClaimsSubmittedPaidRejectedByPolicyholderOptions: {
    chart: {
      type: "bar",
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Bole", "Megenagna", "Summit", "Ayat", "Mexico"],
    },
    yaxis: {
      title: {
        text: "Number of Claims",
      },
    },
    fill: {
      opacity: 1,
      colors: ["#0000FF", "#10B981", "#F44336"],
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "$ " + val + " thousands";
        },
      },
    },
  },

  TotalNumberOfClaimsSubmittedPaidRejectedByPolicyholderSeries: [
    {
      name: "Submitted",
      data: [44, 55, 41, 67, 22],
    },
    {
      name: "Paid",
      data: [13, 23, 20, 8, 13],
    },
    {
      name: "Rejected",
      data: [11, 17, 15, 15, 21],
    },
  ],

  // Total Number of insured persons by institution

  TotalNumberOfInsuredPersonsByInstitution: [
    {
      name: "Qatar",
      data: [31, 40, 28, 51, 42, 109, 100],
    },
    {
      name: "UAE",
      data: [11, 32, 45, 32, 34, 52, 41],
    },
    {
      name: "Saudi Arabia",
      data: [134, 42, 11, 41, 22, 33, 44],
    },
    {
      name: "Oman",
      data: [2, 42, 66, 77, 88, 99, 111],
    },
    {
      name: "Jordan",
      data: [2, 42, 66, 77, 88, 99, 111],
    },
  ],
  TotalNumberOfInsuredPersonsByInstitutionOptions: {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T02:30:00.000Z",
        "2018-09-19T03:30:00.000Z",
        "2018-09-19T04:30:00.000Z",
        "2018-09-19T05:30:00.000Z",
        "2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  },

  // Total Premium Collected by Policyholders:
  TotalPremiumCollectedByPolicyholders: [44, 55, 41, 17, 15],
  TotalPremiumCollectedByPolicyholdersOptions: {
    chart: {
      type: "donut",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  },
});

export const BarOptions = {
  chart: {
    id: "claims-bar",
  },
  xaxis: {
    categories: [],
  },
};

export const series = [
  {
    name: "Number of total paid claims",
    data: [],
  },
];

export const PolicyHolderOrCoverTypesSeries = [
  {
    name: "Total Loss",
    data: [106, 55, 57],
    color: "#F44336",
  },
  {
    name: "Total Gain",
    data: [10, 85, 101],
    color: "#10B981",
  },
];

export const PolicyHolderOrCoverTypesOptions = {
  chart: {
    type: "bar",
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Bole Branch", "Megenagna Branch", "Summit Branch"],
  },
  yaxis: {
    title: {
      text: "$ (thousands)",
    },
  },
  fill: {
    opacity: 1,
    colors: ["#F44336", "#10B981"],
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands";
      },
    },
  },
};
// Paid Claims by Providers and Service Types
