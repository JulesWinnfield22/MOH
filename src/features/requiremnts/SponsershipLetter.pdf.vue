<script setup>
import PdfMaker from '@/components/PdfMaker.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import Requirements from '@/views/Requirements.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const content = ref();

function getPdf() {
  const docDif = {
    content: [
      {
        text: 'Sponsorship Agreement',
        style: 'header',
      },
      {
        marginTop: 10,
        text: 'This sponsorship agreement is made and entered into by and between the Ministry of Health (the "Sponsor") and the "Sponsored Student"s.',
      },
      {
        marginTop: 20,
        text: 'Sponsorship Terms',
        style: 'header',
      },
      {
        marginTop: 10,
        text: 'The Sponsor hereby agrees to provide financial sponsorship for the Sponsored Student to pursue their educational studies at University. The sponsorship will cover the following:',
      },
      {
        marginTop: 10,
        ul: [
          'Tuition fees',
          'Living expenses',
          'Books and supplies',
          'Transportation costs',
        ],
      },
      {
        marginTop: 20,
        text: 'Obligations of the Sponsored Student',
        style: 'header',
      },
      {
        marginTop: 10,
        text: 'The Sponsored Student agrees to the following obligations:',
      },
      {
        marginTop: 10,
        ul: [
          'Maintain a satisfactory academic performance throughout the sponsored program',
          'Comply with all rules and regulations of the University',
          'Provide regular progress reports to the Sponsor',
          'Upon completion of the sponsored program, serve the Sponsor for a period of  years at the assigned location.',
        ],
      },
      {
        marginTop: 20,
        text: 'Termination and Repayment',
        style: 'header',
      },
      {
        marginTop: 10,
        text: 'If the Sponsored Student fails to fulfill the terms of this agreement, the Sponsor reserves the right to terminate the sponsorship and require the Sponsored Student to repay the full amount of the sponsorship.',
      },
      {
        marginTop: 25,
        columns: [
          //{
          //  width: 'auto',
          //  text: 'Sponsor Representative',
          //},
          //{
          //  stack: [
          //    {
          //      marginLeft: 5,
          //      text: route.query?.rep,
          //    },
          //    {
          //      marginLeft: 5,
          //      alignment: 'bottom',
          //      width: 'auto',
          //      canvas: [
          //        {
          //          type: 'line',
          //          x1: 0,
          //          y1: 3,
          //          x2: 150,
          //          y2: 3,
          //          lineWidth: 0.1,
          //        },
          //      ],
          //    },
          //  ],
          //},
          {
            width: 'auto',
            marginLeft: 5,
            text: 'Sponsored Student',
          },
          {
            stack: [
              {
                marginLeft: 5,
                text: route.query?.name
              },
              {
                marginLeft: 5,
                alignment: 'bottom',
                width: 'auto',
                canvas: [
                  {
                    type: 'line',
                    x1: 0,
                    y1: 3,
                    x2: 200,
                    y2: 3,
                    lineWidth: 0.1,
                  },
                ],
              },
            ]
          },
        ],
      },
    ],
  };

  content.value = docDif;
}

getPdf();
</script>

<template>
  <PdfMaker v-if="content" :content="content" />
</template>
