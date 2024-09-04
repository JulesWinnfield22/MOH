<script setup>
import PdfMaker from '@/components/PdfMaker.vue';
import { useApiRequest } from '@/composables/useApiRequest';
import Requirements from '@/views/Requirements.vue';
import { ref } from 'vue';

const content = ref();

function getPdf() {
  const docDif = {
    content: [
    
      
      {
        marginTop: 20,
        text: 'Agency Agreement format',
        style: 'header',
      },
        {
        text: 'የውክልና ውል',
        style: 'header',
      },
      {
        marginTop: 10,
        text: 'ውክልና ስልጣን ሰጪ',
      },
      {
        marginTop: 25,
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
      {
        marginTop: 25,
        text: 'ውክልና ስልጣን ተቀባይ',
      },
      {
        marginTop: 25,
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
      {
        marginTop: 25,
        columns: [
          {
						width: 'auto',
            text: 'እኔ የዶ/ር',
          },
          {
						marginLeft: 5,
						marginTop: 9,
						alignment: 'bottom',
						width: 'auto',
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
					{
						width: "auto",
						marginLeft: 5,
						text: 'የትዳር አጋር የሆንኩት እና ዶ/ር'
					},
					{
						marginLeft: 5,
						marginTop: 9,
						alignment: 'bottom',
						width: 'auto',
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
					{
						width: 'auto',
						marginLeft: 5,
						text: 'በጤና ሚኒስቴር ስፖንሰር አድራጊነት'
					},
        ],
      },
			{
				text: 'ለሚማረው/ለምትማረው ትምህርት በትምህርት ውሉ ላይ እንደኔ በመሆን እንዲፈርምልኝ/ እንድትፈርምልኝ በፍ/ብ/ህ/አንቀፅ 2199 እና በፍ/ብ/ህ/አንቀፅ 2205 መሰረት ይህንን የውክልና ስልጣን መስጠቴን በፊርማ አረጋግጣለሁ፡፡'
			},
			{
				marginTop: 25,
				text: 'የወካይ ስምና ፊርማ'
			},
			{
				marginTop: 15,
				columns: [
					{
						width: 'auto',
						text: 'ስም'
					},
					{
						marginLeft: 5,
						marginTop: 9,
						width: 'auto',
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
					}
				]
			}
    ],
  };

  content.value = docDif;
}

getPdf();
</script>
<template>
  <PdfMaker v-if="content" :content="content" />
</template>
